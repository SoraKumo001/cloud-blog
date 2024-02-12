import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import { Button } from "react-daisyui";
import { useEnv } from "@/components/Provider/EnvProvider";
import { useSignIn } from "@/hooks/useAuth";
import { firebaseApp } from "@/libs/client/getFirebaseApp";

const useSignInGoogle = () => {
  const provider = new GoogleAuthProvider();
  const env = useEnv();
  const auth = useMemo(
    () =>
      getAuth(
        firebaseApp({
          apiKey: env.NEXT_PUBLIC_apiKey,
          projectId: env.NEXT_PUBLIC_projectId,
          authDomain: `${env.NEXT_PUBLIC_projectId}.firebaseapp.com`,
          storageBucket: `${env.NEXT_PUBLIC_projectId}.appspot.com`,
        })
      ),
    [env]
  );

  const navigate = useNavigate();
  const signIn = useSignIn();
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((v) => v.user.getIdToken())
      .then((token) => {
        signIn(token).then(() => navigate(-1));
      });
  };
  return handleSignIn;
};

const Page = () => {
  const handleSignIn = useSignInGoogle();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button onClick={handleSignIn}>SignIn</Button>
    </div>
  );
};
export default Page;
