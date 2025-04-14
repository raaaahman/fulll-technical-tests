/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-mocks-import */
import { render, screen } from "@testing-library/react";

import { Feed } from ".";
import {
  MESSAGE_LOADING,
  MESSAGE_NETWORK_ERROR,
  MESSAGE_NO_REQUEST,
  MESSAGE_NO_RESULTS,
  MESSAGE_RATE_LIMIT_EXCEEDED,
} from "./consts";
import { QueryContext } from "../../contexts/QueryContext";
import {
  CONTEXT_INITIAL_REQUEST_NO_RESULTS,
  CONTEXT_INITIAL_REQUEST_PENDING,
  CONTEXT_INITIAL_REQUEST_RATE_API_LIMIT8EXCEEDED,
  CONTEXT_INITIAL_REQUEST_RESULTS,
  CONTEXT_INITIAL_REQUEST_SERVER_ERROR,
  CONTEXT_INITIAL_STATE_NO_REQUEST,
  CONTEXT_SUBSEQUENT_REQUEST_PENDING,
  CONTEXT_SUBSEQUENT_REQUEST_PENDING_NO_RESULTS,
  CONTEXT_SUBSEQUENT_REQUEST_SERVER_ERROR,
  CONTEXT_SUBSEQUENT_REQUEST_SERVER_ERROR_NO_RESULTS,
} from "../../__mocks__/contexts";

describe("The Feed component", () => {
  it("should display a specific message when no request has been sent.", () => {
    render(<Feed />, {
      wrapper: ({ children }) => (
        <QueryContext value={CONTEXT_INITIAL_STATE_NO_REQUEST}>
          {children}
        </QueryContext>
      ),
    });

    expect(screen.getByText(MESSAGE_NO_REQUEST)).toBeVisible();
  });

  it.each([
    CONTEXT_INITIAL_REQUEST_PENDING,
    CONTEXT_SUBSEQUENT_REQUEST_PENDING_NO_RESULTS,
    CONTEXT_SUBSEQUENT_REQUEST_PENDING,
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
        <QueryContext value={CONTEXT_INITIAL_REQUEST_RESULTS}>
          {children}
        </QueryContext>
      ),
    });

    expect(screen.getAllByRole("article")).not.toHaveLength(0);
  });

  it("should display a special message when no results were found.", () => {
    render(<Feed />, {
      wrapper: ({ children }) => (
        <QueryContext value={CONTEXT_INITIAL_REQUEST_NO_RESULTS}>
          {children}
        </QueryContext>
      ),
    });

    expect(screen.getByText(MESSAGE_NO_RESULTS)).toBeVisible();
  });

  it.each([
    CONTEXT_INITIAL_REQUEST_SERVER_ERROR,
    CONTEXT_SUBSEQUENT_REQUEST_SERVER_ERROR_NO_RESULTS,
    CONTEXT_SUBSEQUENT_REQUEST_SERVER_ERROR,
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
    [CONTEXT_INITIAL_REQUEST_SERVER_ERROR, false],
    [CONTEXT_INITIAL_REQUEST_RATE_API_LIMIT8EXCEEDED, true],
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
