# Airbnb CSS / Sass Styleguide

*Sebagian pendekatan yang paling umum untuk CSS dan Sass*

## Daftar Isi

  1. [Terminologi](#terminologi)
    - [Rule Declaration](#rule-declaration)
    - [Selectors](#selectors)
    - [Properties](#properties)
  1. [CSS](#css)
    - [Formatting](#formatting)
    - [Comments](#comments)
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
  1. [Translation](#translation)

## Terminologi

### Rule declaration

“Rule declaration” adalah nama yang diberikan pada suatu <em>selector</em> (atau group dari beberapa <em>selector</em>) dengan properti-properti di yang berada dalamnya. Berikut misalnyanya:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors

Di deklarasi rule, “<em>selector</em>” dijelaskan sebagai sebuah aturan yang menjelaskan bagaimana sebuah element di dalam sebuah <em>DOM Tree</em> akan di beri <em>style</em> berdasarkan properti yang dijabarkan di dalamnya. <em>Selector</em> bisa menggunakan HTML Element, class dari HTML element, ID, atau attribute apapun yang terdapat di HTML element tersebut. Berikut beberapa misalnya selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties

Akhirnya, Properti (en :“<em>property</em>”) adalah <em>style</em> apapun yang akan diterapkan pada element terpilih. Properti adalah sebuah pasangan key dan value dengan deklarasi rule yang bisa memuat satu atau lebih deklarasi dari sebuah properti. Deklarasi properti akan terlihat seperti berikut:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### Formatting

* Gunakan “<em>soft tabs</em>” (2 spasi) untuk indentasi
* Lebih baik <em>dashes</em> dibandingkan <em>camelCase</em> di dalam nama class.
  - Garis bawah (_) dan <em>PascalCasing</em> tidak mengapa apabila Anda menggunakan BEM (lihat pembahasan [OOCSS and BEM](#oocss-and-bem) dibawah).
* Jangan gunakan ID selectors
* Ketika menggunakan “<em>multiple selectors</em>” di deklarasi rule, tambahkan baris baru ke masing-masing selector tersebut.
* Tambahkan spasi sebelum kurung kurawal (<em>brace</em>) pembuka `{` di deklarasi rule.
* Di properti, tambahkan spasi setelahnya, tapi tidak sebelumnya dari karakter `:`.
* Tambahkan baris baru pada kurung kurawal (<em>brace</em>) penutup  `}` dari deklarasi rule.
* Tambahkan baris kosong antara deskripsi rule.

**Jangan**

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

**Sebaiknya**

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

* Lebih baik menggunakan <em>comment</em> sebaris (`//` di dalam Sass) dibandingkan blok comment.
* Lebih baik comment di barisnya sendiri. Hindari comments pada baris paling terakhir.
* Tulis dengan detail comment dari sebuah code yang tidak mempunyai dokumentasi sendiri, misal:
  - Penggunaan z-index
  - Kompatibilitas atau hack dari sebuah browser-specific

### OOCSS and BEM

Kami mendorong beberapa kombinasi dari OOCSS dan BEM untuk beberapa alasan berikut:

  * Membantu menulis code dengan lebih jelas, memperjelas hubungan antara CSS dan HTML
  * Membantu kita membuat code reusable, <em>composable components</em>
  * Membuat nesting lebih sedikit dan lebih spesifik
  * Membantu dalam membangun stylesheets yang scalable

**OOCSS**, atau “Object Oriented CSS”, adalah sebuah pendekatan dalam menulis CSS yang mendorong Anda untuk berpikir mengenai <em>stylesheets</em> sebagai sebuah kumpulan “objects”: <em>reusable</em>, potongan code yang bisa digunakan berulang secara independent didalam sebuah website.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, atau “Block-Element-Modifier”, adalah sebuah _naming convention_ untuk “classes” di HTML dan CSS. Pertama kali dibangun oleh Yandex dengan codebase yang besar dan scalability, dan bisa digunakan sebagai kumpulan panduan dalam meng-implementasi OOCSS.

  * CSS Trick's [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts' [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

Kami merekomendasikan variasi dari BEM dengan PascalCased “blocks”, yang bekerja sangat baik bila dikombinasikan dengan components (seperti React). Garis bawah (_ en: underline) dan strip (- en: dashes) tetap digunakan sebagai pembatas untuk modifiers dan anak dibawahnya.

**Contoh**

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

  * `.ListingCard` adalah “block” dan me-representasikan sebuah component dengan level tertinggi
  * `.ListingCard__title` adalah “element” dan me-representasikan sebuah anak dari `.ListingCard` yang membantu membentuk blok secara keseluruhan.
  * `.ListingCard--featured` adalah “modifier” dan me-representasikan sebuah perubahan state atau variasi di `.ListingCard` block.

### ID selectors

Meskipun memungkinkan untuk memilih element berdasarkan ID dalam CSS, hal tersebut umumnya harus dianggap sebagai anti-pola. ID selector memperkenalkan tingkat yang tidak terlalu tinggi [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) terhadap deklarasi rule Anda, dan itu tidak reusable.

Untuk hal ini, baca lebih lanjut [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/).

### JavaScript hooks

Hindari <em>binding</em> class yang sama di kedua CSS dan JavaScript. <em>Conflating</em> antara keduanya sering menyebabkan paling tidak waktu yang terbuang selama refactoring ketika developer harus <em>cross-reference</em> masing-masing class yang berubah, dan yang paling buruk, developer menjadi takut untuk melakukan perubahan karena takut merusak fungsi.

Kami merekomendasikan membuat JavaScript-specific class untuk melakukan binding, dengan prefix `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### Border

Gunakan `0` dibandingkan `none` untuk menjelaskan bahwa style tersebut tidak mempunyai border.

**Jangan**

```css
.foo {
  border: none;
}
```

**Sebaiknya**

```css
.foo {
  border: 0;
}
```

## Sass

### Syntax

* Gunakan `.scss` syntax, Jangan pernah gunakan `.sass` syntax asli.
* Urutkan CSS biasa dan `@include` logika deklarasi Anda (lihat dibawah)

### Mengurutkan deklarasi properti

1. Deklarasi properti

    Daftar semua deklarasi property standard, sesuatu yang bukan sebuah `@include` atau nested selector.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. Deklarasi `@include` 

    Menggabungkan `@include`s di akhir membuatnya lebih mudah untuk membaca keseluruhan selector.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Nested selectors

    Nested selectors, _if necessary_, buat di paling akhir, dan jangan buat apapun setelahnya. Tambahkan spasi antara deklarasi rule Anda dan nested selectors, serta antara nested selectors yang berdekatan. Terapkan pedoman yang sama seperti di atas untuk nested selectors Anda.

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

Lebih baik menggunakan dash-cased untuk nama variabel (misalnya `$my-variable`) dibandingkan camelCased atau snake_cased. Hal ini dapat diterima sebagai awalan nama variabel yang dimaksudkan untuk digunakan hanya dalam file yang sama dengan garis bawah (en: underscore)  (misalnya `$_my-variable`).

### Mixins

Mixin harus digunakan untuk DRY-UP code Anda, menambah kejelasan, atau mengurangi kompleksitas abstrak terlalu dalam sebagaimana juga dengan memberi nama yang baik terhadap function. Mixin yang menerima tanpa argumen dapat berguna untuk ini, tetapi perhatikan bahwa jika Anda tidak mengompresi payload Anda (misalnya gzip), ini dapat berkontribusi terhadap duplikasi code yang tidak perlu dalam style yang dihasilkan.

### Extend directive

`@extend` harus dihindari karena memiliki perilaku unintuitive dan berpotensi berbahaya, terutama bila digunakan dengan nested selectors. Bahkan memperluas selector placeholder pada tingkat atas yang dapat menyebabkan masalah jika urutan selector berubah nantinya (misalnya jika mereka berada di file lain dan urutan load file-file tersebut digeser). Gzip harus menangani sebagian besar penghematan yang akan Anda dapatkan dengan menggunakan `@ extend`, dan Anda tetap dapat men DRY-UP stylesheet Anda baik menggunakan mixin.

### Nested selectors

**Jangan gunakan nested selector lebih dari tiga level!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

Ketika selectors menjadi sebegitu panjang, Anda telah menulis CSS seperti ini:

* Terlalu berpatokan terhadap HTML (rapuh) *—OR—*
* Terlalu spesifik (powerful) *—OR—*
* Tidak reusable


Sekali lagi: **Jangan pernah nesting ID selectors!**


Jika Anda harus menggunakan ID selector di tempat pertama (dan Anda harus benar-benar mencoba untuk tidak melakukannya), mereka tidak boleh nested. Jika Anda menemukan diri Anda melakukan hal ini, Anda perlu untuk meninjau kembali markup Anda, atau mencari tahu mengapa hal tersebut diperlukan. Jika Anda menulis dengan baik HTML dan CSS, Anda seharusnya ** tidak pernah** harus melakukan hal ini.

## Translation
	
  Panduan style ini juga tersedia dalam bahasa lain:

  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [ArvinH/css-style-guide](https://github.com/ArvinH/css-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [CodeMakeBros/css-style-guide](https://github.com/CodeMakeBros/css-style-guide)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)  
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
  - ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnamese**: [trungk18/css-style-guide](https://github.com/trungk18/css-style-guide)
