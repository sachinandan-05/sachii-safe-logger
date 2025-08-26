import { maskPhone } from "../src";

test("should mask phone correctly", () => {
  expect(maskPhone("9876543210")).toBe("*******210");
});
