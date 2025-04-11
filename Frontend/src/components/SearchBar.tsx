import { ActionDispatch, ChangeEvent, useRef, useState } from "react";

import { composeClass as cc } from "../helpers/css";
import utils from "../utils.module.css";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  action: ActionDispatch<[FormData]>;
  name: string;
  ariaLabel?: string;
  placeholder?: string
};

export function SearchBar({action, name, ariaLabel = 'Search', placeholder }:SearchBarProps) {
  const [locked, setLocked] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 3 && !locked) {
      setLocked(true)

      formRef.current?.requestSubmit()
    }
  }

  return <form
  ref={formRef}
    role="search"
    className={cc(styles.searchbar, utils["mx-md"], utils["flex-static"])}
    action={action}
  >
    <input
      type="search"
      id={name}
      name={name}
      aria-label={ariaLabel}
      placeholder={placeholder}
      className={cc(styles.searchbox, utils.h1)}
      onChange={handleChange} />
  </form>;
}