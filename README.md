# Airbnb CSS / Sass スタイルガイド

*CSSとSASSを合理的に書くためのガイド*

## 目次

  1. [用語](#terminology)
    - [スタイルの宣言](#rule-declaration)
    - [セレクタ](#selectors)
    - [プロパティ](#properties)
  2. [CSS](#css)
    - [フォーマット](#formatting)
    - [コメント](#comments)
    - [OOCSSとBEM](#oocss-and-bem)
    - [IDセレクタ](#id-selectors)
    - [JavaScriptフック](#javascript-hooks)
    - [ボーダー](#border)
  3. [Sass](#sass)
    - [シンタックス](#syntax)
    - [順序](#ordering-of-property-declarations)
    - [変数](#variables)
    - [ミックスイン](#mixins)
    - [Extend記法](#extend-directive)
    - [セレクタのネスト](#nested-selectors)
  4. [翻訳](#translation)

## 用語

### スタイルの宣言

"スタイルの宣言"とはセレクタ（もしくは複数のセレクタ）とそれに伴う１つ以上のプロパティのことである。 以下、例。

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### セレクタ

スタイルの宣言において、"セレクタ"はプロパティによってどのDOMにおける要素をスタイリングするかを決定するものである。セレクタはHTML要素のclass,id,もしくはその他のattributeのどれかにあたるものである。以下はセレクタの例である。

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### プロパティ

そして、プロパティは要素に対してスタイルを実際に定義するものである。プロパティはキーと値のセットであり、スタイルの宣言は１つ以上のプロパティの宣言を含むことができる。プロパティの定義は以下のようである。


```css
/* ここにセレクタを記述する */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### フォーマット

* インデントは２スペース
* キャメルケースではなくダッシュを使うことを推奨
  - もしBEMを使っているのであればアンダースコアとパスカルケースは使用可能(下記の[OOCSS and BEM](#oocss-and-bem)をみてください)
* IDセレクタは使わない
* 複数セレクタのスタイルルールを宣言する場合は１行に１つのセレクタを記述する
* 中括弧の開始、つまり '{'の前にスペースを1つ入れる
* プロパティにおいて、`:`の前でなく後ろにスペースを１つ入れる
* 中括弧の終了、つまり `}`の前に改行を入れる
* スタイルの宣言の間には改行を入れること

**悪い例**

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

**良い例**

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

### コメント

* コメントを記述する際は, ブロックコメント(`/* */`)ではなくラインコメント(`//`)を使う
* コメントはなるべく行末コメントを避け、コメント用に１行使う
* それ自身がドキュメントとなるように詳細にコメントを書く
  - z-indexの使用
  - 互換性やブラウザ対応

### OOCSS と BEM

OOCSSとBEMの組み合わせを推奨。理由は以下の通り:

  * CSSとHTMLの間に明快で厳格な関係を生む
  * 再利用しやすくなり、コンポーネントを組み立てやすくなる
  * ネストの利用を減らし、詳細度を下げる
  * 拡張性の高いスタイルシートを作り上げる

**OOCSS**, もしくは “オブジェクト指向CSS”とは、スタイルシートをオブジェクトの集合として考えやすくするためにCSSを書く方法の一つである。ここでいうオブジェクトの集合の、 “オブジェクト”とはウェブサイトとは独立した再利用しやすいスニペットをさす。

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, もしくは“Block-Element-Modifier”, とはHTMLとCSSの命名規則である。Yandexのコードの拡張性についての思想から発展し、OOCSSを実装するためのガイドラインとして存在している。

  * CSS Trick's [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts' [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

BEMの変形であるパスカルケースを用いた “blocks”は、コンポーネント(Reactなど)を用いた時に特にうまく機能すると考えている。アンダースコアやダッシュはモディファーや子要素に使われている。

**例**

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

  * `.ListingCard`は “block”であり、高階層のコンポーネントを表している
  * `.ListingCard__title` は“element”であり、`.ListingCard`をblockとして構成するための構成要素である子孫要素として表される
  * `.ListingCard--featured`は “modifier”であり、`.ListingCard`の異なる状態やブロックのバリエーションの一つとして表される

### IDセレクタ

CSSではIDによってセレクタとして要素を決定することができるが、それはアンチパターンとして考えられるべきでもある。IDセレクタはスタイルの宣言に不必要に高い[詳細度](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)をもたらし、再利用ができない。

この詳細度の扱いについては [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)を読むと良い。

### JavaScript フック

同じクラスをCSSとJavaScriptの両方でバインディング（JSのイベントをつけつつスタイリングを行うなど）をするのは避けること。この２つを混同することは少なくとも開発者が変更を行うCSSとJavaScriptの両方を理解しなければならないことになり時間の無駄であるし、最悪の場合は機能が壊れることを恐れて変更をすることを躊躇してしまう。
  
`.js-`という接頭辞を持つJavaScriptバインド専用のクラスを作ることを推奨する。

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### ボーダーBorder

ボーダーのないスタイルには`none`の代わりに0を使うこと。

**悪い例**

```css
.foo {
  border: none;
}
```

**良い例**

```css
.foo {
  border: 0;
}
```

## Sass

### シンタックス

* scssシンタックスを使い、元のsassシンタックスは使わない
* 通常のCSS, `@include`記法の宣言などの順序（下記参照）

### プロパティの宣言順序

1. プロパティの宣言

    `@include`やネストセレクタなどではない通常のプロパティを全て並べる

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include`記法の記述

    `@include`のまとまりを作るとセレクタ全体を読むのが楽になる

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. セレクタのネスト

    セレクタのネストは,_仮に必要なのであれば_, 中括弧の最後に記述しその後ろには何も書かない。ネストされたスタイルの宣言の前には１行空ける。また、上記の複数セレクタと同様に複数セレクタを記述する際は上記のガイドラインにしたがって１行に１セレクタの記述とする。

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

### 変数

変数の名前にはキャメルケースを使用する。BEMと併用するため、アンダースコアとハイフンはBEMの仕様に合わせて使用する。

~~変数の名前にはキャメルケースやスネークケースではなくダッシュつなぎを使用する。接頭辞として同じファイル内でのみ使われる変数に関しては例外として使用を認める。(例. `$_my-variable`)~~

### ミックスイン

ミックスインはDRY(Don't Repeat Yourselfの略)にし明快にするため、もしくは良い名前がつけられた関数のように複雑さを抽象化するために使われるべきだ。このためにミックスインを使うのは何ら問題ないが、もしファイル通信を圧縮していないのであれば（例. gzipなど）,　このことは余計なコードの重複をもたらすので注意しなければならない。


### Extend記法

`@include` `@extend` 等は一番上に記述する。

~~`@extend` 記法は直感的ではなく、危険な振る舞いを引き起こす可能性があるため、特にネストさせている場合などは使うべきではない。たとえ一番上の階層で仮置きとしてのセレクタを拡張するのだとしても、もしセレクタの順序を後々変更してしまった場合などに問題を引き起こす。（例えば異なるファイルにその記述があり、ファイルのロード順序がずれた場合など）
gzipをかければ`@extend`を使うことによって得られる合理的な出力結果のメリットの大抵はカバーできるし、ミックスインを使えばDRYな素晴らしいコードを生み出すことができる。~~

### セレクタのネスト

**３階層以上ネストさせない**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

もしセレクタの階層がこれほど深くなった場合、あなたのCSSは以下のようになっていると考えられる:

* HTMLとの結びつきが強くなりすぎている、もしくは
* セレクタの詳細度が高すぎる、もしくは
* 再利用できない

もう一度： **決してIDセレクタはネストさせてはいけない!**

もしIDセレクタを最初におきたい場合（本来やるべきではないが）、決してネストさせてはいけまない。もしあなた自身がこのようなことをしていると気づいた場合は、もう一度マークアップを見直すかなぜそのような強い詳細度にしなければならなかったのかを確認する必要がある。もしHTMLとCSSを正しいフォーマットで書いていればこのようなことをする必要は**絶対に**ない。

## 翻訳

  このスタイルガイドでは以下の言語でも読むことができます:
  - ![us](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/United-States.png) **English**: [airbnb/css](https://github.com/airbnb/css)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
