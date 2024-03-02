import { useCallback } from "react";
import { useSignInMutation } from "@/generated/graphql";
import { useDispatch, useSelector } from "@/libs/client/context";

type StoreUser = { user: { email: string; name: string } | null | undefined };

export const useUser = () => {
  return useSelector((state: StoreUser) => state.user);
};

export const useSignOut = () => {
  const dispatch = useDispatch<StoreUser>();
  const [, signIn] = useSignInMutation();
  return useCallback(() => {
    signIn({}).then(() => dispatch((state) => ({ ...state, user: null })));
  }, [dispatch, signIn]);
};

export const useSignIn = () => {
  const dispatch = useDispatch<StoreUser>();
  const [, signIn] = useSignInMutation();
  return useCallback(
    (token: string) =>
      signIn({ token }).then(
        ({ data }) =>
          data?.signIn && dispatch((state) => ({ ...state, user: data.signIn }))
      ),
    [dispatch, signIn]
  );
};
