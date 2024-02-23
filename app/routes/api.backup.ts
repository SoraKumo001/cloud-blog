import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parse } from "cookie";
import { getUserFromToken } from "@/libs/client/getUserFromToken";
import { arrayBufferToBase64 } from "@/libs/server/buffer";
import { getPrisma } from "@/libs/server/context";
import { storage } from "@/libs/server/getStorage";

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.env as { [key: string]: string };
  const prisma = getPrisma(env.DATABASE_URL);
  const cookies = parse(request.headers.get("Cookie") || "");

  if (!cookies) throw new Error("cookieStore is undefined");
  const token = cookies["auth-token"];
  const user = await getUserFromToken({ token, secret: env.SECRET_KEY });
  if (!user) {
    throw new Error("Authentication error");
  }
  const { users, categories, files, posts, system } = await prisma.$transaction(
    async (prisma) => {
      const users = await prisma.user.findMany();
      const categories = await prisma.category.findMany();
      const system = await prisma.system.findMany();
      const posts = await prisma.post.findMany({
        include: { categories: { select: { id: true } } },
      });
      const files = await prisma.fireStore.findMany();
      return { users, categories, system, posts, files };
    }
  );

  const firebaseStorage = storage({
    projectId: env.GOOGLE_PROJECT_ID ?? "",
    clientEmail: env.GOOGLE_CLIENT_EMAIL ?? "",
    privateKey: env.GOOGLE_PRIVATE_KEY ?? "",
  });

  const fireStoreFiles = await Promise.all(
    files.map(async (file) => {
      try {
        const storageFile = await firebaseStorage.download({ name: file.id });
        return {
          ...file,
          binary: arrayBufferToBase64(storageFile),
        };
      } catch (e) {
        console.error(e);
        return { ...file, binary: "" };
      }
    })
  );
  return Response.json({
    system,
    users,
    categories,
    posts,
    files: fireStoreFiles,
  });
}
