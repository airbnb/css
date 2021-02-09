# Airbnb CSS / Sass Styleguide

*A mostly reasonable approach to CSS and Sass*

## Table of Contents

1. [Terminology](#terminology)
    - [Rule Declaration](#rule-declaration)
    - [Selectors](#selectors)
    - [Properties](#properties)
1. [CSS](#css)
    - [Formatting](#formatting)
    - [Comments](#comments)
    - [OOCSS and BEM](#oocss-and-bem)
    - [ID Selectors](#id-selectors)
    - [Border](#border)
1. [Sass](#sass)
    - [Syntax](#syntax)
    - [Ordering](#ordering-of-property-declarations)
    - [Variables](#variables)
    - [Mixins](#mixins)
    - [Extend directive](#extend-directive)
1. [Scoutside CSS Implemenation](#scoutside-css-implementation)
1. [Translation](#translation)
1. [License](#license)

## Terminology

### Rule declaration

A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors

In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties

Finally, properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

**[⬆ back to top](#table-of-contents)**

## CSS

### Formatting

* Use soft tabs (2 spaces) for indentation.
* Prefer dashes over camelCasing in class names.
  - Underscores and PascalCasing are okay if you are using BEM (see [OOCSS and BEM](#oocss-and-bem) below).
* Do not use ID selectors.
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace `{` in rule declarations.
* In properties, put a space after, but not before, the `:` character.
* Put closing braces `}` of rule declarations on a new line.
* Put blank lines between rule declarations.

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

### ID selectors

While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern. ID selectors introduce an unnecessarily high level of [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) to your rule declarations, and they are not reusable.

For more on this subject, read [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/) on dealing with specificity.

### Border

Use `0` instead of `none` to specify that a style has no border.

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
**[⬆ back to top](#table-of-contents)**

## Sass

### Syntax

* Use the `.scss` syntax, never the original `.sass` syntax
* Order your regular CSS and `@include` declarations logically (see below)

### Ordering of property declarations

1. Property declarations

    List all standard property declarations, anything that isn't an `@include` or a nested selector.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include` declarations

    Grouping `@include`s at the end makes it easier to read the entire selector.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

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

### Variables

Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names. It is acceptable to prefix variable names that are intended to be used only within the same file with an underscore (e.g. `$_my-variable`).

### Mixins

Mixins should be used to DRY up your code, add clarity, or abstract complexity--in much the same way as well-named functions. Mixins that accept no arguments can be useful for this, but note that if you are not compressing your payload (e.g. gzip), this may contribute to unnecessary code duplication in the resulting styles.

### Extend directive

`@extend` should be avoided because it has unintuitive and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later (e.g. if they are in other files and the order the files are loaded shifts). Gzipping should handle most of the savings you would have gained by using `@extend`, and you can DRY up your stylesheets nicely with mixins.

## Scoutside CSS Implementation

### Use BEM

It may seem a little tricky and tedious at first, but writing clean, unnested BEM reduces nasty css side-effects and makes it easy to understand how classes relate to one another.

Another important benefit of BEM is portability. We write every component as if it could be used in a totally different context than the one it was created for, so that when it is used in a new context, we have no new css to write or modify.

### Definition of "nesting"

These guidelines are largely based around the problems created by nested css and how to avoid them. It's important to distinguish here, that we are only referring to the kind of nesting that limits a selector's styles to a specific context. There are some types of nesting that we do not discourage and that are practical to use.

**Problematic Nesting**

```scss
.template-product {
  .product-details {
    h1 {
      font-size: 36px;
      text-transform: uppercase;
      color: $color-blue;
    }
  }
}
```

If this h1 style is used in a new context, we need to do extra work to locate and unnest these styles.

**Practical Nesting**

```scss
.selector {
  //...
  @media (min-width: $bp-tablet) {
    //...
  }
  &:after {
    //...
  }
  &.selector--modifier {
    //...
  }
}
```

Everything written within the selector above is technically also considered nesting, however, since it directly relates to the selector and does not limit it to a specific context, it makes sense to nest media queries, psuedo-elements, and modifier classes.

### Only nest css when there are no other practical options

Nesting css puts our styles in highly specific contexts and makes it difficult to move components around the site. We should write anything as if it could be reused in a different context from the one it was originally designed for. This way we save precious time and energy when components pop up in different places, as designers build new pages, features, etc.

**Bad**
```scss
.template-product {
  .product-details {
    h1 {
      font-size: 36px;
      text-transform: uppercase;
      color: $color-blue;
    }
  }
}

// Dang!! This same heading style is used in the new slider section on the homepage. I now have to unnest these style.
```

**Good**
```scss
.main-heading {
  font-size: 36px;
  &.main-heading--caps {
    text-transform: uppercase;
  }
  &.main-heading--blue {
    color: $color-blue;
  }
}
```
```html
<h1 class="main-heading main-heading--caps main-heading--blue">
  I'm product details heading. I need to be an h1 for SEO.
</h1>

<h2 class="main-heading main-heading--caps main-heading--blue">
  I'm that new slider section heading. I look exact same as the product details heading.
</h2>
```

**Pro-tip**

If you decide there's no other option than to nest, you can use the parent selector (&) in the following way, so that your selector  exists in as few places as possible in the repo, making it easy to find and debug.

```scss
.selector {
  //...
  .slick-slider & {
    // Compiles to .slick-slider .selector
  }
  .modal & {
    // Compiles to .modal .selector
  }
}

/* Nice! My selector only exists in one place in the scss directory. I don't have to dig through a bunch of files of nested code
to see where my change needs to be made.*/
```

As compared to:

```scss
// _index.scss
.selector {
  //...
}

// _slider.scss 
.slick-slider {
  .selector {
    //...
  }
}

// _modal.scss
.modal {
  .selector {
    //...
  }
}

/* Dang! When I search the repo for .selector, it's in 3 different places and 3 different files. Now I have to spend time finding 
where I should make my change */
```

### Only use classes to write styles. No IDs or html tags.

**Bad**

```scss
button {
  appearance: none;
  border: 1px solid $color-black;
  border-radius: 4px;
  color: $color-black;
  font-weight: 700;
  cursor: pointer;
}

// Dang! I need these exact styles on an <a> tag
```

**Good**

```scss
.btn {
  appearance: none;
  border: 1px solid $color-black;
  border-radius: 4px;
  color: $color-black;
  font-weight: 700;
  cursor: pointer;
}
```
```html
<button class="btn">
  I'm a button
</button>

<a class="btn" href="http://www.coolstore.com">
  I'm a link (but look the same as the button)
</a>
```

By giving everything a class name, our styles are portable and markup-independent. It might seem difficult to give everything a class name, but the BEM convention makes this easier. Because this style of coding is so "class driven", it is makes sense to have the class attribute as the first attribute on any element.

### Write media queries within selectors

Nesting all styles within a single media query for each breakpoint causes excessive scrolling and the mental burden of remembering what the styles were at previous breakpoints.

When searching a repo for a selector whose styles you need to modify, it is much nicer to find that selector in one place, rather than 10. For this reason, it's best to put the media queries within each selector, so when we search for a selector in the repo, there is one place we can go to see everything about it.

**Bad**
```scss
.block__element {
  font-size: 12px;
}
@media (min-width: $bp-tablet) {
  .block__element {
    display: flex;
    justify-content: space-around;
  }
}
@media (min-width: $bp-desktop) {
  .block__element {
    justify-content: space-between;
  }
}
```

**Good**
```scss
.block__element {
  font-size: 12px;
  @media (min-width: $bp-tablet) {
    display: flex;
    justify-content: space-around;
  }
  @media (min-width: $bp-desktop) {
    justify-content: space-between;
  }
}
```

### Use data attributes a Javascript selectors

By using a data attribute as a selector, we can kill two birds with one stone. Not only do we get a selector, but we can also store a value in the data attribute for use in our Javascript. We also segment functionality to something unrelated to css, which makes is easier to see what is affecting a component and how. Lastly, if the class name changes on an element, it still retains it's Javascript functionality.

**Bad**
```html
<button class="btn btn--blue" data-variant-id="{{ product.variants.first.id }}">Add to Cart</button>
```
```js
$('.product-actions .btn').click(function() {
  const variantId = $(this).attr('data-variant-id');
  CartJS.addItem(variantId, 1);
})

// Oh no!! Someone changed .btn to .button and now no one can add to cart!!!
```

**Good**
```html
<button class="btn btn--blue" data-add-to-cart="{{ product.variants.first.id }}">Add to Cart</button>
```
```js
$('[data-add-to-cart]').on('click', function(){
  const variantId = $(this).attr('data-add-to-cart');
  CartJS.addItem(variantId, 1);
});
```

### Use min-width breakpoints

The web community has long touted the benefits of mobile-first development. We should use min-width breakpoints as the standard on any new project.


**[⬆ back to top](#table-of-contents)**

## Translation

  This style guide is also available in other languages:

  - ![id](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png) **Bahasa Indonesia**: [mazipan/css-style-guide](https://github.com/mazipan/css-style-guide)
  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [ArvinH/css-style-guide](https://github.com/ArvinH/css-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **French**: [mat-u/css-style-guide](https://github.com/mat-u/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [CodeMakeBros/css-style-guide](https://github.com/CodeMakeBros/css-style-guide)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese (Brazil)**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)
  - ![pt-PT](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Portugal.png) **Portuguese (Portugal)**: [SandroMiguel/airbnb-css-style-guide](https://github.com/SandroMiguel/airbnb-css-style-guide)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [rtplv/airbnb-css-ru](https://github.com/rtplv/airbnb-css-ru)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnamese**: [trungk18/css-style-guide](https://github.com/trungk18/css-style-guide)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Italy.png) **Italian**: [antoniofull/linee-guida-css](https://github.com/antoniofull/linee-guida-css)
  - ![de](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Germany.png) **German**: [tderflinger/css-styleguide](https://github.com/tderflinger/css-styleguide)

**[⬆ back to top](#table-of-contents)**

## License

(The MIT License)

Copyright (c) 2015 Airbnb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[⬆ back to top](#table-of-contents)**
