# HTML, CSS and Sass style guide

## Table of Contents

1. [General formatting](#general-formatting)
    - [Indentation](#indentation)
    - [Capitalization](#capitalization)
    - [Action items](#action-items)
    - [File names](#file-names)
1. [HTML](#html)
    - [HTML validity](#html-validity)
    - [Semantics](#semantics)
    - [Multimedia fallback](#multimedia-fallback)
    - [Separation of concerns](#separation-of-concerns)
    - [Entity references](#entity-references)
    - [Optional tags](#optional-tags)
    - [type attributes](#type-attributes)
1. [HTLM Formatting](#html-formatting)
    - [General formatting](#general-formatting)
    - [HTML line-wrapping](#html-line-wrapping)
    - [HTML quotation marks](#html-quotation-marks)
1. [CSS](#css)
    - [Formatting](#formatting)
    - [Comments](#comments)
    - [Inline styles](#inline-styles)
    - [Elements width](#elements-width)
    - [OOCSS and BEM](#oocss-and-bem)
    - [ID Selectors](#id-selectors)
    - [JavaScript hooks](#javascript-hooks)
    - [Border](#border)
1. [Sass](#sass)
    - [Syntax](#syntax)
    - [Ordering](#ordering-of-property-declarations)
    - [Variables](#variables)
    - [Mixins](#mixins)
    - [Extend directive](#extend-directive)
    - [Nested selectors](#nested-selectors)
    - [BEM element nesting](#bem-element-nesting)
    - [BEM modifier usage](#bem-modifier-usage)
    - [BEM blocks in blocks](#bem-blocks-in-blocks)

## General formatting

### Indentation
* Use soft tabs (2 spaces) for indentation
* Don’t use tabs or mix tabs and spaces for indentation.

**Examples**
```html
<ul>
  <li>Fantastic
  <li>Great
</ul>
```

```css
.example {
  color: blue;
}
```

### Capitalization
* Use only lowercase.
* All code has to be lowercase: This applies to 
   * HTML element names
   * attributes
   * attribute values (unless text/CDATA)
   * CSS selectors
   * properties and property values (with the exception of strings).
   
**Bad**
```html
<A HREF="/">Home</A>
```

**Good**
```html
<img src="google.png" alt="Google">
```

**Bad**
```css
color: #E5E5E5;
```

**Good**
```css
color: #e5e5e5;
```

### Action items
* Mark todos and action items with TODO.
* Highlight todos by using the keyword TODO only, not other common formats like @@.
* Append a contact (username or mailing list) in parentheses as with the format TODO(contact).
* Append action items after a colon as in TODO: action item.

```html
{# TODO(john.doe): revisit centering #}
<center>Test</center>
```

```html
<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

### File names
Do not use white space in file names. They complicate shell scripts

**[⬆ back to top](#table-of-contents)**

## HTML
### HTML validity
* Use valid HTML where possible.
* Use tools such as the [W3C HTML validator](https://validator.w3.org/nu/) to test.

**Bad**
```html
<title>Test</title>
<article>This is only a test.
```

**Good**
```html
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>
```

### Semantics
* Use HTML according to its purpose.

**Bad**
```html
<div onclick="goToRecommendations();">All recommendations</div>
```

**Good**
```html
<a href="recommendations/">All recommendations</a>
```

### Multimedia fallback
* For images, videos, animated objects via canvas, make sure to offer alternative access. 
* For images that means use of meaningful alternative text (`alt`)
* For video and audio provide transcripts and captions, if available.
* Alternative contents is important for accessibility reasons: A blind user has few cues what an image is about without @alt
* Images whose `alt` attributes introduces redundancy, and images whose purpose is decorative, use no alternative text, as in `alt=""`

**Bad**
```html
<img src="spreadsheet.png">
```

**Good**
```html
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

### Separation of concerns
Separate structure from presentation from behavior.

That is, make sure documents and templates contain only HTML and HTML that is solely serving structural purposes. Move everything presentational into style sheets, and everything behavioral into scripts.

Separating structure from presentation from behavior is important for maintenance reasons. It is always more expensive to change HTML documents and templates than it is to update style sheets and scripts.

**Bad**
```html
<!DOCTYPE html>
<title>HTML sucks</title>
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="grid.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
<h1 style="font-size: 1em;">HTML sucks</h1>
<p>I’ve read about this on a few sites but now I’m sure:
  <u>HTML is stupid!!1</u>
<center>I can’t believe there’s no way to control the styling of
  my website without doing everything all over again!</center>
```

**Good**
```html
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually
  doing it: separating concerns and avoiding anything in the HTML of
  my website that is presentational.
<p>It’s awesome!
```

### Entity references
* Do not use entity references.
* There is no need to use entity references like `&mdash;`, `&rdquo;`, or `&#x263a;`
* The only exceptions are characters with special meaning (like `<` and `&`) and “invisible” characters (like no-break spaces).

**Bad**
```html
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.
```

**Good**
```html
The currency symbol for the Euro is “€”.
```

### `type` attributes
* Omit `type` attributes for style sheets and scripts.


**Bad**
```html
<link rel="stylesheet" href="https://www.google.com/css/maia.css" type="text/css">
<script src="https://www.google.com/js/gweb/analytics/autotrack.js" type="text/javascript"></script>
```

**Good**
```html
<link rel="stylesheet" href="https://www.google.com/css/maia.css">
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
```

**[⬆ back to top](#table-of-contents)**

## HTML Formatting
### General Formatting
Use a new line for every block, list, or table element, and indent every such child element.

Independent of the styling of an element (as CSS allows elements to assume a different role per display property), put every block, list, or table element on a new line.

Also, indent them if they are child elements of a block, list, or table element.

```html
<blockquote>
  <p><em>Space</em>, the final frontier.</p>
</blockquote>
```

```html
<ul>
  <li>Moe</li>
  <li>Larry</li>
  <li>Curly</li>
</ul>
```

### HTML line-wrapping
Break long lines (optional).

While there is no column limit recommendation for HTML, you may consider wrapping long lines if it significantly improves readability.

When line-wrapping, each continuation line should be indented at least 4 additional spaces from the original line.

```html
<md-progress-circular
  md-mode="indeterminate"
  class="md-accent"
  ng-show="ctrl.loading"
  md-diameter="35"
>
</md-progress-circular>
```

### HTML quotation marks
* When quoting attributes values, use double quotation marks.
* Use double ("") rather than single quotation marks ('') around attribute values.

**Bad**
```html
<a class='maia-button maia-button-secondary'>Sign in</a>
```

**Good**
```html
<a class="maia-button maia-button-secondary">Sign in</a>
```

**[⬆ back to top](#table-of-contents)**

## CSS

### Formatting

* Use dashes in class names.
  - Underscores and PascalCasing are okay if you are using BEM (see [OOCSS and BEM](#oocss-and-bem) below).
* Do not use ID selectors
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace `{` in rule declarations
* In properties, put a space after, but not before, the `:` character.
* Put closing braces `}` of rule declarations on a new line
* Put blank lines between rule declarations

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

### Inline styles
* Do not use inline-styles. They are not reusable and hard to override.

**Bad**
```html
<a style="color:red;">red link</a>
```

**Good**
```html
<a class="highlighted-link">red link</a>
```

### Elements width
Do no hardcode width of elements containing text that might be i18n-ed. e.g. buttons and links almost never have fixed width.

### \<IMG> or background-image
* Use `<IMG>` (with `alt` text) when the image has an important semantic meaning. This ensures that the meaning of the image can be communicated in all user-agents, including screen readers.
* Use CSS `background-image` if the image is not part of the content (e.g. icons).

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

### JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

We recommend creating JavaScript-specific classes to bind to, prefixed with `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

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

### Nested selectors

**Do not nest selectors more than three levels deep!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) *—OR—*
* Overly specific (powerful) *—OR—*
* Not reusable


Again: **never nest ID selectors!**

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well formed HTML and CSS, you should **never** need to do this.

### BEM element nesting

#### Bad

```scss
.menu {
  li {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      color: $my-blue;
      text-decoration: none;
    }
  }
}
```

```html
<ul class="menu">
  <li><a href="#">My Link</a></li>
  <li><a href="#">My Second Link</a></li>
</ul>
```

#### Good

```scss
.menu {
  &__item {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__link {
    color: $my-blue;
    text-decoration: none;
  }
}
```

```html
<ul class="menu">
  <li class="menu__item"><a href="#" class="menu__link">My Link</a></li>
  <li class="menu__item"><a href="#" class="menu__link">My Second Link</a></li>
</ul>
```

### BEM modifier usage

#### Bad

```scss
.menu {
  &__item {
    list-style: none;
    margin: 0;
    padding: 0;

    &:first-child .menu__link {
      border-left: 1px solid $my-blue;
    }
  }

  &__link {
    color: $my-blue;
    text-decoration: none;
  }

  &__active {
    color: $my-green;
  }
}
```

```html
<ul class="menu">
  <li class="menu__item">
    <a href="#" class="menu__link">My Link</a>
  </li>
  <li class="menu__item">
    <a href="#" class="menu__link menu__active">My Second Link</a>
  </li>
</ul>
```


#### Good

```scss
.menu {
  &__item {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__link {
    color: $my-blue;
    text-decoration: none;

    &--first {
      border-left: 1px solid $my-blue;
    }

    &--active {
      color: $my-green;
    }
  }
}
```

```html
<ul class="menu">
  <li class="menu__item">
    <a href="#" class="menu__link menu__link--first">My Link</a>
  </li>
  <li class="menu__item">
    <a href="#" class="menu__link menu__link--active">My Second Link</a>
  </li>
</ul>
```


### BEM blocks in blocks

#### Bad

```scss
// header.scss
.header {
  &__menu {
    // ...
  }

  .button {
    margin: 0;
  }
}

// button.scss
.button {
  background: $my-blue;
  color: $white;
  margin: 5px 0;
  padding: 10px;

  &--primary {
    background: $my-green;
  }
}
```

```html
<div class="header">
  <ul class="header__menu">...</ul>
  <a href="#" class="button button--primary">
    My awesome Button
  </a>
</div>
```


#### Good

```scss
// header.scss
.header {
  &__menu {
    // ...
  }
}

// button.scss
.button {
  background: $my-blue;
  color: $white;
  margin: 5px 0;
  padding: 10px;

  &--primary {
    background: $my-green;
  }

  &--no-margin {
    margin: 0;
  }
}
```

```html
<div class="header">
  <ul class="header__menu">...</ul>
  <a href="#" class="button button--primary button--no-margin">
    My awesome Button
  </a>
</div>
```

**[⬆ back to top](#table-of-contents)**
