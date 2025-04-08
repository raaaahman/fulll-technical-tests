import { test, expect } from "vitest";
import { fizzBuzz } from "./fizzBuzz";

test("it should return [1] when argument is 1", () => {
  expect(fizzBuzz(1)).toEqual([1]);
});

test("it should return [1,2] when argument is 2", () => {
  expect(fizzBuzz(2)).toEqual([1, 2]);
});

test.each([
  ["third", 3],
  ["sixth", 6],
])("it should return 'Fizz' as the %s element when argument is %d", (_, n) => {
  expect(fizzBuzz(n).at(n - 1)).toEqual("Fizz");
});

test.each([
  ["fifth", 5],
  ["tenth", 10],
])("it should return 'Buzz' as the %s element when argument is %d", (_, n) => {
  expect(fizzBuzz(n).at(n - 1)).toEqual("Buzz");
});

test.each([
  ["fifteenth", 15],
  ["thirtieth", 30],
])(
  "it should return 'FizzBuzz' as the %s element when argument is %d",
  (_, n) => {
    expect(fizzBuzz(n).at(n - 1)).toEqual("FizzBuzz");
  }
);
