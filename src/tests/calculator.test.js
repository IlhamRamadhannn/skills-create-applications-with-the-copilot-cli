const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { calculate, modulo, power, squareRoot } = require("../calculator");

describe("calculator operations", () => {
  it("adds the example operands", () => {
    assert.equal(calculate("+", 2, 3), 5);
  });

  it("subtracts the example operands", () => {
    assert.equal(calculate("-", 10, 4), 6);
  });

  it("multiplies the example operands", () => {
    assert.equal(calculate("*", 45, 2), 90);
  });

  it("divides the example operands", () => {
    assert.equal(calculate("/", 20, 5), 4);
  });

  it("supports operation names as well as symbols", () => {
    assert.equal(calculate("add", 2, 3), 5);
    assert.equal(calculate("subtract", 10, 4), 6);
    assert.equal(calculate("multiply", 45, 2), 90);
    assert.equal(calculate("divide", 20, 5), 4);
  });

  it("handles negative and fractional operands", () => {
    assert.equal(calculate("+", -2.5, 1.5), -1);
    assert.equal(calculate("*", -3, 2.5), -7.5);
    assert.equal(calculate("/", 7.5, 2.5), 3);
  });

  it("allows division with a negative divisor", () => {
    assert.equal(calculate("/", 20, -5), -4);
  });

  it("rejects division by zero", () => {
    assert.throws(() => calculate("/", 20, 0), /Cannot divide by zero/);
    assert.throws(() => calculate("divide", 20, 0), /Cannot divide by zero/);
  });

  it("rejects unsupported operations", () => {
    assert.throws(() => calculate("//", 5, 2), /Operation must be/);
  });

  it("rejects non-finite operands", () => {
    assert.throws(() => calculate("+", Number.NaN, 1), /finite numbers/);
    assert.throws(() => calculate("*", 1, Number.POSITIVE_INFINITY), /finite numbers/);
  });

  it("calculates modulo remainders", () => {
    assert.equal(modulo(5, 2), 1);
    assert.equal(calculate("%", 5, 2), 1);
    assert.equal(modulo(20, 6), 2);
    assert.equal(modulo(-5, 2), -1);
    assert.equal(calculate("%", 20, 6), 2);
    assert.equal(calculate("modulo", 20, 6), 2);
  });

  it("rejects modulo by zero", () => {
    assert.throws(() => modulo(5, 0), /modulo by zero/);
    assert.throws(() => calculate("%", 5, 0), /modulo by zero/);
  });

  it("raises a base to an exponent", () => {
    assert.equal(power(2, 3), 8);
    assert.equal(power(9, 0.5), 3);
    assert.equal(calculate("^", 2, 3), 8);
    assert.equal(calculate("power", 2, 3), 8);
  });

  it("calculates square roots", () => {
    assert.equal(squareRoot(16), 4);
    assert.equal(squareRoot(0), 0);
    assert.equal(calculate("sqrt", 16), 4);
    assert.equal(calculate("squareRoot", 16), 4);
  });

  it("rejects square roots of negative numbers", () => {
    assert.throws(() => squareRoot(-1), /square root of a negative number/);
    assert.throws(() => calculate("sqrt", -1), /square root of a negative number/);
  });

  it("validates unary operation arity", () => {
    assert.throws(() => calculate("sqrt"), /exactly one operand/);
    assert.throws(() => calculate("sqrt", 4, 2), /exactly one operand/);
  });
});
