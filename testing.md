# Testing Style Guide <!-- omit in toc -->

[go/testing-style-guide](http://go/testing-style-guide)

- [1\. Test cases](#1-test-cases)
    - [1.1. Single test case per scenario](#11-single-test-case-per-scenario)
    - [1.2. Valid and short test case](#12-valid-and-short-test-case)
    - [1.3. Fill in the 'describe' block](#13-fill-in-the-describe-block)
    - [1.4. Test case descriptions should follow a pattern:](#14-test-case-descriptions-should-follow-a-pattern)
    - [1.5. Every single test case should explain what `should be done`.](#15-every-single-test-case-should-explain-whatshould-be-done)
    - [1.6. Use multiple describe blocks if you test different things](#16-use-multiple-describe-blocks-if-you-test-different-things)
    - [1.7. Backend: Use test factories instead of creating instances explicitly](#17-backend-use-test-factories-instead-of-creating-instances-explicitly)
    - [1.8. Backend: avoid fetching values from database in tests using ORM](#18-backend-avoid-fetching-values-from-database-in-tests-using-orm)
- [2\. E2E Test scenarios](#2-e2e-test-scenarios)
  - [2.1 Allure attributes](#21-allure-attributes)
  - [2.2 Adding allure steps wrappers](#22-adding-allure-steps-wrappers)

1\. Test cases
--------------

#### 1.1. Single test case per scenario

  

When you add a test ask yourself if this test is required and why. Is there any other test checking the same functionality? If you can't find a good reason for the test to exist - don't write it.

  

#### 1.2. Valid and short test case

  

There should be only necessary and valid steps in a single test case. If a single test case contains too many test steps this may lose its aim.

  

```javascript
// ❌ bad
it(`should work`, () => {
 expect(sum(2, 3)).toBe(5);
 expect(sum(0, 0)).toBe(0);
 expect(sum(-1, 1)).toBe(0);
 expect(sum(-1, 0)).toBe(-1);
})

// ✅ good
it(`should return a sum of positive numbers`, () => {
 expect(sum(2, 3)).toBe(5);
});

it(`should return 0 when adding zeroes`, () => {
 expect(sum(0, 0)).toBe(0);
});

it(`should return 0 when adding additive inverses `, () => {
 expect(sum(-1, 1)).toBe(0);
});

it(`should return a negative number when adding negative and zero`, () => {
 expect(sum(-1, 0)).toBe(-1);
});
```

  

#### 1.3. Fill in the 'describe' block

  

Write a module name that is tested in the **describe** block for the unit and integration test cases.

  

```javascript
// ❌ bad
describe('', () => {
 it(`Function 'sum' should return 0 if adding zeroes`, () => {})
 it(`Function 'sum' should have property 'age'`, () => {})
 it(`Function 'sum' should return 0 if called without arguments`, () => {})
});

// ✅ good
describe(`Function 'sum':`, () => {
 it(`should return 0 if adding zeroes`, () => {})
 it(`should have property 'age'`, () => {})
 it(`should return 0 if called without arguments`, () => {})
});
```

  

#### 1.4. Test case descriptions should follow a pattern:

  

`should [EXPECTED_RESULT] when [STATE]`. With filled in `describe` block each test case description should start with lowercase.

  

```javascript
// ❌ bad
it('Works without arguments', () => {})

// ✅ good
it('should return 0 when called without arguments', () => {})
```

  

#### 1.5. Every single test case should explain what `should be done`.

  

```javascript
// ❌ bad
it(`adds zeroes and returns 0`, () => {});
it(`has property 'age'`, () => {});
it(`returns 0 if called without arguments`, () => {});

// ✅ good
it(`should return 0 if adding zeroes`, () => {});
it(`should have property 'age'`, () => {});
it(`should return 0 if called without arguments`, () => {});
```

#### 1.6. Use multiple describe blocks if you test different things

  

```javascript
// ❌ bad
describe('', () => {
  it('BaseRobot class should create a robot', () => {});
  it('FlyingRobot class should create a flying robot', () => {});
});

// ✅ good
describe('BaseRobot class', () => {
  it('should create a robot', () => {});
});

describe('FlyingRobot class', () => {
  it('should create a flying robot', () => {});
});
```

  

#### 1.7. Backend: Use test factories instead of creating instances explicitly

  

Why? To be tool-agnostic. It's possible to update factories in one place instead of checking every test-case separately

  

**💡 Note:** If your project doesn't have factories infrastructure, time to create it

  

```javascript
// ❌ bad
const user = await User.create();

// ✅ good
const user = await userFactory.create();
```

  

#### 1.8. Backend: avoid fetching values from database in tests using ORM

  

Why? Again, to be tool-agnostic and don't rely on existing infrastructure. One day ORM may be changed which may lead to refactoring the whole tests infrastructure

  

```javascript
await client.signUp({ email: 'bob@gmail.com' });

// ❌ bad
const user = await UserModel.findOne({ where: { email: 'bob@gmail.com' }}) // direct DB call is prohibited

// ✅ good
const user = await client.getUser({ email: 'bob@gmail.com' }) // use API client to make sure user is created
```

2\. E2E Test scenarios
----------------------

  

### 2.1 Allure attributes

  

Please see the ["3. Adding attributes to the automated tests"](https://app.clickup.com/24383048/v/dc/q83j8-12520/q83j8-5980?&block=block-f46d3fd3-0ebe-4763-b915-da8b7ba51819) instruction on which allure attributes need to be added to the E2E tests.

  

### 2.2 Adding allure steps wrappers

Please see the ["4.1 Creating steps"](https://app.clickup.com/24383048/v/dc/q83j8-12520/q83j8-5980?&block=block-a08386b0-b139-41ce-826a-5a96d4f3215b) instruction on how to add cypress allure step wrappers.