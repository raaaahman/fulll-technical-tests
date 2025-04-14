import { MESSAGE_RATE_LIMIT_EXCEEDED } from "./components/Feed/consts";
import { APIResponse, UserData } from "./types";

export const BASE_URL = "https://api.github.com/";
export const PATH_SEARCH_USERS = "search/users";

export const HEADER_RATE_LIMIT_REMAINING = "x-ratelimit-remaining";
export const HEADER_RATE_LIMIT_RESET = "x-ratelimit-reset";

let ratelimitExceeded = false;

export async function getUsersByLogin(
  value: string
): Promise<APIResponse<UserData>> {
  if (ratelimitExceeded) throw new Error(MESSAGE_RATE_LIMIT_EXCEEDED);

  const response = await fetch(`${BASE_URL}${PATH_SEARCH_USERS}?q=${value}`);

  if (
    response.status !== 200 &&
    response.headers.get(HEADER_RATE_LIMIT_REMAINING) === "0"
  ) {
    ratelimitExceeded = true;
    const delay = parseInt(response.headers.get(HEADER_RATE_LIMIT_RESET)!);
    setTimeout(() => {
      ratelimitExceeded = false;
    }, delay);

    throw new Error(MESSAGE_RATE_LIMIT_EXCEEDED);
  }

  const data = response.json();

  return data;
}
