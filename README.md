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
    - [Объектно-ориентированный CSS и БЭМ](#oocss-and-bem)
    - [ID Селектор](#id-selectors)
    - [Хуки JavaScript](#javascript-hooks)
    - [Границы](#border)
  1. [Sass](#sass)
    - [Синтаксис](#syntax)
    - [Порядок объявления свойств](#ordering-of-property-declarations)
    - [Переменные](#variables)
    - [Миксины](#mixins)
    - [Наследование](#extend-directive)
    - [Вложенные селекторы](#nested-selectors)
  1. [Переводы](#translations)
  1. [Лицензия](#license)

## <a name="terminology">Терминология</a>

### <a name="rule-declaration">Объявление правил</a>

"Объявление правил" это имя данное селектору (или группе селекторов) с сопутствующими ему свойствами. Например:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### <a name="selectors">Селекторы</a>

В объявлении правил "селекторы" - это части, которые определяют, к какому элементу DOM дерева будут применены правила стилей. Селекторы могут соответствовать HTML элементу, а также классу элемента, ID или любому другому атрибуту этого элемента. Вот несколько примеров:


```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### <a name="properties">Свойства</a>

И, наконец, свойства, которые придают выбранным элементам их стиль. Свойства объявляются в виде пары "ключ-значение", объявления правил могут содержать одно или несколько свойств. Объявление свойств может выглядеть так:


```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

**[⬆ к оглавлению](#Оглавление)**

## CSS

### <a name="formatting">Форматирование</a>

* Используйте 2 пробела для отступа.
* Предпочитайте подчеркивание CamelCase'у в именах классов.
  - Подчеркивания и PascalCasing допустимы, если вы используете БЭМ (смотри [Объектно-ориентированный CSS и БЭМ](#oocss-and-bem) далее)
* Не используйте селекторы по ID.
* Используя несколько селекторов в объявлении правила переносите каждый селектор на отдельную строку.
* Ставьте пробел перед открывающей скобкой `{`.
* В свойствах ставьте пробел после двоеточия `:`, но не перед.
* После объявления свойства переносите закрывающую скобку `}` на новую строку. 
* Делайте отступ в одну строку между объявлениями правил.

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

### <a name="comments">Комментарии</a>

* Предпочитайте однострочные (`//`) комментарии многострочным.
* Рекомендуется писать комментарии в отдельные строки. Старайтесь избегать комментариев в конце строки.
* Пишите детальные комментарии для неочевидного кода:
  - Использование z-index
  - Совместимость с браузерами или CSS-хаки

### <a name="oocss-and-bem">Объектно-ориентированный CSS и БЭМ</a>

Мы рекомендуем комбинировать Объектно-ориентированный CSS и БЭМ по следующим причинам:

  * Это помогает создать чистую, строгую связь между CSS и HTML.
  * Помогает создавать многоразовые, составные компоненты.
  * Меньше вложенностей, низкая специфичность правил.
  * Способствует созданию масштабируемых таблиц стилей.


**OOCSS**, или "Объектно-ориентированный CSS" - это подход к написанию CSS, который призывает думать о таблице стилей как о коллекции "объектов": многоразовых, повторяемых фрагментах кода, которые могут использоваться независимо друг от друга на всём сайте.
  * Nicole Sullivan [OOCSS вики](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine [Введение в Объектно-ориентированный CSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**БЭМ**, или "Блок-Элемент-Модификатор" - это соглашение об именовании классов в HTML и CSS. Разработано Яндексом с прицелом на большие объёмы кода и масштабируемость. Может послужить как солидный набор правил для использования OOCSS.
  * CSS Trick's [БЭМ 101](https://css-tricks.com/bem-101/)
  * Harry Roberts [Введение в БЭМ](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

Мы рекомендуем вариант БЭМ, в котором используются PascalCased "блоки", отлично работающие в связке с компонентами (например React).
Подчеркивания и тире по-прежнему используются для модификаторов и элементов.

**Примеры**

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

  * `.ListingCard` является "блоком" и представляет родительский компонент
  * `.ListingCard__title` является "элементом" и представляет дочерний компонент `.ListingCard`, который позволяет составить блок в целом.
  * `.ListingCard--featured` является "модификатором" и представляет разные состояния `.ListingCard`.

### <a name="id-selectors">Селекторы по ID</a>

Возможность выбирать элементы по ID в CSS является, как правило, плохой практикой. ID селекторы предоставляют неоправданно высокий уровень специфичности и невозможность многоразового использования.

Более подробная информация по этому вопросу: [Статья CSS Wizardry](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)

### <a name="javascript-hooks">JavaScript хуки</a>

Избегайте использования одинаковых имён классов в CSS и JavaScript. Использование одинаковых имён классов может привести, как минимум, к потере времени при рефакторинге, и как максимум к боязни разработчика сломать функционал вводом изменений.

Мы рекомендуем создавать отдельные имена классов для JavaScript используя префикс `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### <a name="border">Границы</a>

Для обозначения отсутствия границы используйте `0` вместо `none`.

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

**[⬆ к оглавлению](#Оглавление)**

## Sass

### <a name="syntax">Синтаксис</a>

* Всегда используйте `.scss` синтаксис, и никогда оригинальный `.sass` синтаксис.
* Упорядочивайте обычный CSS и `@include`-объявления логически.

### <a name="ordering-of-property-declarations">Порядок объявления свойств</a>

1. Объявления свойств

    Перечислите все стандартные объявления свойств - всё, что не является `@include`-объявлением или вложенным селектором.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include`-объявления

    Группирование `@include`-объявлений в конце правила делает код более читаемым.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Вложенные селекторы

    Вложенные селекторы, _если необходимо_, идут последними, и ничего не должно идти после них. Добавьте пробел между объявлением правила и вложенным селектором, а также между смежными вложенными селекторами. Применяйте эти принципы к вашим вложенным селекторам.

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

### <a name="variables">Переменные</a>

Отдавайте предпочтение именам переменных разделенных тире (например `$my-variable`). Допускается использование подчеркивания в виде префикса для имён, которые будут использоваться в пределах одного файла (например `$_my-variable`).


### <a name="mixins">Миксины</a>

Миксины должны использоваться для поддержания чистоты и ясности кода или абстрактной сложности во многом так же, как и хорошо названные функции. Миксины, не принимающие никаких аргументов, могут быть полезны для этого. Но нужно иметь в виду, что если вы не сжимаете свои файлы (например gzip), то это может привести к лишнему повторению кода.


### <a name="extend-directive">Наследование</a>

Использование `@extend` необходимо избегать из-за его неинтуитивности и потенциальной опасности в поведении, особенно при использовании вместе со вложенными селекторами. Даже наследование селекторов верхнего уровня может создать проблемы, если в будущем будет изменён порядок селекторов. Сжатие компенсирует экономию, которую вы получили бы с помощью наследования.


### <a name="nested-selectors">Вложенные селекторы</a>

**Вложенные селекторы не должны быть глубже трёх вложений**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

Когда селекторы становятся слишком длинными (например как в примере показанном выше), скорее всего вы пишете CSS, который:

* Слишком сильно привязан к HTML (хрупкий)
* Слишком специфичен 
* Не многоразовый 


И вновь: **никогда не используйте селекторы по ID!**

Если вы вынуждены использовать селекторы по ID (вы действительно должны постараться этого не делать), они никогда не должны быть вложенными. Если вы обнаружили это в своём коде - пересмотрите разметку или выясните, зачем нужна такая сильная специфика. Если у вас правильно написанны  HTML и CSS, вам **никогда** не придётся делать этого.  

**[⬆ к оглавлению](#Оглавление)**

### <a name="translations">Переводы</a>

  Этот гид по стилю также доступен на других языках:

  - ![id](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png) **Bahasa Indonesia**: [mazipan/css-style-guide](https://github.com/mazipan/css-style-guide)
  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [ArvinH/css-style-guide](https://github.com/ArvinH/css-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **French**: [mat-u/css-style-guide](https://github.com/mat-u/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [CodeMakeBros/css-style-guide](https://github.com/CodeMakeBros/css-style-guide)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese (Brazil)**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)
  - ![pt-PT](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Portugal.png) **Portuguese (Portugal)**: [SandroMiguel/airbnb-css-style-guide](https://github.com/SandroMiguel/airbnb-css-style-guide)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnamese**: [trungk18/css-style-guide](https://github.com/trungk18/css-style-guide)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Italy.png) **Italian**: [antoniofull/linee-guida-css](https://github.com/antoniofull/linee-guida-css)


**[⬆ к оглавлению](#Оглавление)**

### <a name="license">Лицензия</a>


(The MIT License)

Copyright (c) 2015 Airbnb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[⬆ к оглавлению](#Оглавление)**