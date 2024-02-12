import { useCallback } from "react";
import { useEnv } from "@/components/Provider/EnvProvider";

export const useFirebaseUrl = () => {
  const env = useEnv();
  const projectId = env["NEXT_PUBLIC_projectId"];
  const getFirebaseUrl = useCallback(
    (id: string) => {
      return `https://storage.googleapis.com/${projectId}.appspot.com/${id}`;
    },
    [projectId]
  );
  return getFirebaseUrl;
};
