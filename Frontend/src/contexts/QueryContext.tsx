import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  use,
  useActionState,
  useState,
} from "react";

import { SEARCH_INPUT_NAME } from "../App";
import { getUsersByLogin } from "../queries";
import { UserData } from "../types";
import { MESSAGE_NETWORK_ERROR } from "../components/Feed/consts";

interface IError {
  message: string;
}

export interface IQueryContext {
  data: UserData[] | null;
  query: ActionDispatch<[FormData]>;
  isPending: boolean;
  error?: IError;
}

export const QueryContext = createContext<IQueryContext | null>(null);

export function QueryContextProvider({ children }: PropsWithChildren<{}>) {
  const [error, setError] = useState<IError | undefined>();
  const [data, query, isPending] = useActionState(
    async (previousUsers: Array<UserData> | null, formData: FormData) => {
      const needle = formData.get(SEARCH_INPUT_NAME)?.toString();

      if (typeof needle === "string" && needle.length >= 3) {
        try {
          const response = await getUsersByLogin(needle);
          return response.items;
        } catch (error) {
          setError({
            message:
              error instanceof Error ? error.message : MESSAGE_NETWORK_ERROR,
          });
          return previousUsers;
        }
      } else {
        return previousUsers;
      }
    },
    null
  );

  return (
    <QueryContext value={{ data, query, isPending, error }}>
      {children}
    </QueryContext>
  );
}

export function useQueryContext() {
  const context = use(QueryContext);

  if (!context)
    throw new Error("Component should be nested in a QueryContextProvider.");

  return context;
}
