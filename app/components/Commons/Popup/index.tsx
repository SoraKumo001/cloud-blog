import { type FC, type ReactNode, useCallback, useRef, useState } from "react";
import { Portal } from "../Portal";

type Props = {
  posX?: "left" | "right" | "full";
  posY?: "top" | "bottom";
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Popup
 *
 * @param {Props} { }
 */
export const Popup: FC<Props> = ({
  posX = "full",
  posY = "bottom",
  isOpen,
  onClose,
  children,
}) => {
  const refTarget = useRef<HTMLDivElement>(null);
  const refPopup = useRef<HTMLDivElement>(null);
  const [[left, top, width], setPos] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const updateEffect = useCallback(() => {
    const target = refTarget.current?.parentElement;
    const popup = refPopup.current;
    if (!popup || !target) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      const rect = target.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const popupWidth = popup.clientWidth;
      const popupHeight = popup.clientHeight;
      const left = Math.max(
        0,
        posX === "right"
          ? rect.left + rect.width
          : posX === "full"
          ? rect.left
          : rect.left - popup.clientWidth
      );
      const top = Math.max(
        0,
        posY === "top" ? rect.top - popup.clientHeight : rect.top + rect.height
      );
      setPos([
        left + popupWidth < screenWidth ? left : screenWidth - popupWidth,
        top + popupHeight < screenHeight ? top : screenHeight - popupHeight,
        rect.width,
      ]);
    });
    resizeObserver.observe(target);
    return () => resizeObserver.unobserve(target);
  }, [posX, posY, refPopup]);

  return (
    <>
      <div ref={refTarget} />
      {isOpen && (
        <Portal effect={updateEffect}>
          <button className="fixed inset-0" onClick={onClose} />
          <div
            ref={refPopup}
            className="fixed z-50"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              width: posX === "full" ? `${width}px` : undefined,
            }}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};
