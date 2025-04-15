import { useQueryContext } from "../../contexts/QueryContext";
import { UserCard } from "../UserCard";
import styles from "./Feed.module.css";
import {
  MESSAGE_RATE_LIMIT_EXCEEDED,
  MESSAGE_NETWORK_ERROR,
  MESSAGE_LOADING,
  MESSAGE_NO_RESULTS,
  MESSAGE_NO_REQUEST,
} from "./consts";
import { useEditStateContext } from "../../contexts/EditContext";

function getMessage(context: ReturnType<typeof useQueryContext>) {
  const { error, data, isPending } = context;

  if (error && error.message === MESSAGE_RATE_LIMIT_EXCEEDED) {
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
  const queryContext = useQueryContext();
  const { items: users } = useEditStateContext();
  const { isPending, error } = queryContext;

  return (
    <section role="feed" className={styles.feed}>
      {!error && !isPending && Array.isArray(users) && users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} {...user} />)
      ) : (
        <p className={styles.message}>{getMessage(queryContext)}</p>
      )}
    </section>
  );
}
