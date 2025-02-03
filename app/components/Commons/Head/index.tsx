import React from "react";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

const DATA_NAME = "__HEAD_VALUE__";

export type ContextType<T = ReactNode[]> = {
  state: T;
  storeChanges: Set<() => void>;
  dispatch: (callback: (state: T) => T) => void;
  subscribe: (onStoreChange: () => void) => () => void;
};

export const useCreateHeadContext = <T,>(initState: () => T) => {
  const context = useRef<ContextType<T>>({
    state: initState(),
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

const HeadContext = createContext<
  ContextType<{ type: string; props: Record<string, unknown> }[][]>
>(undefined as never);

export const HeadProvider = ({ children }: { children: ReactNode }) => {
  const context = useCreateHeadContext<
    { type: string; props: Record<string, unknown> }[][]
  >(() => {
    if (typeof window !== "undefined") {
      return [
        JSON.parse(
          document.querySelector(`script#${DATA_NAME}`)?.textContent ?? "{}"
        ),
      ];
    }
    return [[]];
  });
  return (
    <HeadContext.Provider value={context}>{children}</HeadContext.Provider>
  );
};

export const HeadRoot: FC = () => {
  const context = useContext(HeadContext);
  const state = useSyncExternalStore(
    context.subscribe,
    () => context.state,
    () => context.state
  );
  useEffect(() => {
    context.dispatch(() => {
      return [];
    });
  }, [context]);
  const heads = state.flat();
  return (
    <>
      <script
        id={DATA_NAME}
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(heads).replace(/</g, "\\u003c"),
        }}
      />
      {heads.map(({ type: Tag, props }, index) => (
        <Tag key={`HEAD${Tag}${index}`} {...props} />
      ))}
    </>
  );
};
export const Head: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(HeadContext);
  useEffect(() => {
    const value = extractInfoFromChildren(children);
    context.dispatch((heads) => [...heads, value]);
    return () => {
      context.dispatch((heads) => heads.filter((head) => head !== value));
    };
  }, [children, context]);

  if (typeof window === "undefined") {
    context.dispatch((heads) => [...heads, extractInfoFromChildren(children)]);
  }
  return null;
};

const extractInfoFromChildren = (
  children: ReactNode
): { type: string; props: Record<string, unknown> }[] =>
  React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return extractInfoFromChildren(
          (child as { props: { children: ReactNode } }).props.children
        );
      }
      if (typeof child.type === "string") {
        return [
          { type: child.type, props: child.props as Record<string, unknown> },
        ];
      }
    }
    return [];
  });
