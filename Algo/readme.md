# Fulll Technical Tests - Algo

This is my take on the FizzBuzz algorithm, written in JavaScript.

## Running the project

This project uses Vite as a development tool. You need to install it as dependency with npm, or a compatible package manager of your choice.

### Development Server

You can run the development server with the following command:

```bash
npm run dev
```

And open the following URL in a web browser: `http://localhost:5173`

### Tests

You can run the test with the following command:

```bash
npm run test
```

## Performance

Tests in Firefox Profiler indicates that the fizzBuzz() function ran in 4.0 milliseconds for n = 100,000, with 0.4% of the CPU usage: https://share.firefox.dev/4cqQtMb

Main bottleneck appears to be the browser reflow event, which ran in 635ms, with 65% of CPU usage.
