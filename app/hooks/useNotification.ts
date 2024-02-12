import { useCallback } from "react";
import { useDispatch, useSelector } from "@/libs/client/context";

export const useNotificationsDispatch: typeof useDispatch<{
  notifications?: string[];
}> = useDispatch;

export const useNotificationsSelector = () =>
  useSelector((state: { notifications?: string[] }) => state.notifications);

export const useNotification = () => {
  const dispatch = useNotificationsDispatch();
  return useCallback(
    (message: string) => {
      dispatch((state) => ({
        ...state,
        notifications: [...(state.notifications || []), message],
      }));
    },
    [dispatch]
  );
};
