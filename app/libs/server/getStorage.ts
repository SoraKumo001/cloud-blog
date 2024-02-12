import { getStorage } from "firebase-storage";

export const storage = () => {
  const projectId = process.env.GOOGLE_PROJECT_ID!;
  const bucket = `${projectId}.appspot.com`;
  return getStorage({
    privateKey: process.env.GOOGLE_PRIVATE_KEY!,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL!,
    bucket,
  });
};
