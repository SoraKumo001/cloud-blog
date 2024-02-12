import { createContext, useContext } from "react";

const context = createContext<Record<string, string>>({});

export const EnvProvider = context.Provider;

export const useEnv = () => useContext(context);
