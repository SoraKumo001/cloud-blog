import { getStorage } from "firebase-storage";

export const storage = ({
  projectId,
  privateKey,
  clientEmail,
}: {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}) => {
  const bucket = `${projectId}.appspot.com`;
  return getStorage({
    privateKey: privateKey.replace(/\\n/g, "\n"),
    clientEmail,
    bucket,
    parallels: 1,
  });
};
