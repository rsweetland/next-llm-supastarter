Implements the following requested change using TDD Workflow

--
$ARGUMENTS
---

##TDD Workflow

### 1. Write Tests First (Red Phase)
- Before implementing any functionality, create a minimal list of test scenarios to cover core functionality
- Confirm these test scenarios with the user before continuing
- Write the minimal test coverage for core functionality
- Tests should initially fail since the implementation doesn't exist yet
- Focus on testing the expected behavior, not implementation details

### 2. Run Tests to Verify Failure
- Use `pnpm test` to run the test suite
- Confirm tests fail with meaningful error messages
- This validates that tests are properly detecting missing functionality

### 3. Implement Minimal Code (Green Phase)
- Write just enough code to make the tests pass
- Don't add extra functionality not covered by tests
- Focus on making tests green, not on perfect code

### 4. Refactor (Refactor Phase)
- Clean up the code while keeping tests passing
- Improve code structure, naming, and organization
- Run tests after each change to ensure nothing breaks

### 5. Iterate
- Run tests after implementation using `pnpm test`
- Use `pnpm test:watch` for continuous feedback during development
- Address any failing tests immediately
- Add more tests for edge cases and error scenarios

## Test Structure Guidelines

- **Co-location**: Place test files next to source files (`.test.tsx`, `.test.ts`)
- **Descriptive Names**: Write test names that clearly explain what is being tested
- **AAA Pattern**: Use Arrange-Act-Assert pattern for clear test structure
- **Behavior Focus**: Test what the code does, not how it does it
- **Isolation**: Each test should be independent and not rely on other tests

## Planning Considerations

When planning features with TDD:
1. Identify core functionality that needs test coverage
2. Consider edge cases and error scenarios
3. Plan test structure before implementation
4. Think about test data and mocks needed

## Commands

- `pnpm test` - Run full test suite
- `pnpm test:watch` - Run tests in watch mode (auto-runs on file changes)
- `pnpm test:inspect` - Run tests with debugger attached
- `pnpm test:ci` - Run tests with coverage for CI

## Example TDD Flow

```typescript
// 1. Write failing test first
describe('calculateTotal', () => {
  it('should calculate sum of items with tax', () => {
    const items = [{ price: 10 }, { price: 20 }];
    const result = calculateTotal(items, 0.1);
    expect(result).toBe(33); // 30 + 3 tax
  });
});

// 2. Run test - it fails (function doesn't exist)

// 3. Write minimal implementation
function calculateTotal(items, taxRate) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal + (subtotal * taxRate);
}

// 4. Run test - it passes

// 5. Refactor if needed, add more tests for edge cases
```

Remember: The goal is to have confidence in your code through comprehensive tests written before implementation.
