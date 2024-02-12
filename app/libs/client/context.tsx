import { useRef, useSyncExternalStore, createContext, ReactNode, useContext } from 'react';

export type ContextType<T> = {
  state: T;
  storeChanges: Set<() => void>;
  dispatch: (callback: (state: T) => T) => void;
  subscribe: (onStoreChange: () => void) => () => void;
};

export const useStoreContext = <T,>(initState?: () => T) => {
  const context = useRef<ContextType<T>>({
    state: initState?.() ?? ({} as T),
    storeChanges: new Set(),
    dispatch: (callback) => {
      context.state = callback(context.state);
      context.storeChanges.forEach((storeChange) => storeChange());
    },
    subscribe: (onStoreChange) => {
      context.storeChanges.add(onStoreChange);
      return () => {
        context.storeChanges.delete(onStoreChange);
      };
    },
  }).current;
  return context;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<ContextType<any>>(undefined as never);

export const StoreProvider = <T,>({
  children,
  initState,
}: {
  children: ReactNode;
  initState?: () => T;
}) => {
  const context = useStoreContext(initState);
  return <StoreContext.Provider value={context}>{children}</StoreContext.Provider>;
};

export const useSelector = <T, R>(getSnapshot: (state: T) => R) => {
  const context = useContext<ContextType<T>>(StoreContext);
  return useSyncExternalStore(
    context.subscribe,
    () => getSnapshot(context.state),
    () => getSnapshot(context.state)
  );
};

export const useDispatch = <T,>() => {
  const context = useContext<ContextType<T>>(StoreContext);
  return context.dispatch;
};
