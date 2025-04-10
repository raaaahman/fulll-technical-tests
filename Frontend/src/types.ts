export type APIResponse<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<T>;
};

export type UserData = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};
