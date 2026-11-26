#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (*), and division (/).
const operations = {
  "+": (first, second) => first + second,
  add: (first, second) => first + second,
  "-": (first, second) => first - second,
  subtract: (first, second) => first - second,
  "*": (first, second) => first * second,
  multiply: (first, second) => first * second,
  "/": (first, second) => first / second,
  divide: (first, second) => first / second,
};

function calculate(operation, first, second) {
  if (!Object.hasOwn(operations, operation)) {
    throw new Error("Operation must be +, -, *, /, add, subtract, multiply, or divide.");
  }

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error("Operands must be valid finite numbers.");
  }

  if ((operation === "/" || operation === "divide") && second === 0) {
    throw new Error("Cannot divide by zero.");
  }

  return operations[operation](first, second);
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <first-number> <second-number>",
    );
  }

  const [operation, firstInput, secondInput] = args;
  const first = Number(firstInput);
  const second = Number(secondInput);

  if (
    firstInput.trim() === "" ||
    secondInput.trim() === "" ||
    !Number.isFinite(first) ||
    !Number.isFinite(second)
  ) {
    throw new Error("Both operands must be valid finite numbers.");
  }

  console.log(calculate(operation, first, second));
}

module.exports = { calculate };

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
