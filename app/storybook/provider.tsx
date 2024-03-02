import { ReactNode } from "react";
import { Provider } from "urql";
import { fromValue } from "wonka";
import { StoreProvider } from "@/libs/client/context";

type Props = { value?: object; children: ReactNode };

export const MockProvider = ({ children, value }: Props) => {
  const queryValue = {
    executeQuery: () => {
      return fromValue({
        data: value,
      });
    },
  };

  return (
    <StoreProvider>
      <Provider value={queryValue}>{children}</Provider>
    </StoreProvider>
  );
};
