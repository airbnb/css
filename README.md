# Airbnb CSS / Sass Советы по стилю кода

*Наиболее разумный подход к CSS и Sass*

## Содержание

1. [Терминология](#terminology)
    - [Объявление правил](#rule-declaration)
    - [Селекторы](#selectors)
    - [Свойства](#properties)
1. [CSS](#css)
    - [Форматирование](#formatting)
    - [Комментарии](#comments)
    - [Объектно-ориентированный CSS (OOCSS) и БЭМ](#oocss-and-bem)
    - [ID Селекторы](#id-selectors)
    - [JavaScript-хуки](#javascript-hooks)
    - [Границы](#border)
1. [Sass](#sass)
    - [Синтаксис](#syntax)
    - [Порядок объявления свойств](#ordering-of-property-declarations)
    - [Переменные](#variables)
    - [Миксины](#mixins)
    - [Наследование](#extend-directive)
    - [Вложенные селекторы](#nested-selectors)
1. [Переводы](#translation)

## Терминология

### Объявление правил

"Объявление правил" это имя данное селектору (или группе селекторов) с сопутствующими ему свойствами. Например:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Селекторы

В объявлении правил, "селекторы" это части, которые определяют, к какому элементу DOM дерева будут применены правила стилей. Селекторы могут соответствовать HTML элементу, а также классу элемента, ID или любому другому атрибуту этого элемента. Вот несколько примеров:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Свойства

И, наконец, свойства, которые придают выбранным элементам их стиль. Свойства объявляются в виде пары "ключ-значение", объявления правил могут содержать одно или несколько свойств. Объявление свойств может выглядеть так:

```css
/* какой-то селектор */ {
  background: #f1f1f1;
  color: #333;
}
```

**[⬆ вернуться к началу](#table-of-contents)**

## CSS

### Форматирование

* Используйте два пробела для отступа
* Предпочитайте тирэ CamelCase'у в именах классов.
  - Подчёркивания и PascalCasing допустимы, если вы используете БЭМ (смотрите [Объектно-ориентированный CSS и БЭМ](#oocss-and-bem) далее).
* Не используйте селекторы по ID
* Используя несколько селекторов в объявлении правила, переносите каждый селектор на отдельную строку.
* Вставляйте пробел перед открывающейся скобкой `{` в объявлении правил
* В свойствах вставляйте пробел после, но не перед символом `:`.
* Вставляте закрывающую скобку `}` объявления правил на новой линии
* Вставляйте пустую строку между объявлениями правил

**Плохо**

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

**Хорошо**

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

### Комментарии

* Предпочитайте однострочные комментарии (`//` в Sass) многострочным.
* Пишите комментарии на их собственной строке. Избегайте комментариев в конце строки.
* Пишите детальные комментарии для кода, который не является самодокументированным:
  - Использование z-index
  - Совместимость или браузерные хаки

### Объектно-ориентированный CSS (OOCSS) и BEM

Мы поощряем некоторые комбинации OOCSS и БЭМ по следующим причинам:

  * Это помогает создавать чистые, строгие отношения между CSS и HTML
  * Это помогает нам создавать переиспользуемые, составные компоненты
  * Это позволяет уменьшить вложенность и понизить специфичность
  * Это помогает создавать масштабируемые таблицы стилей

**OOCSS**, или “Объектно-ориентированный CSS”, это подход для написания CSS, который побуждает вас думать о ваших таблицах стилей как о наборе «объектов»: многоразовых, повторяющихся сниппетов, которые могут независимо использоваться на сайте.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [introduction в OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**БЭМ**, или “Блок-Элемент-Модификатор”, это _соглашение по именованию_ для классов в HTML и CSS. Оно разработано в Yandex ввиду больших баз кода и масштабируемости, и может служить надежным набором руководящих принципов для внедрения OOCSS.

  * CSS Trick's [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts' [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

Мы рекомендуем вариант БЭМа с "блоками" PascalCased, который особенно хорошо работает в сочетании с компонентами (например, React). Подчёркивания и тирэ по-прежнему используются для модификаторов и детей.

**Пример**

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

  * `.ListingCard` это "блок", который представляет собой компонент наивысшего уровня
  * `.ListingCard__title` это "элемент", являющийся потомком `.ListingCard`, который помогает составлять блок в целом
  * `.ListingCard--featured` это "модификатор", который представляем собой другое состояние или вариацию блока `.ListingCard`.

### ID селекторы

Хотя в CSS есть возможность выбирать элементы по идентификатору, такой способ следует рассматривать как анти-шаблон. ID селекторы вводят излишне высокий уровень [специфичности](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) в ваши объявления правил и не могут использоваться повторно.

Подробнее об этом читайте в статье [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/), посвящённой специфике.

### JavaScript-хуки

Избегайте привязки к одному классу CSS и JavaScript логики. Конфликт между ними часто приводит, как минимум, к трате времени на рефакторинг, когда разработчик должен перекрёстно ссылаться на каждый класс, который он меняет, и в худшем случае разработчики боятся вносить изменения, опасаясь нарушить функциональность.

Для привязки мы рекомендуем создавать JavaScript-специфичные классы, с префиксом `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### Границы

Используйте `0` вместо `none`, чтобы указать, что стиль не имеет границы.

**Плохо**

```css
.foo {
  border: none;
}
```

**Хорошо**

```css
.foo {
  border: 0;
}
```
**[⬆ вернуться к началу](#table-of-contents)**

## Sass

### Синтаксис

* Используйте `.scss` синтаксис вместо `.sass`
* Логически упорядочивайте ваши объявления обычного CSS и `@include` (смотрите ниже)

### Упорядочение объявлений свойств

1. Объявления свойств

    Перечислите все стандартные объявления свойств, всё, что не является `@include` или вложенным селектором.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. Объявления `@include`

    Группирование `@include` в конце облегчает чтение всего селектора.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Вложенные селекторы

    Вложенные селекторы, _если необходимо_, идут последними, и после них ничего нет. Добавьте пробелы между объявлениями правил и вложенными селекторами, а также между соседними вложенными селекторами. Примените те же рекомендации, что и выше, к вашим вложенным селекторам.

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

### Переменные

Предпочитайте переменные с dash-cased именами (например, `$my-variable`), а не с camelCased (например, `$myVariable`) или snake_cased (например, `$my_variable`). Допустимым является префикс из нижнего подчёркивания в именах переменных, предназначенных для использования только в одном файле (например, `$ _my-variable`).

### Миксины

Миксины должны использовать DRY-принцип (`Don't repeat yourself`) в вашем коде, добавлять ясности или абстрактной сложности - почти так же, как и именованные функции. Миксины, которые не принимают аргументов, могут быть полезными, но обратите внимание, что если вы не сжимаете свою полезную нагрузку (например gzip'ом), это может способствовать появлению ненужного дублирования кода в результирующих стилях.

### Наследование

Директиву `@extend` следует избегать, поскольку она имеет неинтуитивное и потенциально опасное поведение, особенно при использовании с вложенными селекторами. Сжатие gzip'ом должно обрабатывать большую часть случаев, в которых вы могли получить экономию, используя `@extend`. Также вы можете хорошо сохранить DRY-принцип своих таблиц стилей с помощью миксинов.

### Вложенные селекторы

**Не вкладывайте селекторы больше, чем на три уровня!**

```scss
.page-container {
  .content {
    .profile {
      // СТОП!
    }
  }
}
```

Когда селекторы становятся такими длинными, вы, вероятно, пишите CSS, который:

* Сильно связан с HTML (хрупкий) *—ИЛИ—*
* Чрезмерно специфичный *—ИЛИ—*
* Не переиспользуемый


Ещё раз: **никогда не вкладывайте ID селекторы!**

Если вам надо использовать селектор по ID (а действительно вы не должны этого делать), то он никогда не должен быть вложенным. Если вы всё-таки это сделали, то вам нужно пересмотреть свою разметку или выяснить, зачем необходима такая высокая специфичность. Если вы пишите хороший HTML и CSS, вы **никогда** не должны делать это.

**[⬆ вернуться к началу](#table-of-contents)**

## Переводы

  Этот стайл-гайд  также доступен на других языках:

  - ![id](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png) **Индонезийский**: [mazipan/css-style-guide](https://github.com/mazipan/css-style-guide)
  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Китайский (Традиционный)**: [ArvinH/css-style-guide](https://github.com/ArvinH/css-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Китайский (Упрощённый)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **Французский**: [mat-u/css-style-guide](https://github.com/mat-u/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Японский**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Корейский**: [CodeMakeBros/css-style-guide](https://github.com/CodeMakeBros/css-style-guide)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Португальский**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Русский**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Испанский**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Вьетнамский**: [trungk18/css-style-guide](https://github.com/trungk18/css-style-guide)

**[⬆ вернуться к началу](#table-of-contents)**
