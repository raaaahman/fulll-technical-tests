import React from "react";

import { composeClass as cc } from "./helpers/css";
import styles from "./App.module.css";
import utils from "./utils.module.css";
import { SearchBar } from "./components/SearchBar";
import { QueryContextProvider } from "./contexts/QueryContext";
import { Feed } from "./components/Feed";
import { EditContextProvider } from "./contexts/EditContext";
import { EditMenu } from "./components/EditMenu";

export const SEARCH_INPUT_NAME = "search-input";

function App() {
  return (
    <QueryContextProvider>
      <EditContextProvider>
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
            <EditMenu />
            <Feed />
          </div>
        </main>
      </EditContextProvider>
    </QueryContextProvider>
  );
}

export default App;
