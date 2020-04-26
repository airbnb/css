# Airbnb CSS / Sass Still Bələdçisi

*CSS və Sass-a əsaslı bir yanaşma*

## Mündəricat

1. [Terminologiya](#terminologiya)
    - [Declaration qaydası](#declaration-qaydasi)
    - [Seçicilər](#seçicilər)
    - [Properties](#properties)
1. [CSS](#css)
    - [Format](#format)
    - [Commentlər](#şərhlər)
    - [OOCSS və BEM](#oocss-ve-bem)
    - [ID Seçicilər](#id-seciciler)
    - [JavaScript hooks](#javascript-hooks)
    - [Border](#border)
1. [Sass](#sass)
    - [Sintaksis](#sintaksis)
    - [Property sılaması](#ordering-of-property-declarations)
    - [Dəyişkənlər](#variables)
    - [Mixinlər](#mixins)
    - [Genişləndirilmiş directive](#extend-directive)
    - [Nested seçicilər](#nested-selectors)
1. [Tərcümələr](#translation)
1. [Lisenziya](#license)

## terminologiya

### Declaration qaydası

Declaration Qaydası Seçicilərə və ya seçicilər qrupuna verilən addır , propertilərlə birlikdə istifadə edilir. Nümunə aşağıda verilmişdir:


```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Seçicilər

Declaration qaydasına əsasən "seçicilər" Dom ağacındakı elementləri təyin edilmiş propertilərə əsasən stilləşdirən bitlərdir.
Seçicilər HTML elementlərinə  həm də elementlərin class ID yada başqa atributlarına uyğunlaşır. Aşağıda nümunə verilmişdir:


```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties
Son olaraq Propertilər seçilmiş elementlərə təyin edilən dizayn qayadalrıdır.Propertilər key-value cütlüyündən ibarətdir. Propertilərə nümunə aşağıdakı kimidir:


```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

**[⬆ başa qayıt](#mündəricat)**

## CSS

### Formatlama

* Abzas üçün yumuşaq nişan istifadə edin (2 boşluq)   .
* Class adlarında camelCase əvəzinə tirelərdən istifadə edin.
  - Lakin BEM istifadə edirsinizsə  alt-tire və PascalCase istifadə edə bilərsiniz ([OOCSS and BEM](#oocss-and-bem)).
*  ID seçicilər istifadə etməyin.
* Bir neçə sellectoru birlikdə istifadə etdikdə hərəsi üçün bir sətir istifadə edin.
*  `{`-dan sonra boşluq istifadə edin .
*   `:` -dan sonra boşluq istifadə edin (əvvəl yox).
*  `}` -ı yeni sətirdə istifadə edin.
* Hər bir deklarasiyadan sonra boş bir sətir buraxın.

**Pisdir**

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

**Yaxşıdır**

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

### Şərhlər

* Sətir şərhlərindən istifadə edin (`//` in Sass-land) .
* Öz sətiriniz üçün şərhlərinizdən istifadə edin. Sonda şərh yazmaqdan çəkinin.
* Kod üçün ətraflı şərh yazın lakin bu dokumentasiya olmasın:
  - Z-indexin istifadəsi
  - Fərdi brauzerlər və uyğunluq üçün CSS hiylələri

### OOCSS və BEM

Aşağıdaki səbəblərə görə OOCSS və BEM istifadəsini tövsiyə edirik.

  * CSS və HTML arasında təmiz və dəqiq əlaqələr yaradırıq.
  * Yenidən istifadə edilə bilən və birləşdirilə bilən komponentlər yarada bilirik.
  * Daha az nesting və daha az spesifikliyə imkan verir.
  * Ölçüləndirilə bilən still faylı yaratmağımıza kömək edir.

**OOCSS**, və ya “Object Oriented CSS”, CSS kodlarımıza obyektlər kollektivi kimi yanaşmağımıza kömək edir.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, or “Block-Element-Modifier”, CSS-da _adlandırma_üsuludur_ . It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing OOCSS.
Yandex tərəfindən yaradılmışdır və OOCSS-ya solid qaydalar dəsti olaraq xidmət edir.

  * CSS Tricksdən [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Robertsin [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
  * Simuratlinin [BEM nədir?](https://medium.com/pragmatech/bem-n%C9%99dir-da8052081e18)

Biz  BEM-i  PascalCased “blocklarla” istifadəsini məsləhət görürük, çünki komponentlərlə birləşəndə olduqca yaxşı və rahat istifadə edilir. (e.g. React). Alt tire və tirelər  modifierlər and childrenlərdə istifadə edilir.

**Nümunə**

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

  * `.ListingCard`  higher-level componenti göstərən blokdur.
  * `.ListingCard__title` is an “elementdir” və `.ListingCard`ın övladıdır. Blokun bit bütün olaraq yaradılmasına kömək edir.
  * `.ListingCard--featured`  “modifierdir” və  `.ListingCard` elementinin fərqli dizaynlarını əhatə edir.

### ID seçicilər

CSSdə İD seçicilər mövcud olsalarda, ümumən anti-pattern hesab edilirlər. İD seçicilədən istifadə sizin deklarasiyanıza lazımsız dərəcədə yüksək [özünəməxsusluq](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) qazandırır bu isə kodlarınızın yenidən istifadəsinə imkan vermir.

Bu mözu haqqında daha çox öyrənmək üçün [CSS Wizardry'ın məqaləsinə](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/) nəzər yetirin.

### JavaScript hooks

CSS və Javascriptinizi eyni class-a bağlamaqdan çəkinin. İkisini qarışdırmaq bu layihə üzərində işləyən başqa bir developerin əlavə zaman sərf etməsinə və bu kod üzərində dəyişiklik etdikdə funksionallığın qırılmasından qorxmasına səbəb olacaq.

Biz JavaScript üçün təyin edilən class-ların  `.js-` ön şəkilçisi ilə istifadəsini məsləhət görürük:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### Border

Borderin olmadığını bildirmək üçün  `none` əvəzinə `0` dan istifadə edin.

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

### Syntax (Sintaksis)

* Həmişə `.scss` sintaksisi istifadə edin,  `.sass` deyil
* CSS-lərinizin `@include` deklarasiyalarının  məntiqi sırası:

### Properti deklarasiyaları

1. Property declarations

       `@include` və ya iç-içə olmayan  propertilərinizi standart şəkildə sıralayın.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include` declarations

    `@include`nin sonda istifadəsi oxunmanı asanlaşdırır.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. İç-içə seçicilər

    Nested seçicilərdə, _əgər vacibdirsə_, sonda istifadə edin, onlardan əvvəl heçnə istifadə etməyin. İç içə seçicilər arasında  boşluq buraxın.  Bütün nested seçicilərrinizə eyni üsulu tətbiq edin.

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

### Variables (dəyişkənlər)

 camelCased və ya snake_cased əvəzinə Dash-cased dəyişkən adlarına üstünkük verin  (`$my-variable`) . Alt tiredən istidadə edilən dəyişkənlər ancaq eyni səhifədə istifadə edilmirsə işlədilər bilər vəə alt tire dəyişkən adının önünə təyin edilir. ( `$_my-variable`).

### Mixinlər
Yaxşı adlandırılmış funksiyalar kimi Mixinlərdə kodunuzu quru tutmaq və təmiz tutmaq üçün istifadə edilməlidir.
Mixinlər bunun üçün olduqca faydalıdır lakin gzip kimi faly kiçildicilər istifadə etmirsinizsə bu sizin faylınızda çoxlu kod təkrarı yarada bilər.

### Extend directive

Xüsusi ilə nested sellectorlar ilə `@extend` qeyri-ixtiyari və təhlükəli olduğun üçün çəkinilməlidir. Üst səviyyədəki bir seçiciyə tətbiq edilən `@extend` sonralar o seçicinin sırasının dəyişdirilməsi zaman problem yarada bilir(məsələn faylların növbəli oxunmasına əsasən.). Gzippingi istifadə etdiyinizdə siz `@extend`də edə biləcəyiniz bütün şeyləri əhatə edə bilirsiniz və mixinlər istifadə edərək kodunuzu təmiz və quru tuta bilərsiniz.


### Nested seçicilər

**3 səviyyədən çox nested element istifadə etməyin**

```scss
.page-container {
  .content {
    .profile {
      // DAYANIN!
    }
  }
}
```

Seçiciləriniz çox uzun olduğu zaman sizin CSS kodunuz:

* HTML(kövrək) ilə güclü bağlılıq *—və ya—*
* Həddindən artıq spesifik (güclü) *—və ya—*
* Yenidən istifadəyə qapalı


Yenidən: **iç içə seçicilərə ID seçici istifadə etməyin!**
Əgər məcburi olaraq ID seçici istifadə etməliyiksə heç vaxt nested seçici içərisinə daxil olmamalıdır. Bunu etsəniz belə niyə bu qədər güclü bir spesifikliyə ehtiyac olduğunu nəzərdən keçirməlisiniz.Əgər əla formatda bir HTML və ya CSS yazmaq istəyirsinizsə **heç vaxt** bunu etməyə ehtiyac duymayın.

**[⬆ Başa qayıt](#table-of-contents)**

## Translation

  Aşağıdakı dillərdə bu mənbələrə çata bilərsiniz:

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
  - ![de](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Germany.png) **German**: [tderflinger/css-styleguide](https://github.com/tderflinger/css-styleguide);
  - ![az](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Azerbaijan.png) **Azerbaijanian**: [https://github.com/Simuratli/airbnb-css-az)

**[⬆ back to top](#table-of-contents)**

## License

(The MIT License)

Copyright (c) 2015 Airbnb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[⬆ back to top](#table-of-contents)**
