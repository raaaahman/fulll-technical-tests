import {
  createContext,
  Dispatch,
  PropsWithChildren,
  use,
  useEffect,
  useReducer,
} from "react";
import { IQueryContext, useQueryContext } from "./QueryContext";
import { EditAction, IEditState, reducer } from "./editReducer";

export const EditStateContext = createContext<IEditState>({ items: [] });

export const EditDispatchContext = createContext<Dispatch<EditAction> | null>(
  null
);

function initializer(context: IQueryContext) {
  return {
    items: context.data?.map((item) => ({ ...item, selected: false })) || [],
  };
}

export function EditContextProvider({ children }: PropsWithChildren<{}>) {
  const context = useQueryContext();

  if (!context)
    throw new Error(
      "EditContextProvider should be nested inside a QueryContext."
    );

  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    dispatch({ type: "initialize", params: initializer(context) });
  }, [context]);

  return (
    <EditDispatchContext value={dispatch}>
      <EditStateContext value={state}>{children}</EditStateContext>
    </EditDispatchContext>
  );
}

export function useEditDispatchContext() {
  const dispatch = use(EditDispatchContext);

  if (!dispatch)
    throw new Error(
      "useEditDispatchContext hook should be nested inside an EditDispatchContext provider."
    );

  return dispatch;
}

export function useEditStateContext() {
  const state = use(EditStateContext);

  if (!state)
    throw new Error(
      "useEditStateContext hook should be nested inside an EditStateContext provider."
    );

  return state;
}
