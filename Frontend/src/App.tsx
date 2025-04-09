import React from "react";

import { composeClass as cc } from "./helpers/css";
import styles from "./App.module.css";
import utils from "./utils.module.css";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as DeleteIcon } from "./icons/trash.svg";

function App() {
  return (
    <main className={styles.app}>
      <h1 className={cc(styles.app_title, utils.h1)}>
        <span>Github Search</span>
      </h1>
      <form role="search" className={styles.searchbar}>
        <input
          type="search"
          id="search-input"
          name="search-input"
          aria-label="Search input"
          placeholder="Search input"
          className={cc(styles.searchbox, utils.h1)}
        />
      </form>
      <div role="menubar" className={styles.menubar}>
        <label htmlFor="select-all">
          <input
            type="checkbox"
            id="select-all"
            role="menuitemcheckbox"
            name="select-all"
            aria-checked="mixed"
            className={styles["select-all"]}
          />
          <span className={styles["select-all_label_number"]}>0</span> elements
          selected
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
      <section role="feed"></section>
    </main>
  );
}

export default App;
