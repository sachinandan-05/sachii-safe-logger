import { maskToken } from "../src";

test("should mask token correctly", () => {
  expect(maskToken("abcd1234efgh5678")).toBe("abcd********5678");
});

test("should fully mask short tokens", () => {
  expect(maskToken("short")).toBe("*****");
});
