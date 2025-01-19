import { Button } from "react-daisyui";
import { useNavigate } from "react-router";
import { useEnv } from "@/components/Provider/EnvProvider";
import { useSignIn } from "@/hooks/useAuth";
import { firebaseApp } from "@/libs/client/getFirebaseApp";

const useSignInGoogle = () => {
  const env = useEnv();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const handleSignIn = async () => {
    const { GoogleAuthProvider, getAuth, signInWithPopup } = await import(
      "@firebase/auth"
    );
    const auth = getAuth(
      firebaseApp({
        apiKey: env.NEXT_PUBLIC_apiKey,
        projectId: env.NEXT_PUBLIC_projectId,
        authDomain: `${env.NEXT_PUBLIC_projectId}.firebaseapp.com`,
        storageBucket: `${env.NEXT_PUBLIC_projectId}.appspot.com`,
      })
    );
    const provider = new GoogleAuthProvider();

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
    <div className="flex size-full items-center justify-center">
      <Button onClick={handleSignIn}>SignIn</Button>
    </div>
  );
};
export default Page;
