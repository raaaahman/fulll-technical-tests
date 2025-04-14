import { MESSAGE_RATE_LIMIT_EXCEEDED } from "../components/Feed/consts";
import users from "./github-users_q=mic.json";

export const CONTEXT_INITIAL_STATE_NO_REQUEST = {
  data: null,
  query: () => {},
  isPending: false,
};
export const CONTEXT_INITIAL_REQUEST_RESULTS = {
  data: users.items,
  query: () => {},
  isPending: false,
};
export const CONTEXT_INITIAL_REQUEST_NO_RESULTS = {
  data: [],
  query: () => {},
  isPending: false,
};
export const CONTEXT_INITIAL_REQUEST_PENDING = {
  data: null,
  query: () => {},
  isPending: true,
};
export const CONTEXT_SUBSEQUENT_REQUEST_PENDING_NO_RESULTS = {
  data: [],
  query: () => {},
  isPending: true,
};
export const CONTEXT_SUBSEQUENT_REQUEST_PENDING = {
  data: users.items,
  query: () => {},
  isPending: true,
};
export const CONTEXT_INITIAL_REQUEST_SERVER_ERROR = {
  data: null,
  query: () => {},
  isPending: false,
  error: { message: "Internal Server Error" },
};
export const CONTEXT_SUBSEQUENT_REQUEST_SERVER_ERROR_NO_RESULTS = {
  data: [],
  query: () => {},
  isPending: false,
  error: { message: "Internal Server Error" },
};
export const CONTEXT_SUBSEQUENT_REQUEST_SERVER_ERROR = {
  data: users.items,
  query: () => {},
  isPending: false,
  error: { message: "Internal Server Error" },
};
export const CONTEXT_INITIAL_REQUEST_RATE_API_LIMIT8EXCEEDED = {
  data: null,
  query: () => {},
  isPending: false,
  error: { message: MESSAGE_RATE_LIMIT_EXCEEDED },
};
