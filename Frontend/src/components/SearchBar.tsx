import {
  ActionDispatch,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { composeClass as cc } from "../helpers/css";
import utils from "../utils.module.css";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  action: ActionDispatch<[FormData]>;
  name: string;
  ariaLabel?: string;
  placeholder?: string;
};

export function SearchBar({
  action,
  name,
  ariaLabel = "Search",
  placeholder,
}: SearchBarProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const [value, setValue] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (timer !== undefined || value.length < 3) return;

    setTimer(
      setTimeout(() => {
        formRef.current?.requestSubmit();
        setTimer(undefined);
      }, 400)
    );

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <form
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
        onChange={handleChange}
        value={value}
      />
    </form>
  );
}
