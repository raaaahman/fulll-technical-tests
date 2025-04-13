import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  use,
  useActionState,
} from "react";

import { SEARCH_INPUT_NAME } from "../App";
import { getUsersByLogin } from "../queries";
import { UserData } from "../types";

export const QueryContext = createContext<{
  data: UserData[] | null;
  query: ActionDispatch<[FormData]>;
  isPending: boolean;
  error?: {
    status: number;
    message: string;
  };
} | null>(null);

export function QueryContextProvider({ children }: PropsWithChildren<{}>) {
  const [data, query, isPending] = useActionState(
    async (previousUsers: Array<UserData> | null, formData: FormData) => {
      const needle = formData.get(SEARCH_INPUT_NAME)?.toString();

      if (typeof needle === "string" && needle.length >= 3) {
        const response = await getUsersByLogin(needle);
        return response.items;
      } else {
        return previousUsers;
      }
    },
    null
  );

  return (
    <QueryContext value={{ data, query, isPending }}>{children}</QueryContext>
  );
}

export function useQueryContext() {
  const context = use(QueryContext);

  if (!context)
    throw new Error("Component should be nested in a QueryContextProvider.");

  return { ...context };
}
