import { test, expect } from "vitest";
import { fizzBuzz } from "./fizzBuzz";

test("it should return 1 when argument is 1", () => {
  expect(fizzBuzz(1)).toBe("1");
});
