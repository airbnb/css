# CSS
## フォルダ構成
```
app/javascript/styles/
├── base // グローバルで管理するCSS
│   ├── _mediaQuery.scss
│   ├── _reset.scss
│   ├── _scafoldings.scss
│   └── /fonts
├── /lib // ライブラリ
├── /layouts
│   ├── _grid.scss // グリッドシステム
│   ├── _infinitScroll.scss
│   └── _layouts.scss // wrapper, container
├── /projects // Public、Dashboard、Page
│   └── webapp // 各プロジェクトごとにブロックとエレメントディレクトリを作成
│   │    └── components
│   │       ├── block
│   │       └── element
│   └── dashboard
│   │    └── components
│   │       ├── block
│   │       └── element
│   └── pages // LPなどの一枚のページ、他に使い回すことのないものをここに追加
├── _variables.scss
└── style.scss // エントリーポイント
```

## CSS記法
基本的にBEMをベースとした、ブロックとエレメントに分けた書き方とする。
ブロックとエレメントは `__` 、modifierは `--` のセパレータを利用する。
```sass
.block__element
.block__element--modifier
```
また、エレメントはルートのブロックから一つのみとする。同じようにネストも基本的に禁止する。
NG
```sass
.block__element__element

.block__element {
  .block__element
}
```
ブロック内、エレメント内の単語のつなぎ方はキャメルケースで書く。
ex.
```sass
.b-stichkyHeader__navItem
```
javascriptでDOM操作をするセレクタは `js-` の接頭語をつける。
また、状態を表すクラスとして `is-` , `has-` を作成しても良い。
ex.
```sass
.js-accordion

.block__element {
  .is-open
}
```
BEMの概念としてエレメントはすべてルートのブロックにぶら下がる形になる。
なので以下の様な別のブロックに他のブロックをルートとするものは入れることは出来ない。
NG
```html
<div class="b-testBlock01">
  <div class="b-testBlock02__element">
    TEST
  </div>
</div>
```
各項目の間は一行開ける。
NG
```sass
.b-block {
  &__element {

  }
  &__element {
    
  }
}
```
OK
```sass
.b-block {
  &__element {

  }

  &__element {
    
  }
}
```

## 接頭語
- block: `b-`
- page: `p-`
をつける。

## components
各projects以下にコンポーネントを作成する。

### block
- BEM の B にあたるもの。各scssファイルは ` _block.scss` とする。
- ブロックのルートは `b-block` のように `b-` の接頭語をつける。
- ブロックのエレメントは `b-block__element` と書く。
  - sass内では `&__element` と書く。

ex.
_workImage.scss
```sass
.b-workImage {
  display: flex;

  &__link {
    display: flex;
    align-items: center;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  &__imageUrl {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    margin-right: 15px;
    object-fit: contain;
  }

  &__title {
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__certificateText {
    color: $brand;
  }
}
```

### element
エレメントはsassのmixinの集まりとする。３つ以上同じエレメントが必要な場合、ブロックの中のエレメントをmixinに書き出す。
ex.
```sass
@mixin baseBtn {
  display: block;
  text-align: center;
  color: $color;
  background-color: $bg-color;
  border: solid 1px $bd-color;
  border-radius: 4px;
  cursor: pointer;
}
```
mixinは汎用性を考慮して作成する。すでに同じ様なものがないか必ず確認をする。
迷った場合は、mixinにせずにブロック内のエレメントにする。

## ファイル名
ブロックはそのブロックのみで一つのファイルとする。別のブロックを入れる場合、別のファイルに切り出す。
またその場合、b- から始めず、アンダーバーから始めることとする。
ex). _flashMessage.scss

OK
```sass
.b-flashMessage {
  &__element {

  }
}
```

NG
```sass
.b-flashMessage {
  &__element {
    
  }
}

.b-flashMessageTop {
  &__element {
    
  }
}
↑これはmodifierとかで表現するのではなく、コンテキストが変われば別のブロックとなるという認識
```

## 順番
`@include` , `@extend` は最初に書く。

## 命名規則
よく使うものは統一しておきたい。

- 見出し系: ttl
- ボタン: btn
- テキスト: txt
- リスト: list
- 画像: img
- アイコン: icon
- サブテキスト: subTxt
- 項目: item
- サムネイル: thum
など。

ブロック名は影響範囲を絞った名前をつけるよう心がける。コンテキストをつけると良い。
`b-banner` はグローバルに使い回すものであれば問題ないが、使われる場所が限定的であれば、 `b-dashboardSideBanner` のようにつける。

## マルチクラス
マルチクラスは禁止する。 `js-` や `is-` などの状態を表すもののみOK。
modifierもシングルクラスにすること。

## extend
コンパイルでクラスを出さない形にする。また影響範囲を明示的にするためにグローバルなものはmixin以外作成しない。
```sass
.b-testBanner {
  %bannerBase {
    diplay: flex;
  }

  &--top {
    @extend %bannerBase;
    justify-content: space-between;
  }

  &--side {
    @extend %bannerBase;
    justify-content: center;
  }
}
```