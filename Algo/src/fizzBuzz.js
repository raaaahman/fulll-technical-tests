export function fizzBuzz(n) {
  let result = [];

  for (let i = 1; i <= n; i++) {
    let value = (i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "");

    if (!value) value = i;

    result.push(value);
  }

  return result;
}
