#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), exponentiation (^), and square root (sqrt).
const operations = {
  "+": (first, second) => first + second,
  add: (first, second) => first + second,
  "-": (first, second) => first - second,
  subtract: (first, second) => first - second,
  "*": (first, second) => first * second,
  multiply: (first, second) => first * second,
  "/": (first, second) => first / second,
  divide: (first, second) => first / second,
  "%": modulo,
  modulo,
  "^": power,
  power,
};

const unaryOperations = {
  sqrt: squareRoot,
  squareRoot,
};

function validateFiniteNumbers(...values) {
  if (!values.every(Number.isFinite)) {
    throw new Error("Operands must be valid finite numbers.");
  }
}

function modulo(a, b) {
  validateFiniteNumbers(a, b);
  if (b === 0) {
    throw new Error("Cannot calculate modulo by zero.");
  }
  return a % b;
}

function power(base, exponent) {
  validateFiniteNumbers(base, exponent);
  return base ** exponent;
}

function squareRoot(n) {
  validateFiniteNumbers(n);
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

function calculate(operation, ...operands) {
  if (Object.hasOwn(unaryOperations, operation)) {
    if (operands.length !== 1) {
      throw new Error("Square root requires exactly one operand.");
    }
    return unaryOperations[operation](operands[0]);
  }

  if (!Object.hasOwn(operations, operation)) {
    throw new Error(
      "Operation must be +, -, *, /, %, ^, add, subtract, multiply, divide, modulo, power, or sqrt.",
    );
  }

  if (operands.length !== 2) {
    throw new Error("This operation requires exactly two operands.");
  }

  const [first, second] = operands;
  validateFiniteNumbers(first, second);

  if ((operation === "/" || operation === "divide") && second === 0) {
    throw new Error("Cannot divide by zero.");
  }

  return operations[operation](first, second);
}

function main(args) {
  if (args.length < 2) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <number> [second-number]",
    );
  }

  const [operation, ...inputs] = args;
  const isUnary = Object.hasOwn(unaryOperations, operation);
  const expectedOperands = isUnary ? 1 : 2;

  if (inputs.length !== expectedOperands) {
    throw new Error(
      `Usage: node src/calculator.js ${operation} <number>${isUnary ? "" : " <second-number>"}`,
    );
  }

  if (inputs.some((input) => input.trim() === "" || !Number.isFinite(Number(input)))) {
    throw new Error("Operands must be valid finite numbers.");
  }

  console.log(calculate(operation, ...inputs.map(Number)));
}

module.exports = { calculate, modulo, power, squareRoot };

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
