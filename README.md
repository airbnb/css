# Airbnb CSS / Sass Styleguide

*Một cách tiếp cận hợp lý nhất với CSS và SASS*

## Mục lục

  1. [Thuật ngữ](#terminology)
    - [Khai báo](#khai-báo)
    - [Selectors](#selectors)
    - [Thuộc tính](#thuộc-tính)
  1. [CSS](#css)
    - [Quy cách](#quy-cách)
    - [Chú thích](#chú-thích)
    - [OOCSS và BEM](#oocss-và-bem)
    - [ID Selectors](#id-selectors)
    - [JavaScript hooks](#javascript-hooks)
    - [Đường viền](#đường-viền)
  1. [Sass](#sass)
    - [Cú pháp](#cú-pháp)
    - [Thứ tự](##sắp-xếp-các-khai-báo-thuộc-tính)
    - [Biến](#biến)
    - [Mixins](#mixins)
    - [Mở rộng directive](#extend-directive)
    - [Selectors lồng nhau](##selectors-lồng-nhau)
  1. [Translation](#translation)

## Thuật ngữ

### Khai báo

Một "khai báo" là tên gọi của một selector (hoặc một nhóm các selectors) với một nhóm các thuộc tính. Dưới đây là ví dụ:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors

Trong một khai báo, "selectors" là phần sẽ xác định xem phần tử nào trong DOM sẽ được style bởi các thuộc tính xác định. Selectors có thể tương ứng với các phần tử HTML, cũng như class hay ID của phần tử, hoặc bất kì thuộc tính nào của nó. Dưới đây là ví dụ về selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Thuộc tính

Thuộc tính là một cặp khóa-giá trị, và một khai báo có thể chứa một hoặc nhiều khai báo của thuộc tính. Cách khai báo của thuộc tính như sau:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### Quy cách

* Sử dụng soft tabs (2 dấu cách) cho khoảng cách thụt vào (indentation)
* Nên sử dụng dấu gạch ngang trong camelCasing của tên class.
  - Dấu gạch dưới và PascalCasing sẽ không sao nếu bạn sử dụng BEM (xem [OOCSS and BEM](#oocss-and-bem) dưới đây).
* Không sử dụng ID Selectors.
* Khi sử dụng nhiều selector trong một khai báo, đặt mỗi selector trên một dòng kẻ.
* Trước dấu ngoặc nhọn `{` phải có một dấu cách trong khai báo.
* Trong thuộc tính, đặt một dấu cách đứng sau dấu hai chấm `:` .
* Đặt dấu đóng ngoặc nhọn `}` của một khai báo trên một dòng kẻ mới.
* Đặt một dòng kẻ trống giữa các khai báo.

**Không tốt**

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

**Tốt**

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

### Chú thích

* Nên dùng hai gạch (`//`) để đặt chú thích.
* Nên đặt chú thích trên một dòng kẻ riêng, không đặt ở cuối dòng kẻ.
* Viết chú thích chi tiết cho những dòng code mà không thể hiện được ý nghĩa rõ ràng khi đọc, ví dụ:
  - Sử dụng z-index
  - Khả năng tương thích và trình duyệt.

### OOCSS và BEM

Chúng tôi khuyến khích một số sự kết hợp giữa OOCSS và BEM cho những lý do sau:

  * Nó giúp tạo ra mối quan hệ chặt chẽ rõ ràng giữa CSS và HTML
  * Nó giúp tạo ra những thành phần có thể tái sử dụng.
  * Nó cho phép ít lồng nhau (nested) và giảm sự riêng biệt 
  * Nó giúp xây dựng stylesheets có khả năng mở rộng

**OOCSS**, hay "CSS hướng đối tượng", là một phương pháp để viết code CSS mà khuyến khích bạn định hình stylesheets như một sự tập hợp của nhiều "đối tượng" (object): có thể tái sử dụng, có thể lặp lại độc lập xuyên suốt toàn bộ một trang web.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Giới thiệu về OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, hay "Block-Element-Modifier", là một quy ước đặt tên cho classes trong HTML và CSS. Ban đầu nó được phát triển bởi Yandex với codebases lớn, có khả năng mở rộng, và có thể coi như một tập hợp của các hướng dẫn cho việc thực hiện OOCSS.

  * CSS Trick's [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts' [Giới thiệt về BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

Chúng tôi khuyến nghị sử dụng một biến thể của BEM với PascalCased "blocks", mà làm việc riêng biệt khá hiệu quả với các thành phần (components) (e.g. React). Dấu gạch dưới và gạch ngang vẫn được sử dụng cho thành phần modifiers và thành phần con.

**Ví dụ**

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

  * `.ListingCard` là một "block" và đại diện cho thành phần cao hơn
  * `.ListingCard__title` là một "phần tử" and biểu diễn như là một phần tử con của `.ListingCard` để tạo thành "block".
  * `.ListingCard--featured` là một "modifier" và đại diện cho các trạng thái khác nhau hay các biến thể của `.ListingCard` block.

### ID Selectors 

Trong khi có thể chọn các phần tử theo ID trong CSS, nó vẫn không nên được sử dụng. ID selectors giới thiệu một sự riêng biệt [sự riêng biệt](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) không cần thiết cho các khai báo của bạn và không thể tái sử dụng lại được.

Để biết thêm về chủ đề này, đọc [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/) on dealing with specificity.

### JavaScript hooks

Tránh việc binding cùng một class trong CSS và JavaScript. Việc làm đó có thể gây lãng phí thời gian ở mức nhẹ nhất khi lập trình viên phải kiểm tra chéo mỗi class khi thay đổi. Và trong trường hợp xấu nhất, lập trình viên có thể sẽ phải đối mặt với việc phá vỡ sự hoạt động của function.

Chúng tôi khuyến nghị tạo ra các class riêng cho JavaScript để bind, tiền tố bắt đầu với `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### Đường viền

Sử dụng `0` thay vì `none` để xác định rằng đối tượng này không có đường viền.

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

## Sass

### Cú pháp

* Sử dụng `.scss` cú pháp, không bao giờ nên sử dụng cú pháp gốc của `.sass`
* Sắp xếp CSS và `@include` theo một logic (xem ở dưới)

### Sắp xếp các khai báo thuộc tính

1. Khai báo thuộc tính

    Khai báo toàn bộ thuộc tính cơ bản trước, những gì không phải là `@include` hay khai báo lồng (nested) selector.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. Khai báo `@include`

    Nhóm `@include` ở cuối cùng để dễ dàng đọc toàn bộ selector.

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Selectors lồng nhau

    Selectors lồng nhau, _nếu cần thiết_ , đặt ở cuối cùng, và không có gì viết sau nó nữa. Thêm khoảng trắng giữa khai báo và selector lồng nhau, cũng như giữa các phần tử con. Áp dụng toàn bộ hướng dẫn ở trên cho selector lồng nhau.

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

### Biến

Nên dùng gạch ngang giữa tên biến (e.g. `$my-variable`) thay vì camelCased or snake_cased. Nó cũng được phép dùng để đặt tiền tố cho tên biến nếu có ý định sử dụng trong cùng một file với dấu gạch dưới (e.g. `$_my-variable`).

### Mixins

Mixins nên được sử dụng để không lặp lại các đoạn code giống nhau với phương châm (DRY - Don't-Repeat-Yourself) trong code của bạn, thêm sự rõ ràng, hoặc tách sự phức tạp - theo cách tương tự mà function được đặt tên. Mixins cho phép không có đối số có thể hữu ích cho việc này, nhưng chú ý rằng nếu bạn không nén lại (e.g. gzip), nó có thể đóng góp vào việc trùng lặp code không cần thiết.

### Extend directive

Nên tránh sử dụng `@extend` vì nó có một hành vi nguy hiểm tiềm tàng, đặc biệt khi sử dụng các selectors lồng nhau. Thậm chí mở rộng top-level placeholder selectors có thể gây ra vấn đề nếu thứ tự của selector kết thúc thay đổi sau đó (e.g. nếu họ đang ở một tệp tin khác, và thứ tự của các tệp tin được tải thay đổi.). Bạn có thể không lặp lại đoạn code của mình với mixins.

### Selectors lồng nhau

**ĐỪNG selectors lồng hơn 3 cấp độ!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

Khi selectors trở nên như vậy, bạn có thể đã viết CSS theo:

* Liên kết chặt với HTML (dễ đổ vỡ) *hoặc*
* Quá cụ thể (powerful) *—hoặc—*
* Không tái sử dụng


Lặp lại: **không bao giờ được lồng ID selectors!**

Nếu bạn phải sử dụng ID selector ngay từ đầu (và bạn thực sự không nên làm thế), nó không bảo giờ nên được lồng nhau. Nếu bạn thấy mình làm điều này, bạn cần phải xem xét lại code HTML, hoặc tìm hiểu tại sao lại cần cụ thể đến như vậy. Nếu bạn đang viết HTML và CSS tốt, bạn **không bao giờ nên** cần phải làm điều này.

## Dịch

  Styleguide này cũng có sẵn trong các ngôn ngữ khác:

  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [ArvinH/css-style-guide](https://github.com/ArvinH/css-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [Zhangjd/css-style-guide](https://github.com/Zhangjd/css-style-guide)
  - ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [nao215/css-style-guide](https://github.com/nao215/css-style-guide)
  - ![ko](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [CodeMakeBros/css-style-guide](https://github.com/CodeMakeBros/css-style-guide)
  - ![PT-BR](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese**: [felipevolpatto/css-style-guide](https://github.com/felipevolpatto/css-style-guide)  
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [Nekorsis/css-style-guide](https://github.com/Nekorsis/css-style-guide)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [ismamz/guia-de-estilo-css](https://github.com/ismamz/guia-de-estilo-css)
