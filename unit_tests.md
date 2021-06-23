# Test runner

[Jest](https://jestjs.io/) for the GitHub flow. Read more about “matchers” here:
[Expect](https://jestjs.io/docs/en/expect).

# Tests

## Place tests in the order of tasks
It is natural for the people to implement the task from the beginning, so it is
very convenient if tests check the conditions in the same order as they are in
the description

## Single test case per scenario
When you add a test ask yourself if this test is required and why. Is there any
other test checking the same functionality? If you can find a good reason for
the test to exist - don't write it.

## An exact test should go before the depended tests
If a test checks something it should go before all the tests failing for the 
same reason.

## Check if your tests fail when you expect
Try to write the solution TDD way (running tests after
each change). The next failing test should be the next logical step. If you 
can't write a code that fail some test, remove it.

## First two tests should validate that function is declared and data type the function returns.

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
  
## Don't call `solution` function in 'beforeAll'. Call it in tests.
  
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
  
## Valid and short test case
There should be only necessary and valid steps in a single test case. If a single test case contains too many test steps this may lose its aim.
  **Bad**
  ```javascript
  it(`should work`, () => {
   expect(sum(2, 3)).toBe(5);
   expect(sum(0, 0)).toBe(0);
   expect(sum(-1, 1)).toBe(0);
   expect(sum(-1, 0)).toBe(-1);
  })
  ```
  
  **Good**
  ```javascript
  it(`should return a sum of positive numbers`, () => {
   expect(sum(2, 3)).toBe(5);
  })

  it(`should return 0 when adding zeroes`, () => {
   expect(sum(0, 0)).toBe(0);
  })

  it(`should return 0 when adding additive inverses `, () => {
   expect(sum(-1, 1)).toBe(0);
  })

  it(`should return a negative number when adding negative and zero`, () => {
   expect(sum(-1, 0)).toBe(-1);
  })
  ```
  
## Fill in the 'describe' block
Write a module name that is tested in the **describe** block.

  **BAD**
  ```javascript
  describe('', () => {
   it(`Function 'sum' should return 0 if adding zeroes`, () => {})
   it(`Function 'sum' should have property 'age'`, () => {})
   it(`Function 'sum' should return 0 if called without arguments`, () => {})
  })
  ```

  **GOOD**
  ```javascript
  describe(`Function 'sum':`, () => {
   it(`should return 0 if adding zeroes`, () => {})
   it(`should have property 'age'`, () => {})
   it(`should return 0 if called without arguments`, () => {})
  })
  ```

## Test case descriptions should follow pattern:
`should [EXPECTED_RESULT] when [STATE]`.
With filled in `describe` block each test case description should start with lowercase.

  **BAD**
  ```javascript
  it(`Works without arguments', () => {})
  ```

  **GOOD**
  ```javascript
  it(`should return 0 when called without arguments', () => {})
  ```

## Every single test case should explain what `should be done`.
 
  **BAD**
  ```javascript
  it(`adds zeroes and returns 0`, () => {})
  it(`has property 'age'`, () => {})
  it(`returns 0 if called without arguments`, () => {})
  ```
 
  **GOOD**
  ```javascript
  it(`should return 0 if adding zeroes`, () => {})
  it(`should have property 'age'`, () => {})
  it(`should return 0 if called without arguments`, () => {})
  ```
  
## Use backtics for description, single quotes for variables names and values
  
  **BAD**
 
  ```javascript
  it('Variable "a" should have value '1', variable `b` should have value "2"', () => {});
  ```
  
  **GOOD**
  
  ```javascript
  it(`Variable 'a' should have value '1', variable 'b' should have value '2'`, () => {});
  ```
 
## `it` vs `test`

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

## Avoid the same test case names

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
