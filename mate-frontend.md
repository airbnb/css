# Mate Frontend Style Guide <!-- omit in toc -->

[go/mate-frontend-style-guide](http://go/mate-frontend-style-guide)

- [1. General](#1-general)
    - [1.1. Always add NoSSR to AuthUser query on landings](#11-always-add-nossr-to-authuser-query-on-landings)
    - [1.2. Rename old components before refactoring](#12-rename-old-components-before-refactoring)
    - [1.3. Create new components for A/B tests](#13-create-new-components-for-ab-tests)
- [2. CSS](#2-css)
    - [2.1. Use `rem-calc` function for "size" and "indent" values instead of hardcoding pixels](#21-use-rem-calc-function-for-size-and-indent-values-instead-of-hardcoding-pixels)
    - [2.2. Use `em` units for font-related properties](#22-use-em-units-for-font-related-properties)
    - [2.3. Prefer internal atomic styles for indents](#23-prefer-internal-atomic-styles-for-indents)

## 1. General
#### 1.1. Always add NoSSR to AuthUser query on landings
**Check how it works and cacheable pages in `frontend/ssr-cache`**

>❓Why? Landing pages are cached on the server side to speed up content delivery to the end user. Basically, the rendered HTML is stored and SSR is not happenning afterwards. Executing `AuthUser` query in such conditions leads to bugs including the most critical one with shared user data.

1. Cache is empty, random user Bob opens landing
2. Page is generated with Bob's `AuthUser` in the context, HTML is stored in cache
3. Every new visitor receives Bob's HTML including personal data

```js
// ❌ bad
const { data } = useAuthUserQuery();

// ✅ good
const { data } = useAuthUserQuery({
  ssr: false;
});
```

#### 1.2. Rename old components before refactoring
Let's say the `Chat` component needs refactoring and it's quite complicated to make changes in place. Before creating new `Chat`, rename the existing one to `ChatDeprecated`. It works extremely good for cleanup afterwards

Why not naming new component with `New` suffix? Because it will be hard to understand what is deprecated and another renaming step will be required afterwards (`ChatNew -> Chat`)

```jsx
// ❌ bad
// old component - components/Chat/Chat.tsx
export const Chat: FC<Props> // ...

// new component - components/ChatNew/ChatNew.tsx
export const ChatNew: FC<Props> // ...

// ✅ good
// old component - components/ChatDeprecated/ChatDeprecated.tsx
export const ChatDeprecated: FC<Props> // ...

// new component - components/Chat/Chat.tsx
export const Chat: FC<Props> // ...
```

#### 1.3. Create new components for A/B tests
When we run A/B tests, there's often a need to create new components. It's better to create new components instead of adding new props to existing ones. It will be easier to clean up afterward

But how to handle naming in this case? Adding the `Deprecated` suffix doesn't seem right because the component doesn't become deprecated. The best solution is to add `V1`, `V2`, and so on suffixes to a new component, where `V[number]` stands for the variant of the test

```jsx
// ❌ bad
// old component - components/Chat/Chat.tsx
export const Chat: FC<Props> // ...

// new component - components/ChatNew/ChatNew.tsx
export const ChatNew: FC<Props> // ...

// ❌ bad
// old component - components/ChatDeprecated/ChatDeprecated.tsx
export const ChatDeprecated: FC<Props> // ...

// new component - components/Chat/Chat.tsx
export const Chat: FC<Props> // ...

// ✅ good
// old component - components/Chat/Chat.tsx
export const Chat: FC<Props> // ...

// new component - components/ChatV[1,2,3]/ChatV[1,2,3].tsx
export const ChatV1: FC<Props> // ...
```

## 2. CSS

#### 2.1. Use `rem-calc` function for "size" and "indent" values instead of hardcoding pixels

The `rem-calc` function from the [foundation framework](https://get.foundation/sites/docs/sass-functions.html#rem-calc) converts given value to `rem` units

>❓Why? To make UI more user-friendly for people who changed default font size in the browser settings. It looks better if fonts and indents are adapted as well

```scss
// ❌ bad
font-size: 32px;

// ✅ good
font-size: rem-calc(32);

// ❌ bad
margin-left: 8px;

// ✅ good
margin-left: rem-calc(8);
```

Make sure to use it only for `size` and `indent`. It's not necessary to specify, for example, `border-radius` in `rem`;

#### 2.2. Use `em` units for font-related properties

>❓Why? Otherwise it will be inconsistent if font size changes

```scss
// ❌ bad
font-size: rem-calc(24);
line-height: 32px;
letter-spacing: 2px;

// ✅ good
font-size: rem-calc(24);
line-height: 1.33em; // 32/24 = ~1.33
letter-spacing: 0.06em; // 2/32 = ~0.06
```

#### 2.3. Prefer internal atomic styles for indents

❌ bad
```jsx
<ul>
  <li className={styles.listItem}>
    // content
  </li>
</ul>
```

```scss
.listItem {
  margin-bottom: rem-calc(16);
}
```

❌ bad

Foundation provides set of atomic indents classes but they apply `!important` flag and are inconsistent with our system

```jsx
<ul>
  // applies margin-bottom: 1rem!important;
  <li className="margin-bottom-1"> 
    // content
  </li>
</ul>
```

✅ good
```jsx
<ul>
  // applies margin-bottom: 1rem;
  <li className="mb-16">
    // content
  </li>
</ul>
```

