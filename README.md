# Airbnb CSS / Sass 스타일 가이드

*CSS와 Sass에 대한 가장 합리적인 접근 방법*

## 목차

  1. [용어 설명](#용어 설명)
    - [규칙 선언부(Rule declaration)](#규칙 선언부(Rule declaration))
    - [선택자(Selectors)](#선택자(Selectors))
    - [속성(properties)](#속성(properties))
  1. [CSS](#css)
    - [Formatting](#formatting)
    - [Comments](#comments)
    - [OOCSS and BEM](#oocss-and-bem)
    - [ID 선택자](#id-선택자)
    - [JavaScript hooks](#javascript-hooks)
    - [Border](#border)
  1. [Sass](#sass)
    - [문법](#문법)
    - [순서](#속성-선언-순서)
    - [변수](#변수)
    - [믹스인](#믹스인-mixins)
    - [Extend 지시자](#extend-지시자)
    - [중첩 선택자](#중첩-선택자)
  1. [번역](#번역)

## 용어 설명

### 규칙 선언부(Rule declaration)

"규칙 선언부"는 특정 속성 그룹을 따르는 선택자(또는 선택자로 묶인 그룹)에게 부여되는 이름입니다. 다음 예시를 참조해주세요:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### 선택자(Selectors)

규칙 선언부에서, "선택자"는 DOM 트리의 어떤 요소들이 정의된 속성(Properties)으로 꾸며질지 결정하는 부분들입니다. 선택자는 HTML 요소들, 뿐만 아니라 한 요소의 클래스, ID, 또는 해당 요소의 어느 속성(attributes)들과도 연결될 수 있습니다. 다음은 선택자에 대한 예시들입니다:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### 속성(Properties)

마지막으로, 속성(Properties)은 규칙 선언부의 선택된 요소들이 그들의 스타일을 가지게 하는 것입니다. 속성은 키-값의 쌍으로 구성되며, 규칙 선언부는 하나 이상의 속성 선언부를 가질 수 있습니다. 속성 선언부는 아래와 같은 형태입니다:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### Formatting

* Use soft tabs (2 spaces) for indentation
* Prefer dashes over camelCasing in class names.
  - Underscores and PascalCasing are okay if you are using BEM (see [OOCSS and BEM](#oocss-and-bem) below).
* Do not use ID 선택자
* When using multiple 선택자 in a 규칙 선언부, give each selector its own line.
* Put a space before the opening brace `{` in 규칙 선언부s
* In 속성(properties), put a space after, but not before, the `:` character.
* Put closing braces `}` of 규칙 선언부s on a new line
* Put blank lines between 규칙 선언부s

**Bad**

```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```

**Good**

```css
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```

### Comments

* Prefer line comments (`//` in Sass-land) to block comments.
* Prefer comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting:
  - Uses of z-index
  - Compatibility or browser-specific hacks

### OOCSS and BEM

We encourage some combination of OOCSS and BEM for these reasons:

  * It helps create clear, strict relationships between CSS and HTML
  * It helps us create reusable, composable components
  * It allows for less nesting and lower specificity
  * It helps in building scalable stylesheets

**OOCSS**, or “Object Oriented CSS”, is an approach for writing CSS that encourages you to think about your stylesheets as a collection of “objects”: reusable, repeatable snippets that can be used independently throughout a website.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing OOCSS.

  * CSS Trick's [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts' [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

We recommend a variant of BEM with PascalCased “blocks”, which works particularly well when combined with components (e.g. React). Underscores and dashes are still used for modifiers and children.

**Example**

```jsx
// ListingCard.jsx
function ListingCard() {
  return (
    <article class="ListingCard ListingCard--featured">

      <h1 class="ListingCard__title">Adorable 2BR in the sunny Mission</h1>

      <div class="ListingCard__content">
        <p>Vestibulum id ligula porta felis euismod semper.</p>
      </div>

    </article>
  );
}
```

```css
/* ListingCard.css */
.ListingCard { }
.ListingCard--featured { }
.ListingCard__title { }
.ListingCard__content { }
```

  * `.ListingCard` is the “block” and represents the higher-level component
  * `.ListingCard__title` is an “element” and represents a descendant of `.ListingCard` that helps compose the block as a whole.
  * `.ListingCard--featured` is a “modifier” and represents a different state or variation on the `.ListingCard` block.

### ID 선택자

CSS에서 ID로 요소를 선택하는 것이 가능하긴 하지만, 이것은 안티패턴으로 간주됩니다. ID 선택자는 불필요한 [특수성](https://developer.mozilla.org/en-us/docs/Web/Css/Specificity)을 초래하며 재사용이 불가능하기 때문입니다.

이 주제에 대해 더 알고 싶으시다면, [CSS Wizardry의 글](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)을 읽어보세요.


### 자바스크립트 훅

CSS 클래스 명에 자바스크립트 훅을 거는 것을 권장하지 않습니다. 한 클래스 명에 두 가지를 혼합시키게 되면 결국 리팩토링할 때 두 경우를 모두 고려해야하기 때문에 시간이 낭비되며, 최악의 경우에는 기능이 작동하지 않을 가능성 때문에 개발자가 코드를 변경시키길 두려워할 수도 있습니다.

자바스크립트에 바인드 할 새로운 클래스(접두어로는 `.js-`를 추가)를 만드는 것을 권장합니다:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### Border

border가 없을 경우에는 `0` 대신 `none`을 사용하세요.

**Bad**

```css
.foo {
  border: none;
}
```

**Good**

```css
.foo {
  border: 0;
}
```

## Sass

### 문법

* 항상 `.sass`가 아닌 `.scss` 문법을 사용해주세요.
* 보통 CSS와 `@include` 선언은 논리적으로 순서를 정리해주세요. (아래 예시를 참조)

### 속성 선언 순서

1. 속성 선언

    우선 표준 속성 선언을 먼저 작성합니다. `@include` 혹은 중첩 선택자는 아직 적지 않습니다.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include` 선언

    `@include`를 마지막에 모아놓으면 전체 선택자를 쉽게 독해할 수 있습니다.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. 중첩 선택자

    중첩 선택자는 마지막에 위치합니다. 그리고 그 다음으로는 아무것도 오지 않습니다. 규칙 선언부와 중첩 선택자 사이에는 여백을 추가하며, 중첩 선택자 사이에도 마찬가치입니다. 중첩 선택자 내부 속성들 또한 위의 규칙을 따릅니다.

    ```scss
    .btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .icon {
        margin-right: 10px;
      }
    }
    ```

### 변수

변수 이름을 정할 때는 `-`를 사용하는 것을 권장합니다. 같은 파일 내에서만 사용될 변수에 한해서는 접두어를 추가해도 괜찮습니다. (예- `$_my-variable`).


### 믹스인-Mixins

Mixin은 코드를 DRY하게 하고 명료하게 하며, 복잡성을 줄이기 위해 사용해야 합니다. 인자를 받지 않는 Mixin은 이럴 때 유용합니다. 하지만 만약 당신이 페이로드(payload)를 압축하지 않는다면(예- gzip), 불필요한 코드 중복이 발생하게 됩니다.

### Extend 지시자

`@extend`는 직관적이지 않고 특히 중첩 선택자와 함께 사용할 때 위험성이 있기 때문에 사용하지 않는 것을 권장합니다. 심지어 최상위 placeholder 선택자를 extend해도 선택자들의 순서가 바뀌게 되면 문제가 발생할 수 있습니다. `@extend`를 사용함으로써 얻을 수 있는 이점은 Gzip을 사용하면 해결될 뿐더러, 스타일시트를 DRY하게 만들기 위해서는 mixin을 사용하면 됩니다.

### 중첩 선택자

**중첩은 최대 3번까지!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

만약 선택자가 이렇게 길어진다면, 당신은 다음과 같은 CSS를 작성하고 있을 가능성이 높습니다:

* HTML과 밀접하게 엮여있다.(망가지기 쉬움)
* 너무 구체적이다.
* 재사용할 수 없다.

강조: **절대로 ID 선택자는 중첩하지 마세요!**

어쩔 수 없이 ID 선택자를 사용해야한다면(사용하지 않는 것이 가장 좋습니다.), 절대로 중첩되지 않도록 유의하세요. 만약 중첩시키게 된다면, 왜 그렇게 특수한 케이스가 발생하는지 먼저 고민해보는 것이 좋습니다. 만약 당신이 잘 구성된 HTML과 CSS를 사용한다면 절대로 이렇게 할 필요가 없습니다.  

## 번역

  이 스타일 가이드는 여러가지 언어로 번역 돼 있습니다:

  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)
