/* eslint-disable jest/no-conditional-expect */
import { render, screen } from "@testing-library/react";

import {
  Feed,
  MESSAGE_LOADING,
  MESSAGE_NETWORK_ERROR,
  MESSAGE_NO_REQUEST,
  MESSAGE_NO_RESULTS,
  MESSAGE_RATE_LIMIT_EXCEEDED,
} from "./Feed";
import { QueryContext } from "../contexts/QueryContext";
// eslint-disable-next-line jest/no-mocks-import
import users from "../__mocks__/github-users_q=mic.json";

describe("The Feed component", () => {
  it("should display a specific message when no request has been sent.", () => {
    render(<Feed />, {
      wrapper: ({ children }) => (
        <QueryContext value={{ data: null, query: () => {}, isPending: false }}>
          {children}
        </QueryContext>
      ),
    });

    expect(screen.getByText(MESSAGE_NO_REQUEST)).toBeVisible();
  });

  it.each([
    {
      data: null,
      query: () => {},
      isPending: true,
    },
    {
      data: [],
      query: () => {},
      isPending: true,
    },
    {
      data: users.items,
      query: () => {},
      isPending: true,
    },
  ])(
    "should display a loading message while the request is pending",
    (context) => {
      render(<Feed />, {
        wrapper: ({ children }) => (
          <QueryContext value={context}>{children}</QueryContext>
        ),
      });

      expect(screen.getByText(MESSAGE_LOADING)).toBeVisible();
    }
  );

  it("should display results if data has been received.", () => {
    render(<Feed />, {
      wrapper: ({ children }) => (
        <QueryContext
          value={{
            data: users.items,
            query: () => {},
            isPending: false,
          }}
        >
          {children}
        </QueryContext>
      ),
    });

    expect(screen.getAllByRole("article")).not.toHaveLength(0);
  });

  it("should display a special message when no results were found.", () => {
    render(<Feed />, {
      wrapper: ({ children }) => (
        <QueryContext value={{ data: [], query: () => {}, isPending: false }}>
          {children}
        </QueryContext>
      ),
    });

    expect(screen.getByText(MESSAGE_NO_RESULTS)).toBeVisible();
  });

  it.each([
    {
      data: null,
      query: () => {},
      isPending: false,
      error: { status: 500, message: "Internal Server Error" },
    },
    {
      data: [],
      query: () => {},
      isPending: false,
      error: { status: 500, message: "Internal Server Error" },
    },
    {
      data: users.items,
      query: () => {},
      isPending: false,
      error: { status: 500, message: "Internal Server Error" },
    },
  ])(
    "should display an error message if an error was thrown from the request.",
    (context) => {
      render(<Feed />, {
        wrapper: ({ children }) => (
          <QueryContext value={context}>{children}</QueryContext>
        ),
      });

      expect(screen.getByText(MESSAGE_NETWORK_ERROR)).toBeVisible();
    }
  );

  it.each([
    [
      {
        data: null,
        query: () => {},
        isPending: false,
        error: { status: 500, message: "Internal Server Error." },
      },
      false,
    ],
    [
      {
        data: null,
        query: () => {},
        isPending: false,
        error: { status: 403, message: "API rate limit exceeded" },
      },
      true,
    ],
  ])(
    "should display a special error message when the application hit the API's rate limit.",
    (context, expectedVisible) => {
      render(<Feed />, {
        wrapper: ({ children }) => (
          <QueryContext value={context}>{children}</QueryContext>
        ),
      });

      if (expectedVisible)
        expect(screen.getByText(MESSAGE_RATE_LIMIT_EXCEEDED)).toBeVisible();
      else
        expect(
          screen.queryByText(MESSAGE_RATE_LIMIT_EXCEEDED)
        ).not.toBeInTheDocument();
    }
  );
});
