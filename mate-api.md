# Mate API Style Guide <!-- omit in toc  -->

[go/mate-api-style-guide](http://go/mate-api-style-guide)

- [Mate API Style Guide](#mate-api-style-guide)
  - [1\. Data fetching](#1-data-fetching)
      - [1.1. Use repository instead of explicit ORM methods to fetch data from DB](#11-use-repository-instead-of-explicit-orm-methods-to-fetch-data-from-db)
      - [1.2. Always use plain objects instead of ORM instances. Avoid using ORM specific methods outside of the repository](#12-always-use-plain-objects-instead-of-orm-instances-avoid-using-orm-specific-methods-outside-of-the-repository)
      - [1.3. Use `find` and `get` prefixes to specify whether method returns `null` or throws an Error](#13-use-find-and-get-prefixes-to-specify-whether-method-returns-null-or-throws-an-error)
      - [1.4. Store common entity related errors in constants](#14-store-common-entity-related-errors-in-constants)
  - [2\. GraphQL](#2-graphql)
      - [2.1. Always include modified objects in mutation responses](#21-always-include-modified-objects-in-mutation-responses)

1\. Data fetching
-----------------

#### 1.1. Use repository instead of explicit ORM methods to fetch data from DB

  

Why? To be ORM agnostic and have control over the data flow. E.g. if one day we decide to change the fetching method for the user, we can do it in one place - UserRepository.

  

```javascript
// ❌ bad
class FindUserUseCase {
  run(options) {
    return UserModel.findOne({ where: options });
  }
}

// ✅ good
class FindUserUseCase {
  run(options) {
    return this.userRepository.find({ where: options });
  }
}
```

  

#### 1.2. Always use plain objects instead of ORM instances. Avoid using ORM specific methods outside of the repository

  

Why? To be ORM agnostic, again. We shouldn't rely on specific ORM methods where they are not needed

  

```javascript
// ❌ bad
class UserRepository() {
  async find(options) {
    return this.models.User.find({
      where: options,
    });
  }
}

class UpdateUser {
  async run(options) {
    const user = await this.userRepository.find({
      id: options.id
    });
    
    await user.update(options.values); // .update is an ORM method
  }
}


// ✅ good
class UserRepository() {
  async find(options) {
    return this.models.User.find({
      where: options,
      raw: true // or whatever the ORM uses to return the 'raw' value
    });
  }

  async update(id, values) {
    const [count, updatedValues] = await this.models.User.update(
      values,
      {
        where: { id },
        returning: true,
      },
    );

    if (count === 0) {
      this.throwNotFoundError(UserErrors.UserNotFound, {
        id,
        values,
      });
    }

    return updatedValues[0].get(); // or whatever the ORM uses to return the 'raw' value
  }
}

class UpdateUser {
  async run(options) {
    const user = await this.userRepository.update({
      id: options.id,
      values: options.values
    });
  }
}
```

  

#### 1.3. Use `find` and `get` prefixes to specify whether method returns `null` or throws an Error

  

\- **get** \- throws an error  
\- **find** \- returns null or empty array

  

Why? For better consistency. If you write \`get\` you guarantee that value is returned and extra \`null\` checks are redundant

  

```javascript
// ❌ bad
class UserRepository {
  async findOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) { 
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }

  async findAll(options) {
    const result = await this.models.User.findAll({ where: options});

    if (result.length === 0) { 
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}

// ❌ bad
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    return result; // 'result' may be null
  }
}

// ✅ good
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) { 
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}

// best
class UserRepository {
  async findAll(options) {
    const result = await this.models.User.findAll({ where: options});

    return result;
  }

  async getAll(options) {
    const result = await this.findAll(options);

    if (result.length === 0) { 
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }

  async findOne(options) {
    const result = await this.models.User.findOne({ where: options });

    return result;
  }

  async getOne(options) {
    const result = await this.findOne(options);

    if (!result) { 
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}
```

  

#### 1.4. Store common entity related errors in constants

  

Why? Easier to re-use and test the behavior

  

```javascript
// ❌ bad
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) { 
      throw new Error('User not found');
    }

    return result;
  }
}

// ....test.js
await expect(UserRepository.getOne())
  .rejects.toEqual(
    expect.objectContaining({
      message: expect.stringContaining(
        'User not found',
      ),
    })
  );

// ✅ good
class UserRepository {
  async getOne(options) {
    const result = await this.models.User.findOne({ where: options});

    if (!result) { 
      throw new Error(UserErrors.NotFound);
    }

    return result;
  }
}

// ....test.js
await expect(UserRepository.getOne())
  .rejects.toEqual(
    expect.objectContaining({
      message: expect.stringContaining(
        UserErrors.NotFound,
      ),
    })
  );
```

  

2\. GraphQL
-----------

#### 2.1. Always include modified objects in mutation responses

  

Why? GraphQL clients like [Apollo](https://www.apollographql.com/docs/react/) support auto update cache. If a cached object _already_ exists with this key, Apollo Client overwrites any existing fields that are also included in the mutation response (other existing fields are preserved).  
[Read more here](https://www.apollographql.com/docs/react/data/mutations/#include-modified-objects-in-mutation-responses)

  

```bash
// ❌ bad
extend type Mutation {
  updateProfile(values: UpdateProfileValues): Boolean!
}

// ✅ good
extend type Mutation {
  updateProfile(values: UpdateProfileValues): User!
}
```