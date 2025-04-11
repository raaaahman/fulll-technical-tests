import { act, render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

import { SearchBar } from "./SearchBar";
import { QueryContext } from "../contexts/QueryContext";

describe("The SearchBar component", () => {
  let user: UserEvent;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it.each(["mic", "fulll"])(
    "should send a request for '%s' when the userEvent types it in the searchbox",
    async (needle) => {
      const mockQuery = jest.fn();
      const name = "search-input";

      render(<SearchBar name={name} />, {
        wrapper: ({ children }) => (
          <QueryContext
            value={{ query: mockQuery, data: null, isPending: false }}
          >
            {children}
          </QueryContext>
        ),
      });

      const searchbox = await screen.findByRole("searchbox");

      await user.type(searchbox, needle);

      act(() => {
        jest.advanceTimersByTime(800);
      });

      const args = mockQuery.mock.calls.at(0);
      expect(args).toHaveLength(1);
      expect(args[0]).toBeInstanceOf(FormData);
      expect(args[0].get(name)).toEqual(needle);
    }
  );

  it("should send a maximum of 2 requests per second", async () => {
    const mockQuery = jest.fn();
    const name = "search-input";

    render(<SearchBar name={name} />, {
      wrapper: ({ children }) => (
        <QueryContext
          value={{ query: mockQuery, data: null, isPending: false }}
        >
          {children}
        </QueryContext>
      ),
    });

    const searchbox = await screen.findByRole("searchbox");

    await user.type(searchbox, "mic");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await user.type(searchbox, "ro");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await user.type(searchbox, "so");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await user.type(searchbox, "ft");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await user.type(searchbox, "-l");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByRole("searchbox")).toHaveValue("microsoft-l");
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });
});
