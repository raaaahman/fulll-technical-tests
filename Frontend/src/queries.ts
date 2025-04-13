import { APIResponse, UserData } from "./types";

export const BASE_URL = "https://api.github.com/";
export const PATH_SEARCH_USERS = "search/users";

export async function getUsersByLogin(
  value: string
): Promise<APIResponse<UserData>> {
  const response = await fetch(`${BASE_URL}${PATH_SEARCH_USERS}?q=${value}`);

  const data = response.json();

  return data;
}
