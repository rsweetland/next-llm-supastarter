import { add } from "./add";
import { test, expect, describe } from 'vitest';

describe('add function', () => {
  test("Test functions that import server-only", () => {
    expect(add(1, 2)).toBe(3);
  });
});
