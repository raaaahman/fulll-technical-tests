import React, { useActionState } from "react";

import { composeClass as cc } from "./helpers/css";
import styles from "./App.module.css";
import utils from "./utils.module.css";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as DeleteIcon } from "./icons/trash.svg";

import { UserCard } from "./UserCard";
import { getUsersByLogin } from "./queries";
import { UserData } from "./types";

function App() {
  const [users, submitQuery, isPending] = useActionState(
    async (previousUsers: Array<UserData> | null, formData: FormData) => {
      const needle = formData.get("search-input")?.toString();

      if (typeof needle === "string" && needle.length >= 3) {
        const response = await getUsersByLogin(needle);
        return response.items;
      } else {
        return previousUsers;
      }
    },
    null
  );

  return (
    <main className={cc(styles.app, utils["full-height"])}>
      <h1 className={cc(styles.app_title, utils.h1)}>
        <span>Github Search</span>
      </h1>
      <div className={cc(styles["app_container"], utils["flex-column"])}>
        <form
          role="search"
          className={cc(styles.searchbar, utils["mx-md"], utils["flex-static"])}
          action={submitQuery}
        >
          <input
            type="search"
            id="search-input"
            name="search-input"
            aria-label="Search input"
            placeholder="Search input"
            className={cc(styles.searchbox, utils.h1)}
          />
        </form>
        <div
          role="menubar"
          className={cc(styles.menubar, utils["mx-md"], utils["flex-static"])}
        >
          <label htmlFor="select-all">
            <input
              type="checkbox"
              id="select-all"
              role="menuitemcheckbox"
              name="select-all"
              aria-checked="mixed"
              className={styles["select-all"]}
            />
            <span className={styles["select-all_label_number"]}>0</span>{" "}
            elements selected
          </label>
          <div role="group">
            <button role="menuitem" className={utils["btn-ghost"]}>
              <CopyIcon
                role="presentation"
                title="Duplicate"
                className={cc(utils["icon-sm"], utils["text-neutral-darker"])}
              />
              <span className={utils["sr-only"]}>Duplicate</span>
            </button>
            <button role="menuitem" className={utils["btn-ghost"]}>
              <DeleteIcon
                role="presentation"
                title="Delete"
                className={cc(utils["icon-sm"], utils["text-neutral-darker"])}
              />
              <span className={utils["sr-only"]}>Delete</span>
            </button>
          </div>
        </div>
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
      </div>
    </main>
  );
}

export default App;
