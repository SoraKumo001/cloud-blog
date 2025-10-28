import {
  type EffectCallback,
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  effect?: EffectCallback;
}

/**
 * Portal
 *
 * @param {Props} { }
 */
export const Portal: FC<Props> = ({ children, effect }) => {
  const [target] = useState<HTMLElement | null>(() =>
    typeof document !== "undefined" ? document.body : null
  );

  return (
    target &&
    createPortal(
      <PortalClient effect={effect}>{children}</PortalClient>,
      target
    )
  );
};

interface ClientProps {
  children: ReactNode;
  effect?: EffectCallback;
}

const PortalClient: FC<ClientProps> = ({ children, effect }) => {
  useEffect(() => {
    return effect?.();
  }, [effect]);
  return <>{children}</>;
};
