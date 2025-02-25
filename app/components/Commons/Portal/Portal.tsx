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
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setTarget(document.body);
  }, []);
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
