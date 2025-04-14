export interface IEditState {
  items: Array<{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    selected: boolean;
  }>;
}

export type EditAction =
  | { type: "initialize"; params: IEditState }
  | { type: "select"; params: number[] }
  | { type: "unselect"; params: number[] }
  | { type: "duplicate" }
  | { type: "delete" };

export const reducer = (state: IEditState, action: EditAction) => {
  switch (action.type) {
    case "initialize":
      return action.params;
    case "select":
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          selected: action.params.includes(item.id) ? true : item.selected,
        })),
      };
    case "unselect":
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          selected: action.params.includes(item.id) ? false : item.selected,
        })),
      };
    case "duplicate":
      let maxId = state.items.reduce(
        (highest, item) => Math.max(highest, item.id),
        0
      );

      return {
        ...state,
        items: state.items.concat(
          ...state.items
            .filter((item) => item.selected)
            .map((item) => ({ ...item, id: ++maxId, selected: false }))
        ),
      };
    case "delete":
      return {
        ...state,
        items: state.items.filter((item) => !item.selected),
      };
    default:
      return state;
  }
};
