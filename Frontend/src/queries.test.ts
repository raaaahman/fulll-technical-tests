import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/lib/node";
import {
  BASE_URL,
  getUsersByLogin,
  HEADER_RATE_LIMIT_REMAINING,
  HEADER_RATE_LIMIT_RESET,
} from "./queries";
import { MESSAGE_RATE_LIMIT_EXCEEDED } from "./components/Feed/consts";

describe("The getUsersByLogin query", () => {
  let server: SetupServerApi;

  afterEach(() => {
    // @ts-ignore
    server?.close();
  });

  // MSW triggers a custom error in jsdom: Headers x-interceptors-internal-request-id forbidden
  // So the test fails for reasons unrelated to the production code...
  it.skip("throws when the API rate limit is exceeded", async () => {
    server = setupServer(
      http.options(`${BASE_URL}*`, () => {
        HttpResponse.html("", {
          status: 403,
          headers: {
            [`${HEADER_RATE_LIMIT_REMAINING}`]: "0",
            [`${HEADER_RATE_LIMIT_RESET}`]: (Date.now() + 3600).toString(),
          },
        });
      }),
      http.get(`${BASE_URL}*`, () => {
        HttpResponse.html("", {
          status: 403,
          headers: {
            [`${HEADER_RATE_LIMIT_REMAINING}`]: "0",
            [`${HEADER_RATE_LIMIT_RESET}`]: (Date.now() + 3600).toString(),
          },
        });
      })
    );

    server.listen();

    expect(await getUsersByLogin("mic")).toThrow(MESSAGE_RATE_LIMIT_EXCEEDED);
  });
});
