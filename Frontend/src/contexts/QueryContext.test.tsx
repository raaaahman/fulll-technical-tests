/* eslint-disable jest/no-mocks-import */
import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/lib/node";
import { renderHook } from "@testing-library/react";
import { act, startTransition } from "react";

import users from "../__mocks__/github-users_q=mic.json";
import { QueryContextProvider, useQueryContext } from "./QueryContext";
import { BASE_URL } from "../queries";
import { SEARCH_INPUT_NAME } from "../App";
import { CONTEXT_INITIAL_REQUEST_RESULTS } from "../__mocks__/contexts";

describe("The useQueryContext hook", () => {
  let server: SetupServerApi;

  afterEach(() => {
    // @ts-ignore
    server?.close();
  });

  // TODO: Find how to trigger React Actions in test.
  it.skip("should return data after a response is received", async () => {
    server = setupServer(
      http.get(`${BASE_URL}*`, () => {
        HttpResponse.json(users);
      })
    );

    server.listen();

    const { result, rerender } = renderHook(() => useQueryContext(), {
      wrapper: ({ children }) => (
        <QueryContextProvider>{children}</QueryContextProvider>
      ),
    });

    await act(() => {
      const data = new FormData();
      data.set(SEARCH_INPUT_NAME, "mic");

      startTransition(() => {
        result.current.query(data);
      });
    });

    rerender();

    expect(result.current).toEqual(CONTEXT_INITIAL_REQUEST_RESULTS);
  });
});
