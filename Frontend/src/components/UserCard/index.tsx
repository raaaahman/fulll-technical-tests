import { composeClass as cc } from "../../helpers/css";
import styles from "./UserCard.module.css";
import utils from "../../utils.module.css";
import { useEditDispatchContext } from "../../contexts/EditContext";
import { IEditState } from "../../contexts/editReducer";

export function UserCard({
  login,
  id,
  avatar_url,
  html_url,
  selected,
}: IEditState["items"][number]) {
  const dispatch = useEditDispatchContext();

  return (
    <article className={cc(styles.card, utils["mx-md"])}>
      <input
        type="checkbox"
        name="select-user"
        className={cc(styles.select, utils.select, utils["icon-xs"])}
        aria-checked={selected}
        checked={selected}
        onChange={() =>
          dispatch({ type: selected ? "unselect" : "select", params: [id] })
        }
      />
      <header>
        <img
          src={avatar_url}
          alt={`${login} avatar`}
          className={styles.avatar}
        />
        <p className={cc(utils.h2, utils["my-none"])}>{id}</p>
        <h2 className={cc(styles.login, utils.h2, utils["my-none"])}>
          {login}
        </h2>
      </header>
      <a href={html_url} className={styles["profile-cta"]}>
        View Profile
      </a>
    </article>
  );
}
