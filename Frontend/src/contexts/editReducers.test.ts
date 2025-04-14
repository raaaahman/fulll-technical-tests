import { EditAction, reducer as editReducer } from "./editReducer";

describe("The editReducer", () => {
  type SelectableState = {
    items: Array<{
      id: number;
      selected: boolean;
    }>;
  };

  type SelectableREducer = (
    state: SelectableState,
    action: EditAction
  ) => SelectableState;

  let reducer: SelectableREducer;

  beforeAll(() => {
    reducer = editReducer as unknown as SelectableREducer;
  });

  it.each([
    [
      {
        items: [
          {
            id: 0,
            selected: false,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
      {
        type: "select" as const,
        params: [1],
      },
      {
        items: [
          {
            id: 0,
            selected: false,
          },
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
      {
        type: "select" as const,
        params: [0, 1, 2, 3],
      },
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: true,
          },
          {
            id: 3,
            selected: true,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            selected: false,
          },
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
      {
        type: "select" as const,
        params: [0, 2],
      },
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: true,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
    ],
  ])(
    "'select' action should set the items with the ids included in parameters as selected",
    (previousState, action, expectedState) => {
      const nextState = reducer(previousState, action);

      expect(nextState.items.length).toEqual(expectedState.items.length);
      expectedState.items.forEach((item) => {
        expect(nextState.items).toContainEqual(item);
      });
    }
  );

  it.each([
    [
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: true,
          },
          {
            id: 3,
            selected: true,
          },
        ],
      },
      {
        type: "unselect" as const,
        params: [1],
      },
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: true,
          },
          {
            id: 3,
            selected: true,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: true,
          },
        ],
      },
      {
        type: "unselect" as const,
        params: [0, 1, 2, 3],
      },
      {
        items: [
          {
            id: 0,
            selected: false,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: true,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
      {
        type: "unselect" as const,
        params: [1, 2],
      },
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
    ],
  ])(
    "'unselect' action should set the items with the ids included in the parameters as not selected",
    (previousState, action, expectedState) => {
      const nextState = reducer(previousState, action);

      expect(nextState.items.length).toEqual(expectedState.items.length);
      expectedState.items.forEach((item) => {
        expect(nextState.items).toContainEqual(item);
      });
    }
  );

  it.each([
    [
      {
        items: [
          {
            id: 0,
            login: "abc",
            avatar_url: "https://avatars.githubusercontent.com/u/0?v=1",
            html_url: "https://api.github.com/users/0",
            selected: false,
          },
          {
            id: 1,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: false,
          },
          {
            id: 2,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: true,
          },
          {
            id: 3,
            login: "jkl",
            avatar_url: "https://avatars.githubusercontent.com/u/3?v=1",
            html_url: "https://api.github.com/users/3",
            selected: false,
          },
        ],
      },
      {
        type: "duplicate" as const,
      },
      {
        items: [
          {
            id: 0,
            login: "abc",
            avatar_url: "https://avatars.githubusercontent.com/u/0?v=1",
            html_url: "https://api.github.com/users/0",
            selected: false,
          },
          {
            id: 1,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: false,
          },
          {
            id: 2,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: true,
          },
          {
            id: 3,
            login: "jkl",
            avatar_url: "https://avatars.githubusercontent.com/u/3?v=1",
            html_url: "https://api.github.com/users/3",
            selected: false,
          },
          {
            id: 4,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: false,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            login: "abc",
            avatar_url: "https://avatars.githubusercontent.com/u/0?v=1",
            html_url: "https://api.github.com/users/0",
            selected: false,
          },
          {
            id: 1,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: true,
          },
          {
            id: 2,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: true,
          },
          {
            id: 3,
            login: "jkl",
            avatar_url: "https://avatars.githubusercontent.com/u/3?v=1",
            html_url: "https://api.github.com/users/3",
            selected: false,
          },
        ],
      },
      {
        type: "duplicate" as const,
      },
      {
        items: [
          {
            id: 0,
            login: "abc",
            avatar_url: "https://avatars.githubusercontent.com/u/0?v=1",
            html_url: "https://api.github.com/users/0",
            selected: false,
          },
          {
            id: 1,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: true,
          },
          {
            id: 2,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: true,
          },
          {
            id: 3,
            login: "jkl",
            avatar_url: "https://avatars.githubusercontent.com/u/3?v=1",
            html_url: "https://api.github.com/users/3",
            selected: false,
          },
          {
            id: 4,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: false,
          },
          {
            id: 5,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: false,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            login: "abc",
            avatar_url: "https://avatars.githubusercontent.com/u/0?v=1",
            html_url: "https://api.github.com/users/0",
            selected: false,
          },
          {
            id: 1,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: false,
          },
          {
            id: 2,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: false,
          },
          {
            id: 3,
            login: "jkl",
            avatar_url: "https://avatars.githubusercontent.com/u/3?v=1",
            html_url: "https://api.github.com/users/3",
            selected: false,
          },
        ],
      },
      {
        type: "duplicate" as const,
      },
      {
        items: [
          {
            id: 0,
            login: "abc",
            avatar_url: "https://avatars.githubusercontent.com/u/0?v=1",
            html_url: "https://api.github.com/users/0",
            selected: false,
          },
          {
            id: 1,
            login: "def",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=1",
            html_url: "https://api.github.com/users/1",
            selected: false,
          },
          {
            id: 2,
            login: "ghi",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=1",
            html_url: "https://api.github.com/users/2",
            selected: false,
          },
          {
            id: 3,
            login: "jkl",
            avatar_url: "https://avatars.githubusercontent.com/u/3?v=1",
            html_url: "https://api.github.com/users/3",
            selected: false,
          },
        ],
      },
    ],
  ])(
    "'duplicate' action should add one item for each item that have its 'selected' property set to 'true'",
    (previousState, action, expectedState) => {
      const nextState = reducer(previousState, action);

      expect(nextState.items.length).toEqual(expectedState.items.length);
      expectedState.items.forEach((item) => {
        expect(nextState.items).toContainEqual(item);
      });
    }
  );

  it.each([
    [
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
      {
        type: "delete" as const,
        params: [1],
      },
      {
        items: [
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            selected: true,
          },
          {
            id: 1,
            selected: true,
          },
          {
            id: 2,
            selected: true,
          },
          {
            id: 3,
            selected: true,
          },
        ],
      },
      {
        type: "delete" as const,
        params: [1],
      },
      {
        items: [],
      },
    ],
    [
      {
        items: [
          {
            id: 0,
            selected: false,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
      {
        type: "delete" as const,
        params: [1],
      },
      {
        items: [
          {
            id: 0,
            selected: false,
          },
          {
            id: 1,
            selected: false,
          },
          {
            id: 2,
            selected: false,
          },
          {
            id: 3,
            selected: false,
          },
        ],
      },
    ],
  ])(
    "'delete' action should remove each item that has its 'slected' property to true",
    (previousState, action, expectedState) => {
      const nextState = reducer(previousState, action);

      expect(nextState.items.length).toEqual(expectedState.items.length);
      expectedState.items.forEach((item) => {
        expect(nextState.items).toContainEqual(item);
      });
    }
  );
});
