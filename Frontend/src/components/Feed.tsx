import { useQueryContext } from "../contexts/QueryContext";
import { UserCard } from "./UserCard";
import styles from "./Feed.module.css";

export const MESSAGE_NO_REQUEST =
  "Type into the search bar to search for Github users.";
export const MESSAGE_NO_RESULTS = "No user match this query...";
export const MESSAGE_LOADING = "Loading...";
export const MESSAGE_NETWORK_ERROR =
  "Something went wrong with the request. Try to send it again in a few seconds.";
export const MESSAGE_RATE_LIMIT_EXCEEDED =
  "The application has exceeded the limit of request it can send. Please come back in one hour or more...";

function getMessage(context: ReturnType<typeof useQueryContext>) {
  const { error, data, isPending } = context;

  if (error && error.message === "API rate limit exceeded") {
    return MESSAGE_RATE_LIMIT_EXCEEDED;
  } else if (error) {
    return MESSAGE_NETWORK_ERROR;
  } else if (isPending) {
    return MESSAGE_LOADING;
  } else if (Array.isArray(data) && data.length === 0) {
    return MESSAGE_NO_RESULTS;
  } else {
    return MESSAGE_NO_REQUEST;
  }
}

export function Feed() {
  const context = useQueryContext();
  const { isPending, data: users, error } = context;

  return (
    <section role="feed" className={styles.feed}>
      {!error && !isPending && Array.isArray(users) && users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} {...user} />)
      ) : (
        <p>{getMessage(context)}</p>
      )}
    </section>
  );
}
