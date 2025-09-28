import { createContext, useContext, useMemo, type ReactNode } from "react";

const context = createContext<{ edit?: boolean }>(undefined as never);
const useMarkdownContext = () => useContext(context);
const MarkdownProvider = ({
  edit,
  children,
}: {
  edit?: boolean;
  children?: ReactNode;
}) => {
  const contextValue = useMemo(() => ({ edit }), [edit]);
  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export { MarkdownProvider, useMarkdownContext };
