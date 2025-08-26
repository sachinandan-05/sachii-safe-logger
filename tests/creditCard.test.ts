import { maskCreditCard } from "../src";

test("should mask credit card correctly", () => {
  expect(maskCreditCard("4111111111111111")).toBe("************1111");
});
