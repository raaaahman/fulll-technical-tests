import { APIResponse, UserData } from "./types";

export async function getUsersByLogin(
  value: string
): Promise<APIResponse<UserData>> {
  const response = await fetch(
    `https://api.github.com/search/users?q=${value}`
  );
  const data = response.json();

  return data;
}
