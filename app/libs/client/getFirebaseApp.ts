import { type FirebaseOptions, initializeApp } from "@firebase/app";

export const firebaseApp = ({
  apiKey,
  projectId,
  authDomain,
  storageBucket,
}: {
  apiKey: string;
  projectId: string;
  authDomain: string;
  storageBucket: string;
}) => {
  const firebaseConfig: FirebaseOptions = {
    apiKey,
    projectId,
    authDomain,
    storageBucket,
  };

  return initializeApp(firebaseConfig);
};
