# LMS tasks tests <!-- omit in toc -->

[go/lms-testing-style-guide](http://go/lms-testing-style-guide)

- [1. Test runner](#1-test-runner)
- [2. Tests](#2-tests)
  - [2.1. Place tests in the order of tasks](#21-place-tests-in-the-order-of-tasks)
  - [2.2. An exact test should go before the depended tests](#22-an-exact-test-should-go-before-the-depended-tests)
  - [2.3. Check if your tests fail when you expect](#23-check-if-your-tests-fail-when-you-expect)
  - [2.4. First two tests should validate that function is declared and data type the function returns.](#24-first-two-tests-should-validate-that-function-is-declared-and-data-type-the-function-returns)
  - [2.5. Don't call `solution` function in 'beforeAll'. Call it in tests.](#25-dont-call-solution-function-in-beforeall-call-it-in-tests)
  - [2.6. `it` vs `test`](#26-it-vs-test)
  - [2.7. Avoid the same test case names](#27-avoid-the-same-test-case-names)

# 1. Test runner

For Javascript tasks, we use an internal test runner for code editor flow and [Jest](https://jestjs.io/) for the GitHub flow. Read more about “matchers” here:
[Expect](https://jestjs.io/docs/en/expect).

# 2. Tests

**FOLLOW GENERAL RECOMMENDATIONS FROM [testing style guide](./testing.md)**

## 2.1. Place tests in the order of tasks
It is natural for the people to implement the task from the beginning, so it is
very convenient if tests check the conditions in the same order as they are in
the description

## 2.2. An exact test should go before the depended tests
If a test checks something it should go before all the tests failing for the 
same reason.

## 2.3. Check if your tests fail when you expect
Try to write the solution TDD way (running tests after
each change). The next failing test should be the next logical step. If you 
can't write a code that fail some test, remove it.

## 2.4. First two tests should validate that function is declared and data type the function returns.

```js
  describe(`The 'functionName'`, () => {
   const functionName = require('./functionName);
  
    it(`should be declared`, () => {
      expect(functionName).toBeInstanceOf(Function);
    });

    it(`should return 'datatype'`, () => {
      expect(typeof functionName(param)).toBe('datatype');
    });
  });
```
  
## 2.5. Don't call `solution` function in 'beforeAll'. Call it in tests.
  
  **BAD**
  ```javascript
  describe(`The 'function'`, () => {
   const solution = require('./solution);
   let result;
  
   beforeAll(() => {
     result = solution();
   });
  
   it(`should do something`, () => {
     expect(result).toBeTruthy();
   });
  });
  ```
  
  **GOOD**
  ```javascript
  describe(`The 'function'`, () => {
   const solution = require('./solution);
  
   it(`should do something`, () => {
     const result = solution();

     expect(result).toBeTruthy();
   });
  });
  ```
 
## 2.6. `it` vs `test`

According to the [official docs](https://jestjs.io/docs/en/api.html#testname-fn-timeout), `it` is an alias for `test`, so both can be technically used for the GitHub flow. **For the moment internal test runner supports only `it`. Don’t use `test` for Code Editor tasks.**
Both `it` and `test` do the same thing, but their names are different and with that, the interaction with the name of the test can be different too.

  **test**
  ```javascript
  describe('yourModule', () => {
   test('if it does this thing', () => {});
   test('if it does the other thing', () => {});
  });
  ```

  What you get if something fails:
  - `yourModule > `**`if`** `it does this thing`

  **it**
  ```javascript
  describe('yourModule', () => {
   it('should do this thing', () => {});
   it('should do the other thing', () => {});
  });
  ```

  - What you get if something fails:
  `yourModule > `**`should`** do this thing
  
  Since we use A "**should** pattern", it's recommended to use `it` in test cases.

## 2.7. Avoid the same test case names

  Every test case should test a separate behavior. Also, tests with the same names are merged while showing results to the end-user. This way test results become unreadable.

  **Bad**
  ![Bad example](https://mate-academy-images.s3.eu-central-1.amazonaws.com/image_11_fa10c44aef.png)
  
  **Good**
  ```javascript
  it(`should return shuffled array with different elements`, () => {
   expect(shuffleArray([2, 5, 1, 3, 4, 7], 3))
     .toEqual([2, 3, 5, 4, 1, 7]);
  });

  it(`should return shuffled array with repeated elements`, () => {
   expect(shuffleArray([1, 2, 3, 4, 4, 3, 2, 1], 4))
     .toEqual([1, 4, 2, 3, 3, 2, 4, 1]);
  });

  it(`should return shuffled array and keep order of elements`, () => {
   expect(shuffleArray([1, 1, 2, 2], 2))
     .toEqual([1, 2, 1, 2]);
  });

  it(`should return shuffled array with only two elements`, () => {
   expect(shuffleArray([1, 2], 1))
     .toEqual([1, 2]);
  });
  ```
