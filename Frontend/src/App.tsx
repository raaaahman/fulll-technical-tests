import React from "react";

import { composeClass as cc } from "./helpers/css";
import styles from "./App.module.css";
import utils from "./utils.module.css";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as DeleteIcon } from "./icons/trash.svg";
import { SearchBar } from "./components/SearchBar";
import { QueryContextProvider } from "./contexts/QueryContext";
import { Feed } from "./components/Feed";

export const SEARCH_INPUT_NAME = "search-input";

function App() {
  return (
    <QueryContextProvider>
      <main className={cc(styles.app, utils["full-height"])}>
        <h1 className={cc(styles.app_title, utils.h1)}>
          <span>Github Search</span>
        </h1>
        <div className={cc(styles["app_container"], utils["flex-column"])}>
          <SearchBar
            name={SEARCH_INPUT_NAME}
            ariaLabel="Search input"
            placeholder="Search Input"
          />
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
          <Feed />
        </div>
      </main>
    </QueryContextProvider>
  );
}

export default App;
