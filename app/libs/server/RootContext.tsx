import { createContext, useContext, useMemo } from "react";

export const RootContext = createContext<{ [key: string]: unknown }>({});
export const RootProvider = RootContext.Provider;
const DATA_NAME = "__ROOT_VALUE__";
export const useRootContext = () => {
  const serverValue = useContext(RootContext);
  const clientValue = useMemo(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(
        document.querySelector(`script#${DATA_NAME}`)?.textContent ?? "{}"
      );
    }
  }, []);

  return typeof window === "undefined" ? serverValue : clientValue;
};
