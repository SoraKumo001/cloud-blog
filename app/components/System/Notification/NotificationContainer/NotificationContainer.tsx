import { FC, useCallback, useEffect, useRef } from "react";
import { Notification } from "../Notification";
import {
  useNotificationsDispatch,
  useNotificationsSelector,
} from "@/hooks/useNotification";
const fadeTime = 5000;
const fadeNextTime = 100;
interface Props {}

/**
 * NotificationContainer
 *
 * @param {Props} { }
 */
export const NotificationContainer: FC<Props> = ({}) => {
  const notifications = useNotificationsSelector();
  const timer = useRef<number>(null);
  const dispatch = useNotificationsDispatch();
  const onAnimationEnd = useCallback(() => {
    dispatch((state) => ({
      ...state,
      notifications: state.notifications?.slice(1),
    }));
    timer.current = Date.now();
  }, [dispatch]);
  useEffect(() => {
    if (notifications?.length === 0) return;
    timer.current = Date.now();
    let handle: ReturnType<typeof setInterval> | undefined = setInterval(() => {
      const elapse = Date.now() - timer.current!;
      if (
        (notifications && notifications.length > 1 && elapse >= fadeNextTime) ||
        elapse >= fadeTime
      ) {
        onAnimationEnd();
      }
      if (!notifications?.length) {
        if (handle) {
          clearInterval(handle);
          handle = undefined;
        }
      }
    }, 10);
    return () => handle && clearInterval(handle);
  }, [notifications, onAnimationEnd]);

  if (!notifications || !notifications.length) return null;
  return (
    <div>
      <Notification
        key={String(notifications[0])}
        onAnimationEnd={onAnimationEnd}
        onClose={onAnimationEnd}
      >
        {notifications[0]}
      </Notification>
    </div>
  );
};
