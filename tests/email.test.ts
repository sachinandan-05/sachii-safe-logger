import { maskEmail } from "../src";

test("should mask email correctly", () => {
  expect(maskEmail("sachin@example.com")).toBe("s*****@example.com");
});
