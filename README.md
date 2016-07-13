# Airbnb CSS / Sass 스타일 가이드

*CSS와 Sass에 대한 가장 합리적인 접근 방법*

## 목차

  1. [용어 설명](#용어-설명)
    - [규칙 선언부](#규칙-선언부)
    - [선택자](#선택자)
    - [속성](#속성)
  1. [CSS](#css)
    - [형식](#형식)
    - [주석](#주석)
    - [OOCSS와 BEM](#oocss와-bem)
    - [ID 선택자](#id-선택자)
    - [자바스크립트 훅](#자바스크립트-훅)
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

### 규칙 선언부

"규칙 선언부(Rule declaration)"는 선택자와 그에 동반되는 속성들을 일컫는 이름입니다. 다음 예시를 참조해주세요:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### 선택자

규칙 선언부에서, "선택자(Selectors)"는 DOM 트리의 어떤 요소들이 정의된 속성(Properties)으로 꾸며질지 결정하는 부분들입니다. 선택자는 HTML 요소들, 뿐만 아니라 한 요소의 클래스, ID, 또는 해당 요소의 어느 속성(attributes)들과도 연결될 수 있습니다. 다음은 선택자에 대한 예시들입니다:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### 속성

마지막으로, "속성(Properties)"은 규칙 선언부의 선택된 요소들이 그들의 스타일을 가지게 하는 것입니다. 속성은 키-값의 쌍으로 구성되며, 규칙 선언부는 하나 이상의 속성 선언부를 가질 수 있습니다. 속성 선언부는 아래와 같은 형태입니다:

```css
/* 특정 선택자 */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### 형식

* 소프트 탭(띄어쓰기 2칸) 을 사용하세요.
* 클래스 이름에는 camelCase 방식보다 `-`를 사용하세요.
  - 만약 당신이 BEM(아래 [OOCSS와 BEM](#oocss와-bem) 참조)을 사용하고 계신다면 `_`와 PalcalCase 방식을 사용하셔도 괜찮습니다.
* ID 선택자를 사용하지 마세요.
* 당신이 규칙 선언부에서 다중 선택자를 사용하실 때, 선택자를 한 줄에 한개씩 적어주세요.
* 규칙 선언부의 여는 괄호 `{` 이전에 띄어쓰기를 넣어주세요.
* 속성 부분에서, `:` 문자 뒤에 띄어쓰기를 넣어주세요. 단, `:` 문자 앞에는 띄어쓰기를 넣지 말아주세요.
* 규칙 선언부의 닫는 괄호 `}`를 새로운 줄에 넣어주세요.
* 규칙 선언부들 사이에 빈 줄을 넣어주세요.

**잘못된 예시**

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

**올바른 예시**

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

### 주석

* 블록주석보다 라인주석(Sass일 경우 `//`)을 권장합니다.
* 주석을 새로운 줄에 적어주세요. 선택자 또는 속성과 같은 줄에 주석을 작성하는 방식을 피해주세요.
* 코드 자체만으로 이해하기 어려운 경우 자세한 주석을 작성해주세요:
  - z-index를 사용하는 경우
  - 특정 브라우저를 지원하기 위해 사용하는 경우

### OOCSS와 BEM

우리는 다음과 같은 이유로 OOCSS와 BEM의 혼용을 권장합니다:

  * CSS와 HTML 사이의 명확하고, 엄격한 관계를 형성하는 데에 도움을 줍니다.
  * 재사용 가능하고, 작성 가능한 컴포넌트를 만드는 데에 도움을 줍니다.
  * 보다 적은 중첩과 낮은 특수성을 갖게 합니다.
  * 확장성 있는 스타일시트를 작성하도록 도움을 줍니다.

**OOCSS**, 또는 “Object Oriented CSS”는 당신의 스타일시트를 "객체"의 모음(한 웹사이트에서 독립적으로 사용되는, 재사용 가능하고 반복 가능한 단편들)으로 생각하게 만드는 CSS 작성 방식입니다.

  * Nicole Sullivan의 [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine의 [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, 또는 “Block-Element-Modifier”는 HTML과 CSS 내부의 클래스에 대한 _명명 협약_입니다. 이것은 원래 대량의 코드베이스와 확장 가능성을 염두에 두고 Yandex에서 개발되었으며, OOCSS 구현을 위한 견고한 가이드라인으로 사용할 수 있습니다.

  * CSS Trick의 [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts의 [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

PascalCase 형태의 블록과 함께 사용하는 BEM의 변형 방식을 권장합니다. 이는 React에서 쓰이는 컴포넌트 등과 결합할 때 효과적입니다. 이 경우에도 `_`와 `-`는 계속 변형자와 자식을 나타내기 위해 사용됩니다.

**예시**

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

  * `.ListingCard`는 "블록"이며 더 높은 단계의 컴포넌트를 나타냅니다
  * `.ListingCard__title`는 "요소"이며 그 블록을 전체로 조정하도록 돕는 `.ListingCard`의 자손임을 나타냅니다
  * `.ListingCard--featured`는 "변형자"이며 '.ListingCard' 블록에 존재하는 다른 상태 또는 변형을 나타냅니다

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

border가 없을 경우에는 `none` 대신 `0`을 사용하세요.

**잘못된 예시**

```css
.foo {
  border: none;
}
```

**올바른 예시**

```css
.foo {
  border: 0;
}
```

## Sass

### 문법

* 항상 `.sass`가 아닌 `.scss` 문법을 사용해주세요.
* 일반적인 CSS와 `@include` 선언은 논리적으로 순서를 정리해주세요. (아래 예시를 참조)

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

    중첩 선택자는 마지막에 위치합니다. 그리고 그 다음으로는 아무것도 적지 않습니다. 규칙 선언부와 중첩 선택자 사이에는 여백을 추가하며, 중첩 선택자 사이에도 마찬가치입니다. 중첩 선택자 내부 속성들 또한 위의 규칙을 따릅니다.

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

Mixin은 코드를 DRY하게 하고 명료하게 하며, 복잡성을 줄이기 위해 사용해야 합니다. 인자를 받지 않는 Mixin은 이럴 때 유용합니다. 하지만 만약 당신이 payload를 압축하지 않는다면(예- gzip), 불필요한 코드 중복이 발생하게 됩니다.

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
