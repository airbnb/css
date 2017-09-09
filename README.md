# Airbnb CSS / Sass поради по стилю кода

*Найбільш розумний підхід до CSS і Sass*

<h2 id="table-of-contents">Зміст</h2>

1. [Термінологія](#terminology)
    - [Оголошення правил](#rule-declaration)
    - [Селектори](#selectors)
    - [Властивості](#properties)
1. [CSS](#css)
    - [Форматування](#formatting)
    - [Коментарі](#comments)
    - [Об'єктно-орієнтований CSS і БЕМ](#oocss-and-bem)
    - [ID Селектор](#id-selectors)
    - [Хуки JavaScript](#javascript-hooks)
    - [Рамки](#border)
1. [Sass](#sass)
    - [Синтаксис](#syntax)
    - [Порядок оголошення властивостей](#ordering-of-property-declarations)
    - [Змінні](#variables)
    - [Міксіни](#mixins)
    - [Спадкування](#extend-directive)
    - [Вкладені селектори](#nested-selectors)
1. [Переклади](#translations)

<h2 id="terminology">Термінологія</h2>

<h3 id="rule-declaration">Оголошення правил</h3>

"Оголошене правило" це ім'я дане селектору (або групі селекторів) з супутніми йому властивостями. Наприклад:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

<h3 id="selectors">Селектори</h3>

В оголошенні правил "селектори" - це частини, які визначають, до якого елементу DOM дерева будуть застосовані правила стилів. Селектори можуть відповідати HTML елементу, а також класу елемента, ID або будь-якого іншого атрибуту цього елемента. Ось кілька прикладів:


```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

<h3 id="properties">Властивості</h3>

І, нарешті, властивості, які надають обраним елементам їх стиль. Властивості оголошуються у вигляді пари "ключ-значення", оголошення правил можуть містити одне або кілька властивостей. Оголошення властивостей може виглядати так:


```css
/* селектор */ {
  background: #f1f1f1;
  color: #333;
}
```
**[⬆ верх](#table-of-contents)**

## CSS

<h3 id="formatting">Форматування</h3>

* Використовуйте 2 пробіла для відступу.
* Віддавайте перевагу підкреслення CamelCase'у в іменах класів.
  - Підкреслення і PascalCasing допустимі, якщо ви використовуєте БЕМ (дивіться [Об'єктно-орієнтований CSS і БЕМ](#oocss-and-bem) дальше)
* Не використовуйте селектори по ID.
* Використовуючи кілька селекторів в оголошенні правила переносьте кожен селектор на окремий рядок.
* Ставте пробіл перед відкриваючою дужкою `{`.
* У властивостях ставте пробіл після двокрапки `:`, але не перед.
* Після оголошення властивості переносьте дужку `}` на новий рядок.
* Робіть відступ в один рядок між оголошеннями правил.

**Погано**

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

**Добре**

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

<h3 id="comments">Коментарі</h3>

* Віддавайте перевагу однорядковим (`//`) коментарям
* Рекомендується писати коментарі в окремі рядки. Намагайтеся уникати коментарів в кінці рядка.
* Пишіть детальні коментарі для неочевидного коду:
  - Використання z-index
  - Сумісність з браузерами

<h3 id="oocss-and-bem">Об'єктно-орієнтований CSS і БЕМ</h3>

Ми рекомендуємо комбінувати Об'єктно-орієнтований CSS і БЕМ з наступних причин:

* Це допомагає створити чистий, строгий зв'язок між CSS і HTML.
* Допомагає створювати багаторазові, складові компоненти.
* Менше вкладень, низька специфічність правил.
* Сприяє створенню масштабованих таблиць стилів.


**OOCSS**, або "Об'єктно-орієнтований CSS" - це підхід до написання CSS, який закликає думати про таблиці стилів як про колекцію "об'єктів": багаторазових, повторюваних фрагментах коду, які можуть використовуватися незалежно один від одного на всьому сайті.
  * Nicole Sullivan [OOCSS вікі](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine [Введення в об'єктно-орієнтований CSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**БЕМ**, або "Блок-Елемент-Модифікатор" - це угода про іменування класів в HTML і CSS. Розроблено Яндексом з прицілом на великі обсяги коду і масштабованість. Може послужити як солідний набір правил для використання OOCSS.
  * CSS Trick's [БЕМ 101](https://css-tricks.com/bem-101/)
  * Harry Roberts [Введення в БЕМ](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

Ми рекомендуємо варіант БЕМ, в якому використовуються PascalCased "блоки", відмінно працюють в зв'язці з компонентами (наприклад React).
Підкреслення і тире як і раніше використовуються для модифікаторів і елементів.
**Приклади**

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

  * `.ListingCard` є "блоком" і є батьківським компонентом
  * `.ListingCard__title` є "елементом" і є дочірнім компонентом `.ListingCard`, який дозволяє скласти блок в цілому.
  * `.ListingCard--featured` є "модифікатором" і представляє різні стани `.ListingCard`.

<h3 id="id-selectors">Селектори по ID</h3>

Можливість вибирати елементи по ID в CSS є, як правило, поганою практикою. ID селектори надають невиправдано високий рівень специфічності і неможливість багаторазового використання.
Більш детальна інформація з цього питання: [Статтся CSS Wizardry](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)

<h3 id="javascript-hooks">JavaScript хуки</h3>

Уникайте використання однакових імен класів в CSS і JavaScript. Використання однакових імен класів може привести, як мінімум, до втрати часу при рефакторингу, і як максимум до боязні розробника зламати функціонал введенням змін.

Ми рекомендуємо створювати окремі імена класів для JavaScript використовуючи префікс `.js-`:

```html
<button class="btn btn-primary js-get-book">Отримати книгу</button>
```

<h3 id="border">Рамки</h3>

Для позначення відсутності рамки використовуйте `0` замість `none`.

**Погано**

```css
.foo {
  border: none;
}
```

**Добре**

```css
.foo {
  border: 0;
}
```
**[⬆ верх](#table-of-contents)**

## Sass

<h3 id="syntax">Синтаксис</h3>

* Завжди використовуйте `.scss` синтаксис, і ніколи оригінальний` .sass` синтаксис.
* Упорядкування звичайний CSS і `@include`-оголошення логічно.

<h3 id="ordering-of-property-declarations">Порядок оголошення властивостей</h3>

1. Оголошення властивостей

    Перерахуйте всі стандартні оголошення властивостей - все, що не є `@include`-оголошенням або вкладеним селектором.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include`-оголошення

    Групування `@include`-оголошень в кінці правила робить код більш читабельним.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Вкладені селектори

   Вкладені селектори, _якщо потрібно_, йдуть останніми, і нічого повинно йти після них. Додайте пробіл між оголошенням правила і вкладеним селектором, а також між суміжними вкладеними селекторами. Застосовуйте ці принципи до ваших вкладених селекторів.

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

<h3 id="variables">Змінні</h3>

Віддавайте перевагу іменам змінних розділених тире (наприклад `$my-variable`). Допускається використання підкреслення у вигляді префікса для імен, які будуть використовуватися в межах одного файлу (наприклад `$_my-variable`).


<h3 id="mixins">Міксини</h3>

Міксини повинні використовуватися для підтримки чистоти і ясності коду або абстрактної складності так само, як і добре названі функції. Міксини, які не отримують ніяких аргументів, можуть бути корисні для цього. Але потрібно мати на увазі, що якщо ви не стискаєте свої файли (наприклад gzip), то це може привести до зайвого повторення коду.


<h3 id="extend-directive">Спадкування</h3>

Використання `@extend` необхідно уникати через його неінтуітивну і потенційної небезпечну поведінку, особливо при використанні разом із вкладеними селекторами. Навіть спадкування селекторів верхнього рівня може створити проблеми, якщо в майбутньому буде змінений порядок селектора. Стиснення компенсує економію, яку ви отримали б за допомогою наслідування.


<h3 id="nested-selectors">Вкладені селектори</h3>

**Вкладені селектори не повинні бути глибше трьох вкладень**

```scss
.page-container {
  .content {
    .profile {
      // СТОП!
    }
  }
}
```

Коли селектори стають занадто довгими (наприклад як в прикладі показаному вище), швидше за все ви пишете CSS, який:

* Занадто сильно прив'язаний до HTML (крихкий)
* Занадто специфічний
* Не багаторазовий


И знову:**ніколи не використовуйте селектори по ID!**
Якщо ви змушені використовувати селектори по ID (ви дійсно повинні постаратися цього не робити), вони ніколи не повинні бути вкладеними. Якщо ви виявили це в своєму коді - перегляньте розмітку або з'ясуйте, навіщо потрібна така сильна специфіка. Якщо у вас правильне написання HTML і CSS, вам**ніколи**не доведеться робити цього.

**[⬆ верх](#table-of-contents)**

<h2 id="translations">Переклади</h2>

  Цей гід по стилю також доступний на інших мовах:

  - ![id](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png) **Bahasa Indonesia**: [mazipan/css-style-guide](https://github.com/mazipan/css-style-guide)
  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [ArvinH/css-style-guide](https://github.com/ArvinH/css-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **French**: [mat-u/css-style-guide](https://github.com/mat-u/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [CodeMakeBros/css-style-guide](https://github.com/CodeMakeBros/css-style-guide)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnamese**: [trungk18/css-style-guide](https://github.com/trungk18/css-style-guide)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Italy.png) **Italian**: [antoniofull/linee-guida-css](https://github.com/antoniofull/linee-guida-css)

**[⬆ верх](#table-of-contents)**
