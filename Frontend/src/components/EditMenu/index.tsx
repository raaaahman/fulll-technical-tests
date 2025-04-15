import { useEffect, useRef } from "react";
import {
  useEditDispatchContext,
  useEditStateContext,
} from "../../contexts/EditContext";
import { composeClass as cc } from "../../helpers/css";
import utils from "../../utils.module.css";
import styles from "./EditMenu.module.css";
import { ReactComponent as CopyIcon } from "./copy.svg";
import { ReactComponent as DeleteIcon } from "./trash.svg";

export function EditMenu() {
  const dispatch = useEditDispatchContext();
  const { items } = useEditStateContext();

  const selectedCount = items.filter((item) => item.selected).length;

  const selectRef = useRef<HTMLInputElement>(null);

  const allSelected =
    items.length === 0 || selectedCount === 0
      ? false
      : selectedCount === items.length
      ? true
      : undefined;

  useEffect(() => {
    if (selectRef.current)
      selectRef.current.indeterminate = typeof allSelected === "undefined";
  });

  return (
    <div
      role="menubar"
      className={cc(styles.menubar, utils["mx-md"], utils["flex-static"])}
    >
      <label htmlFor="select-all">
        <input
          ref={selectRef}
          type="checkbox"
          id="select-all"
          role="menuitemcheckbox"
          name="select-all"
          aria-checked={allSelected}
          checked={allSelected}
          className={cc(styles["select-all"], utils.select, utils["icon-xs"])}
          onChange={() =>
            dispatch({
              type: allSelected ? "unselect" : "select",
              params: items.map((item) => item.id),
            })
          }
        />
        <span className={styles["select-all_label_number"]}>
          {selectedCount}
        </span>{" "}
        elements selected
      </label>
      <div role="group">
        <button
          role="menuitem"
          className={utils["btn-ghost"]}
          onClick={() => dispatch({ type: "duplicate" })}
        >
          <CopyIcon
            role="presentation"
            title="Duplicate"
            className={cc(utils["icon-sm"], utils["text-neutral-darker"])}
          />
          <span className={utils["sr-only"]}>Duplicate</span>
        </button>
        <button
          role="menuitem"
          className={utils["btn-ghost"]}
          onClick={() => dispatch({ type: "delete" })}
        >
          <DeleteIcon
            role="presentation"
            title="Delete"
            className={cc(utils["icon-sm"], utils["text-neutral-darker"])}
          />
          <span className={utils["sr-only"]}>Delete</span>
        </button>
      </div>
    </div>
  );
}
