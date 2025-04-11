import { useQueryContext } from "../contexts/QueryContext";
import { UserCard } from "./UserCard";
import styles from "./Feed.module.css";

export function Feed() {
  const { isPending, data: users } = useQueryContext();

  return (
    <section role="feed" className={styles.feed}>
      {isPending ? (
        <p>Loading...</p>
      ) : Array.isArray(users) ? (
        users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} {...user} />)
        ) : (
          <p>No user match this query...</p>
        )
      ) : (
        <p>Type into the search bar to search for Github users.</p>
      )}
    </section>
  );
}
