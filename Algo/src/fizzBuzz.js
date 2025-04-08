export function fizzBuzz(n) {
  let result = [];

  for (let i = 1; i <= n; i++) {
    result.push(i % 5 === 0 ? "Buzz" : i % 3 === 0 ? "Fizz" : i);
  }

  return result;
}
