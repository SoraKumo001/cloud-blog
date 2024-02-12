import { FC, ReactNode, createContext, useContext } from "react";

const context = createContext<{ children?: ReactNode }>(undefined as never);

export const HeadProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <context.Provider value={{}}>{children}</context.Provider>;
};

export const HeadRoot: FC = () => {
  const property = useContext(context);
  const node = property.children;
  return node;
};
export const Head: FC<{ children: ReactNode }> = ({ children }) => {
  const property = useContext(context);
  property.children = children;
  return null;
};
