import { useEffect } from "react";
import { useDispatch } from "@/libs/client/context";

export const useLoading = (loadings: boolean[] | boolean) => {
  const dispatch = useDispatch<{ loading?: number }>();
  const isLoading = Array.isArray(loadings)
    ? loadings.some((v) => v)
    : loadings;
  useEffect(() => {
    if (isLoading) {
      dispatch((state) => ({
        ...state,
        loading: state.loading !== undefined ? state.loading + 1 : 1,
      }));
      return () =>
        dispatch((state) => ({
          ...state,
          loading: state.loading !== undefined ? state.loading - 1 : 0,
        }));
    }
  }, [isLoading, dispatch]);
};
