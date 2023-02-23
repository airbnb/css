# JS Style Guide <!-- omit in toc -->

[go/js-style-guide](http://go/js-style-guide)

- [1\. Types](#1-types)
    - [**1.1. Primitives**: When you access a primitive type you work directly on its value.](#11-primitives-when-you-access-a-primitive-type-you-work-directly-on-its-value)
    - [**1.2. Complex**: When you access a complex type you work on a reference to its value.](#12-complex-when-you-access-a-complex-type-you-work-on-a-reference-to-its-value)
- [2\. References](#2-references)
    - [2.1. Use `const` for all of your references; avoid using `var`.](#21-useconstfor-all-of-your-references-avoid-usingvar)
    - [2.2. If you must reassign references, use `let` instead of `var`.](#22-if-you-must-reassign-references-useletinstead-ofvar)
    - [2.3. Note that both `let` and `const` are block-scoped.](#23-note-that-bothletandconstare-block-scoped)
- [3\. Objects](#3-objects)
    - [3.1. Use the literal syntax for object creation.](#31-use-the-literal-syntax-for-object-creation)
    - [3.2. Use computed property names when creating objects with dynamic property names.](#32-use-computed-property-names-when-creating-objects-with-dynamic-property-names)
    - [3.3. Use object method shorthand.](#33-use-object-method-shorthand)
    - [3.4. Use property value shorthand.](#34-use-property-value-shorthand)
    - [3.6. Group your shorthand properties at the beginning of your object declaration.](#36-group-your-shorthand-properties-at-the-beginning-of-your-object-declaration)
    - [3.6. Only quote properties that are invalid identifiers.](#36only-quote-properties-that-are-invalid-identifiers)
    - [3.7. Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.](#37-do-not-callobjectprototypemethods-directly-such-ashasownpropertypropertyisenumerable-andisprototypeof)
    - [3.8. Prefer the object spread operator over `Object.assign` to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.](#38-prefer-the-object-spread-operator-overobjectassignto-shallow-copy-objects-use-the-object-rest-operator-to-get-a-new-object-with-certain-properties-omitted)
- [4\. Arrays](#4-arrays)
    - [4.1. Use the literal syntax for array creation.](#41-use-the-literal-syntax-for-array-creation)
    - [4.2. Use Array#push instead of direct assignment to add items to an array.](#42-usearraypushinstead-of-direct-assignment-to-add-items-to-an-array)
    - [4.3. Use array spreads `...` to copy arrays.](#43-use-array-spreadsto-copy-arrays)
    - [4.4 To convert an iterable object to an array, use spreads `...` instead of `Array.from`.](#44-to-convert-an-iterable-object-to-an-array-use-spreadsinstead-ofarrayfrom)
    - [4.5. Use `Array.from` for converting an array-like object to an array.](#45-usearrayfromfor-converting-an-array-like-object-to-an-array)
    - [4.6. Use `Array.from` instead of spread `...` for mapping over iterables, because it avoids creating an intermediate array.](#46-usearrayfrominstead-of-spreadfor-mapping-over-iterables-because-it-avoids-creating-an-intermediate-array)
    - [4.7. Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following  8.2.](#47-use-return-statements-in-array-method-callbacks-its-ok-to-omit-the-return-if-the-function-body-consists-of-a-single-statement-returning-an-expression-without-side-effects-following-82)
    - [4.8. Use line breaks after open and before close array brackets if an array has multiple lines](#48-use-line-breaks-after-open-and-before-close-array-brackets-if-an-array-has-multiple-lines)
- [5\. Destructuring](#5-destructuring)
    - [5.1. Use object destructuring when accessing and using multiple properties of an object.](#51-use-object-destructuring-when-accessing-and-using-multiple-properties-of-an-object)
    - [5.2. Use array destructuring.](#52-use-array-destructuring)
    - [5.3. Use object destructuring for multiple return values, not array destructuring.](#53use-object-destructuring-for-multiple-return-values-not-array-destructuring)
- [6\. Strings](#6-strings)
    - [6.1. Use single quotes `''` for strings.](#61-use-single-quotesfor-strings)
    - [6.2. Long strings should not be written across multiple lines using string concatenation.](#62-long-strings-should-not-be-written-across-multiple-lines-using-string-concatenation)
    - [6.3. When programmatically building up strings, use template strings instead of concatenation.](#63-when-programmatically-building-up-strings-use-template-strings-instead-of-concatenation)
    - [6.4. ❗Never use `eval()` on a string, it opens too many vulnerabilities.](#64-never-useevalon-a-string-it-opens-too-many-vulnerabilities)
    - [6.5. Do not unnecessarily escape characters in strings.](#65-do-not-unnecessarily-escape-characters-in-strings)
- [7\. Functions](#7-functions)
    - [7.1. Use named function expressions instead of function declarations.](#71-use-named-function-expressions-instead-of-function-declarations)
    - [7.2. Wrap immediately invoked function expressions in parentheses.](#72-wrap-immediately-invoked-function-expressions-in-parentheses)
    - [7.3. Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.](#73-never-declare-a-function-in-a-non-function-block-ifwhile-etc-assign-the-function-to-a-variable-instead-browsers-will-allow-you-to-do-it-but-they-all-interpret-it-differently-which-is-bad-news-bears)
    - [**7.4. Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement.](#74-noteecma-262-defines-ablockas-a-list-of-statements-a-function-declaration-is-not-a-statement)
    - [7.5. Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.](#75-never-name-a-parameterarguments-this-will-take-precedence-over-theargumentsobject-that-is-given-to-every-function-scope)
    - [7.6. Never use `arguments`, opt to use rest syntax `...` instead.](#76-never-usearguments-opt-to-use-rest-syntaxinstead)
    - [7.7. Use default parameter syntax rather than mutating function arguments.](#77-use-default-parameter-syntax-rather-than-mutating-function-arguments)
    - [7.8. Avoid side effects with default parameters.](#78-avoid-side-effects-with-default-parameters)
    - [7.9. Always put default parameters last.](#79-always-put-default-parameters-last)
    - [7.10. If parameters number is greater than 3, put them into `options` parameter](#710-if-parameters-number-is-greater-than-3-put-them-into-options-parameter)
    - [7.11. Never use the Function constructor to create a new function.](#711-never-use-the-function-constructor-to-create-a-new-function)
    - [7.12 Spacing in a function signature.](#712-spacing-in-a-function-signature)
    - [7.13 Never mutate parameters.](#713-never-mutate-parameters)
    - [7.14 Never reassign parameters.](#714-never-reassign-parameters)
    - [7.15. Prefer the use of the spread operator `...` to call variadic functions.](#715-prefer-the-use-of-the-spread-operatorto-call-variadic-functions)
    - [7.16. Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item.](#716-functions-with-multiline-signatures-or-invocations-should-be-indented-just-like-every-other-multiline-list-in-this-guide-with-each-item-on-a-line-by-itself-with-a-trailing-comma-on-the-last-item)
- [8\. Arrow Functions](#8-arrow-functions)
    - [8.1. When you must use an anonymous function (as when passing an inline callback), use arrow function notation.](#81-when-you-must-use-an-anonymous-function-as-when-passing-an-inline-callback-use-arrow-function-notation)
    - [8.2. If the function body consists of a single statement returning an expression without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement.](#82-if-the-function-body-consists-of-a-single-statement-returning-anexpressionwithout-side-effects-omit-the-braces-and-use-the-implicit-return-otherwise-keep-the-braces-and-use-areturnstatement)
    - [8.3. In case the expression spans over multiple lines, wrap it in parentheses for better readability.](#83-in-case-the-expression-spans-over-multiple-lines-wrap-it-in-parentheses-for-better-readability)
    - [8.4. If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include parentheses around arguments for clarity and consistency.](#84-if-your-function-takes-a-single-argument-and-doesnt-use-braces-omit-the-parentheses-otherwise-always-include-parentheses-around-arguments-for-clarity-and-consistency)
    - [8.5. Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`).](#85-avoid-confusing-arrow-function-syntax--with-comparison-operators-)
    - [8.6. Enforce the location of arrow function bodies with implicit returns.](#86-enforce-the-location-of-arrow-function-bodies-with-implicit-returns)
- [9\. Classes & Constructors](#9-classes--constructors)
    - [9.1. Always use `class`. Avoid manipulating `prototype` directly.](#91-always-useclass-avoid-manipulatingprototypedirectly)
    - [9.2. Use `extends` for inheritance.](#92-useextendsfor-inheritance)
    - [9.3. Methods can return `this` to help with method chaining.](#93-methods-can-returnthisto-help-with-method-chaining)
    - [9.4. It’s okay to write a custom `toString()` method, just make sure it works successfully and causes no side effects.](#94-its-okay-to-write-a-customtostringmethod-just-make-sure-it-works-successfully-and-causes-no-side-effects)
    - [9.5. Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary.](#95-classes-have-a-default-constructor-if-one-is-not-specified-an-empty-constructor-function-or-one-that-just-delegates-to-a-parent-class-is-unnecessary)
    - [9.6. Avoid duplicate class members.](#96-avoid-duplicate-class-members)
- [10\. Modules](#10-modules)
    - [10.1. Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.](#101-always-use-modules-importexport-over-a-non-standard-module-system-you-can-always-transpile-to-your-preferred-module-system)
    - [10.2. Do not use wildcard imports.](#102-do-not-use-wildcard-imports)
    - [10.3. And do not export directly from an import.](#103-and-do-not-export-directly-from-an-import)
    - [10.4. Only import from a path in one place.](#104-only-import-from-a-path-in-one-place)
    - [10.5. Do not export mutable bindings.](#105-do-not-export-mutable-bindings)
    - [10.6. Prefer named export over default export.](#106-prefer-named-export-over-default-export)
    - [10.7. Put all `import`s above non-import statements.](#107-put-allimports-above-non-import-statements)
    - [10.9. Multiline imports should be indented just like multiline array and object literals.](#109-multiline-imports-should-be-indented-just-like-multiline-array-and-object-literals)
    - [10.9. Disallow Webpack loader syntax in module import statements.](#109-disallow-webpack-loader-syntax-in-module-import-statements)
- [11\. Iterators and Generators](#11-iterators-and-generators)
    - [11.1. Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like `for-in` or `for-of`.](#111-dont-use-iterators-prefer-javascripts-higher-order-functions-instead-of-loops-likefor-inorfor-of)
    - [11.2. Don’t use generators for now in browsers.](#112-dont-use-generators-for-now-in-browsers)
    - [11.3. If you must use generators, make sure their function signature is spaced properly.](#113-if-you-must-use-generators-make-sure-their-function-signature-is-spaced-properly)
- [12\. Properties](#12-properties)
    - [12.1. Use dot notation when accessing properties.](#121-use-dot-notation-when-accessing-properties)
    - [12.3. Use bracket notation `[]` when accessing properties with a variable.](#123-use-bracket-notationwhen-accessing-properties-with-a-variable)
    - [12.3. Use exponentiation operator `**` when calculating exponentiations.](#123-use-exponentiation-operatorwhen-calculating-exponentiations)
    - [13\. Variables](#13-variables)
    - [13.1. Always use `const` or `let` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.](#131-always-useconstorletto-declare-variables-not-doing-so-will-result-in-global-variables-we-want-to-avoid-polluting-the-global-namespace-captain-planet-warned-us-of-that)
    - [13.3. Use one `const` or `let` declaration per variable or assignment.](#133-use-oneconstorletdeclaration-per-variable-or-assignment)
    - [13.3. Group all your `const`s and then group all your `let`s.](#133-group-all-yourconsts-and-then-group-all-yourlets)
    - [13.4 Assign variables where you need them, but place them in a reasonable place.](#134assign-variables-where-you-need-them-but-place-them-in-a-reasonable-place)
    - [13.6. Don’t chain variable assignments.](#136-dont-chain-variable-assignments)
    - [13.6. Avoid using unary increments and decrements (`++`, `--`).](#136avoid-using-unary-increments-and-decrements---)
    - [13.7. Avoid linebreaks before or after `=` in an assignment. If your assignment violates `max-len`, surround the value in parens.](#137-avoid-linebreaks-before-or-afterin-an-assignment-if-your-assignment-violatesmax-len-surround-the-value-in-parens)
    - [13.9. Disallow unused variables.](#139-disallow-unused-variables)
- [14\. Hoisting](#14-hoisting)
    - [14.1. `var` declarations get hoisted to the top of their closest enclosing function scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called Temporal Dead Zones (TDZ). It’s important to know why [typeof is no longer safe](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).](#141vardeclarations-get-hoisted-to-the-top-of-their-closest-enclosing-function-scope-their-assignment-does-notconstandletdeclarations-are-blessed-with-a-new-concept-calledtemporal-dead-zones-tdz-its-important-to-know-whytypeof-is-no-longer-safe)
    - [14.2. Anonymous function expressions hoist their variable name, but not the function assignment.](#142-anonymous-function-expressions-hoist-their-variable-name-but-not-the-function-assignment)
    - [14.3. Named function expressions hoist the variable name, not the function name or the function body.](#143-named-function-expressions-hoist-the-variable-name-not-the-function-name-or-the-function-body)
    - [14.4. Function declarations hoist their name and the function body.](#144-function-declarations-hoist-their-name-and-the-function-body)
- [15\. Comparison Operators & Equality](#15-comparison-operators--equality)
    - [15.1. Use `===` and `!==` over `==` and `!=`.](#151-useandoverand)
    - [15.2. Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:](#152-conditional-statements-such-as-theifstatement-evaluate-their-expression-using-coercion-with-thetobooleanabstract-method-and-always-follow-these-simple-rules)
    - [15.3. Use shortcuts for booleans, but explicit comparisons for strings and numbers.](#153use-shortcuts-for-booleans-but-explicit-comparisons-for-strings-and-numbers)
    - [15.4. For more information see Truth Equality and JavaScript by Angus Croll.](#154-for-more-information-seetruth-equality-and-javascriptby-angus-croll)
    - [15.6. Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`).](#156-use-braces-to-create-blocks-incaseanddefaultclauses-that-contain-lexical-declarations-egletconstfunction-andclass)
    - [15.6. Ternaries should not be nested. Enforce newlines between operands of ternary expressions.](#156-ternaries-should-not-be-nested-enforce-newlines-between-operands-of-ternary-expressions)
    - [15.7. Avoid unneeded ternary statements.](#157-avoid-unneeded-ternary-statements)
    - [15.8 When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators (`+`, `-`, `*`, & `/`) since their precedence is broadly understood.](#158when-mixing-operators-enclose-them-in-parentheses-the-only-exception-is-the-standard-arithmetic-operators----since-their-precedence-is-broadly-understood)
- [16\. Blocks](#16-blocks)
    - [16.1. Enforce consistent brace style for all control statements.](#161-enforce-consistent-brace-style-for-all-control-statements)
    - [16.2. If you’re using multi-line blocks with `if` and `else`, put `else` on the same line as your `if` block’s closing brace.](#162-if-youre-using-multi-line-blocks-withifandelse-putelseon-the-same-line-as-yourifblocks-closing-brace)
    - [16.4. If an `if` block always executes a `return` statement, the subsequent `else` block is unnecessary. A `return` in an `else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks.](#164-if-anifblock-always-executes-areturnstatement-the-subsequentelseblock-is-unnecessary-areturnin-anelse-ifblock-following-anifblock-that-contains-areturncan-be-separated-into-multipleifblocks)
- [17\. Control Statements](#17-control-statements)
    - [17.1 In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line.](#171in-case-your-control-statement-ifwhileetc-gets-too-long-or-exceeds-the-maximum-line-length-each-grouped-condition-could-be-put-into-a-new-line-the-logical-operator-should-begin-the-line)
    - [17.2 Don’t use selection operators in place of control statements.](#172dont-use-selection-operators-in-place-of-control-statements)
- [18\. Comments](#18-comments)
    - [18.1 Use `/** ... */` for multi-line comments.](#181use--for-multi-line-comments)
    - [18.2. Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.](#182-usefor-single-line-comments-place-single-line-comments-on-a-newline-above-the-subject-of-the-comment-put-an-empty-line-before-the-comment-unless-its-on-the-first-line-of-a-block)
    - [18.3. Start all comments with a space to make it easier to read.](#183start-all-comments-with-a-space-to-make-it-easier-to-read)
    - [18.4. Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you’re pointing out a problem that needs to be revisited, or if you’re suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.](#184prefixing-your-comments-withfixmeortodohelps-other-developers-quickly-understand-if-youre-pointing-out-a-problem-that-needs-to-be-revisited-or-if-youre-suggesting-a-solution-to-the-problem-that-needs-to-be-implemented-these-are-different-than-regular-comments-because-they-are-actionable-the-actions-arefixme----need-to-figure-this-outortodo----need-to-implement)
    - [18.5. Use `// FIXME:` to annotate problems.](#185use-fixmeto-annotate-problems)
    - [18.6. Use `// TODO:` to annotate solutions to problems.](#186use-todoto-annotate-solutions-to-problems)
    - [19\. Whitespace](#19-whitespace)
    - [19.1. Use soft tabs (space character) set to 2 spaces.](#191use-soft-tabs-space-character-set-to-2-spaces)
    - [19.2. Place 1 space before the leading brace.](#192place-1-space-before-the-leading-brace)
    - [19.3. Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations.](#193place-1-space-before-the-opening-parenthesis-in-control-statements-ifwhileetc-place-no-space-between-the-argument-list-and-the-function-name-in-function-calls-and-declarations)
    - [19.4. Set off operators with spaces.](#194set-off-operators-with-spaces)
    - [19.5. End files with a single newline character.](#195end-files-with-a-single-newline-character)
    - [19.6. Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which emphasizes that the line is a method call, not a new statement.](#196use-indentation-when-making-long-method-chains-more-than-2-method-chains-use-a-leading-dot-which-emphasizes-that-the-line-is-a-method-call-not-a-new-statement)
    - [19.7. Leave a blank line after blocks and before the next statement.](#197leave-a-blank-line-after-blocks-and-before-the-next-statement)
    - [19.8. Do not pad your blocks with blank lines.](#198do-not-pad-your-blocks-with-blank-lines)
    - [19.9. Do not add spaces inside parentheses.](#199do-not-add-spaces-inside-parentheses)
    - [19.10. Do not add spaces inside brackets.](#1910do-not-add-spaces-inside-brackets)
    - [19.11. Add spaces inside curly braces.](#1911add-spaces-inside-curly-braces)
    - [19.12. Avoid having lines of code that are longer than 80 characters (including whitespace). Note: per above, long strings are exempt from this rule, and should not be broken up.](#1912avoid-having-lines-of-code-that-are-longer-than-80-characters-including-whitespace-note-perabove-long-strings-are-exempt-from-this-rule-and-should-not-be-broken-up)
    - [19.13. Avoid spaces before commas and require a space after commas.](#1913avoid-spaces-before-commas-and-require-a-space-after-commas)
    - [19.14. Enforce spacing inside of computed properties.](#1914enforce-spacing-inside-of-computed-properties)
    - [19.15. Avoid spaces between functions and their invocations.](#1915avoid-spaces-between-functions-and-their-invocations)
    - [19.16 Enforce spacing between keys and values in object literal properties.](#1916enforce-spacing-between-keys-and-values-in-object-literal-properties)
    - [19.17 Avoid trailing spaces at the end of lines.](#1917avoid-trailing-spaces-at-the-end-of-lines)
    - [19.18 Avoid multiple empty lines and only allow one newline at the end of files.](#1918avoid-multiple-empty-lines-and-only-allow-one-newline-at-the-end-of-files)
- [20\. Commas](#20-commas)
    - [20.1. Leading commas: **Nope.**](#201leading-commasnope)
    - [20.2. Additional trailing comma: **Yup.**](#202additional-trailing-commayup)
- [21\. Semicolons](#21-semicolons)
    - [21.1. **Yup.**](#211-yup)
- [22\. Type Casting & Coercion](#22-type-casting--coercion)
    - [22.1. Perform type coercion at the beginning of the statement.](#221perform-type-coercion-at-the-beginning-of-the-statement)
    - [22.2 Strings:](#222strings)
    - [22.3. Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings.](#223-numbers-usenumberfor-type-casting-andparseintalways-with-a-radix-for-parsing-strings)
    - [22.4. Bitwise operators: no](#224-bitwise-operators-no)
    - [22.5. If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for performance reasons, leave a comment explaining why and what you’re doing.](#225if-for-whatever-reason-you-are-doing-something-wild-andparseintis-your-bottleneck-and-need-to-use-bitshift-forperformance-reasons-leave-a-comment-explaining-why-and-what-youre-doing)
    - [22.6 Booleans:](#226booleans)
- [23\. Naming Conventions](#23-naming-conventions)
    - [23.1 Avoid single letter names. Be descriptive with your naming.](#231avoid-single-letter-names-be-descriptive-with-your-naming)
    - [23.2. Use camelCase when naming objects, functions, and instances. Function names are typically verbs or verb phrases.](#232-use-camelcase-when-naming-objects-functions-and-instances-function-names-are-typically-verbs-or-verb-phrases)
    - [23.3. Use PascalCase only when naming constructors or classes.](#233-use-pascalcase-only-when-naming-constructors-or-classes)
    - [23.4 Do not use trailing or leading underscores.](#234do-not-use-trailing-or-leading-underscores)
    - [23.5 Don’t save references to `this`. Use arrow functions or Function#bind.](#235dont-save-references-tothis-use-arrow-functions-orfunctionbind)
    - [23.6 A base filename should exactly match the name of its primary named or default export.](#236a-base-filename-should-exactly-match-the-name-of-its-primary-named-or-default-export)
    - [23.7 Use camelCase when you export a function. Your filename should be identical to your function’s name.](#237use-camelcase-when-you-export-a-function-your-filename-should-be-identical-to-your-functions-name)
    - [23.8 Use PascalCase when you export a constructor / class / singleton / function library / bare object.](#238use-pascalcase-when-you-export-a-constructor--class--singleton--function-library--bare-object)
    - [23.9 Acronyms and initialisms should always be all capitalized, or all lowercased.](#239acronyms-and-initialisms-should-always-be-all-capitalized-or-all-lowercased)
    - [23.10 You may optionally uppercase a constant only if it (1) is exported, (2) is a `const` (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.](#2310you-may-optionally-uppercase-a-constant-only-if-it-1-is-exported-2-is-aconstit-can-not-be-reassigned-and-3-the-programmer-can-trust-it-and-its-nested-properties-to-never-change)
    - [23.11 Don't shorten variables or functions names](#2311-dont-shorten-variables-or-functions-names)
- [24\. Accessors](#24-accessors)
    - [24.1 Accessor functions for properties are not required.](#241accessor-functions-for-properties-are-not-required)
    - [24.2 Do not use JavaScript getters/setters as they cause unexpected side effects and are harder to test, maintain, and reason about. Instead, if you do make accessor functions, use `getVal()` and `setVal('hello')`.](#242do-not-use-javascript-getterssetters-as-they-cause-unexpected-side-effects-and-are-harder-to-test-maintain-and-reason-about-instead-if-you-do-make-accessor-functions-usegetvalandsetvalhello)
    - [24.3 If the property/method is a `boolean`, use `isVal()` or `hasVal()`.](#243if-the-propertymethod-is-aboolean-useisvalorhasval)
    - [24.4 It’s okay to create `get()` and `set()` functions, but be consistent.](#244its-okay-to-creategetandsetfunctions-but-be-consistent)
- [25\. ECMAScript 5 Compatibility](#25-ecmascript-5-compatibility)
    - [25.1. Refer to Kangax’s ES5 [compatibility table](https://kangax.github.io/es5-compat-table/).](#251-refer-tokangaxs-es5compatibility-table)
- [26\. ECMAScript 6+ (ES 2015+) Styles](#26-ecmascript-6-es-2015-styles)
    - [26.1 This is a collection of links to the various ES6+ features.](#261this-is-a-collection-of-links-to-the-various-es6-features)
    - [26.2 Do not use TC39 proposals that have not reached stage 3.](#262do-not-usetc39-proposalsthat-have-not-reached-stage-3)
- [27\. Standard Library](#27-standard-library)
    - [27.1. Use `Number.isNaN` instead of global `isNaN`.](#271usenumberisnaninstead-of-globalisnan)
    - [27.2. Use `Number.isFinite` instead of global `isFinite`.](#272usenumberisfiniteinstead-of-globalisfinite)
- [28\. Testing](#28-testing)
    - [28.1. **Yup.**](#281yup)
    - [28.2. **No, but seriously**:](#282no-but-seriously)
- [Performance](#performance)
- [Resources](#resources)
    - [**Learning ES6+**](#learning-es6)
    - [**Read This**](#read-this)
    - [**Tools**](#tools)
    - [**Other Style Guides**](#other-style-guides)
    - [**Other Styles**](#other-styles)
    - [**Further Reading**](#further-reading)
    - [**Books**](#books)
    - [**Blogs**](#blogs)
    - [**Podcasts**](#podcasts)
**💡 note**: this guide assumes you are using [Babel](https://babeljs.io/), and requires that you use [babel-preset-airbnb](https://npmjs.com/babel-preset-airbnb) or the equivalent. It also assumes you are installing shims/polyfills in your app, with [airbnb-browser-shims](https://npmjs.com/airbnb-browser-shims) or the equivalent.

  

1\. Types
---------

#### **1.1. Primitives**: When you access a primitive type you work directly on its value.

*   *   `string`
    *   `number`
    *   `boolean`
    *   `null`
    *   `undefined`
    *   `symbol`

```javascript
const foo = 1;
let bar = foo;
bar = 9;
console.log(foo, bar); // => 1, 9
```

*   *   Symbols cannot be faithfully polyfilled, so they should not be used when targeting browsers/environments that don’t support them natively.

  

#### **1.2. Complex**: When you access a complex type you work on a reference to its value.

*   *   `object`
    *   `array`
    *   `function`

```javascript
const foo = [1, 2];
const bar = foo;
bar[0] = 9;
console.log(foo[0], bar[0]); // => 9, 9
```

  

2\. References
--------------

#### 2.1. Use `const` for all of your references; avoid using `var`.

eslint: [`prefer-const`](https://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign.html)

  

>❓Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.

  

```javascript
// ❌ bad
var a = 1;
var b = 2;

// ✅ good
const a = 1;
const b = 2;
```

  

#### 2.2. If you must reassign references, use `let` instead of `var`.

eslint: [`no-var`](https://eslint.org/docs/rules/no-var.html)

  

>❓Why? `let` is block-scoped rather than function-scoped like `var`.

  

```javascript
// ❌ bad
var count = 1;
if (true) {count += 1;}

// ✅ good, use the let.
let count = 1;
if (true) {count += 1;}
```

  

#### 2.3. Note that both `let` and `const` are block-scoped.

```javascript
// const and let only exist in the blocks they are defined in.
{ 
  let a = 1; 
  const b = 1; 
}

console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

  

3\. Objects
-----------

  

#### 3.1. Use the literal syntax for object creation.

eslint: [`no-new-object`](https://eslint.org/docs/rules/no-new-object.html)

  

```javascript
// ❌ bad
const item = new Object();

// ✅ good
const item = {};
```

  

#### 3.2. Use computed property names when creating objects with dynamic property names.

  

>❓Why? They allow you to define all the properties of an object in one place.

  

```bash
function getKey(k) {
 return `a key named ${k}`;
}

// ❌ bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// ✅ good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```

  

#### 3.3. Use object method shorthand.

eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

  

```javascript
// ❌ bad
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};

// ✅ good
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```

  

#### 3.4. Use property value shorthand.

eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

  

>❓Why? It is shorter to write and descriptive.

  

```javascript
const lukeSkywalker = 'Luke Skywalker';

// ❌ bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// ✅ good
const obj = {
  lukeSkywalker,
};
```

  

#### 3.6. Group your shorthand properties at the beginning of your object declaration.

  

>❓Why? It’s easier to tell which properties are using the shorthand.

  

```javascript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// ❌ bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// ✅ good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

  

#### 3.6. Only quote properties that are invalid identifiers.

eslint: [`quote-props`](https://eslint.org/docs/rules/quote-props.html)

  

>❓Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  

```javascript
// ❌ bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// ✅ good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

  

#### 3.7. Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.

eslint: [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins)

  

>❓Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

  

```javascript
// ❌ bad
console.log(object.hasOwnProperty(key));

// ✅ good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; 
// cache the lookup once, in module scope./* or */import has from 'has'; // https://www.npmjs.com/package/has// ...

console.log(has.call(object, key));
```

  

#### 3.8. Prefer the object spread operator over [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

  

```javascript
// very bad
const original = { 
  a: 1, 
  b: 2 
};

const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// ❌ bad
const original = { 
  a: 1, 
  b: 2 
};
const copy = Object.assign({}, original, { c: 3 }); 
// copy => { a: 1, b: 2, c: 3 }

// ✅ good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; 
// copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; 
// noA => { b: 2, c: 3 }
```

  

4\. Arrays
----------

#### 4.1. Use the literal syntax for array creation.

eslint: [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor.html)

  

```javascript
// ❌ bad
const items = new Array();

// ✅ good
const items = [];
```

  

#### 4.2. Use [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

```javascript
const someStack = [];

// ❌ bad
someStack[someStack.length] = 'abracadabra';

// ✅ good
someStack.push('abracadabra');
```

  

#### 4.3. Use array spreads `...` to copy arrays.

```javascript
// ❌ bad
const len = items.length;
const itemsCopy = [];

for (let i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// ✅ good
const itemsCopy = [...items];
```

  

#### 4.4 To convert an iterable object to an array, use spreads `...` instead of [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

  

```javascript
const foo = document.querySelectorAll('.foo');

// ✅ good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

  

#### 4.5. Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) for converting an array-like object to an array.

  

```javascript
const arrLike = { 
  0: 'foo', 
  1: 'bar', 
  2: 'baz', 
  length: 3 
};

// ❌ bad
const arr = Array.prototype.slice.call(arrLike);

// ✅ good
const arr = Array.from(arrLike);
```

  

#### 4.6. Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) instead of spread `...` for mapping over iterables, because it avoids creating an intermediate array.

```javascript
// ❌ bad
const baz = [...foo].map(bar);

// ✅ good
const baz = Array.from(foo, bar);
```

  

#### 4.7. Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following  [8.2.](https://app.clickup.com/24383048/v/dc/q83j8-12520/q83j8-29741?block=block-1661efd9-3924-4ae4-a25a-c1d0326734aa)

eslint: [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)

  

```javascript
// ✅ good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// ✅ good
[1, 2, 3].map(x => x + 1);

// ❌ bad - no returned value means `acc` becomes undefined after the first iteration
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
});

// ✅ good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
  return flatten;
});

// ❌ bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// ✅ good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```

  

#### 4.8. Use line breaks after open and before close array brackets if an array has multiple lines

```javascript
// ❌ bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// ✅ good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

  

5\. Destructuring
-----------------

#### 5.1. Use object destructuring when accessing and using multiple properties of an object.

eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

  

>❓Why? Destructuring saves you from creating temporary references for those properties.

  

```javascript
// ❌ bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// ✅ good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

  

#### 5.2. Use array destructuring.

eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

  

```javascript
const arr = [1, 2, 3, 4];

// ❌ bad
const first = arr[0];
const second = arr[1];

// ✅ good
const [first, second] = arr;
```

  

#### 5.3. Use object destructuring for multiple return values, not array destructuring.

  

>❓Why? You can add new properties over time or change the order of things without breaking call sites.

  

```javascript
// ❌ bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input);

// ✅ good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);
```

  

6\. Strings
-----------

#### 6.1. Use single quotes `''` for strings.

eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)

  

```javascript
// ❌ bad
const name = "Capt. Janeway";

// ❌ bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;

// ✅ good
const name = 'Capt. Janeway';
```

  

#### 6.2. Long strings should not be written across multiple lines using string concatenation.

  

>❓Why? Broken strings are painful to work with and make code less searchable.

  

```javascript
// ❌ bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// ❌ bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// ✅ good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

  

#### 6.3. When programmatically building up strings, use template strings instead of concatenation.

eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing)

  

>❓Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

  

```javascript
// ❌ bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// ❌ bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// ❌ bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// ✅ good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

  

#### 6.4. ❗Never use `eval()` on a string, it opens too many vulnerabilities.

eslint: [`no-eval`](https://eslint.org/docs/rules/no-eval)

  

#### 6.5. Do not unnecessarily escape characters in strings.

eslint: [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape)

  

>❓Why? Backslashes harm readability, thus they should only be present when necessary.

  

```javascript
// ❌ bad
const foo = '\'this\' \i\s \"quoted\"';

// ✅ good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

  

7\. Functions
-------------

  

#### 7.1. Use named function expressions instead of function declarations.

eslint: [`func-style`](https://eslint.org/docs/rules/func-style)

  

>❓Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to explicitly name the expression, regardless of whether or not the name is inferred from the containing variable (which is often the case in modern browsers or when using compilers such as Babel). This eliminates any assumptions made about the Error’s call stack. ([Discussion](https://github.com/airbnb/javascript/issues/794))

  

```javascript
// ❌ bad
function foo() {
  // ...
}

// ❌ bad
const foo = function () {
  // ...
};

// ✅ good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

  

#### 7.2. Wrap immediately invoked function expressions in parentheses.

eslint: [`wrap-iife`](https://eslint.org/docs/rules/wrap-iife.html)

  

>❓Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.

  

```javascript
// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

  

#### 7.3. Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.

eslint: [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func.html)

  

#### **7.4. Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement.

```javascript
// ❌ bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// ✅ good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

  

#### 7.5. Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.

```javascript
// ❌ bad
function foo(name, options, arguments) {
  // ...
}

// ✅ good
function foo(name, options, args) {
  // ...
}
```

  

#### 7.6. Never use `arguments`, opt to use rest syntax `...` instead.

eslint: [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)

  

>❓Why? `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

  

```javascript
// ❌ bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// ✅ good
function concatenateAll(...args) {
  return args.join('');
}
```

  

#### 7.7. Use default parameter syntax rather than mutating function arguments.

```javascript
// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// ✅ good
function handleThings(opts = {}) {
  // ...
}
```

  

#### 7.8. Avoid side effects with default parameters.

  

>❓Why? They are confusing to reason about.

  

```javascript
var b = 1;

// ❌ bad
function count(a = b++) {
  console.log(a);
}

count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

  

#### 7.9. Always put default parameters last.

```javascript
// ❌ bad
function handleThings(opts = {}, name) {
  // ...
}

// ✅ good
function handleThings(name, opts = {}) {
  // ...
}
```

  

#### 7.10. If parameters number is greater than 3, put them into `options` parameter

  

>❓Why? It improves readability and helps to avoid mess with parameters order

  

```javascript
// ❌ bad
function createUser(
  firstName, 
  middleName, 
  lastName, 
  userName, 
  nickName, 
  city
) {
  // ...
}

createUser('Bob', null, 'Doe', 'bob_doe', 'bobbie', 'New York'); // need to check parameters list everytime


// ✅ good
function createUser({ 
  firstName, 
  middleName, 
  lastName, 
  userName, 
  nickName, 
  city 
} = {}) {
  // ...
}

createUser({
  firstName: 'Bob', 
  middleName: null, 
  lastName: 'Doe', 
  userName: 'bob_doe', 
  nickName: 'bobbie', 
  city: 'New York'
});
```

  

#### 7.11. Never use the Function constructor to create a new function.

eslint: [`no-new-func`](https://eslint.org/docs/rules/no-new-func)

  

>❓Why? Creating a function in this way evaluates a string similarly to `eval()`, which opens vulnerabilities.

  

```javascript
// ❌ bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

  

#### 7.12 Spacing in a function signature.

eslint: [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks)

  

>❓Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

  

```javascript
// ❌ bad
const f = function(){};
const g = function (){};
const h = function() {};

// ✅ good
const x = function () {};
const y = function a() {};
```

  

#### 7.13 Never mutate parameters.

eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

  

>❓Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

  

```javascript
// ❌ bad
function f1(obj) {
  obj.key = 1;
}

// ✅ good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

  

#### 7.14 Never reassign parameters.

eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

  

>❓Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the `arguments` object. It can also cause optimization issues, especially in V8.

  

```javascript
// ❌ bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// ✅ good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```

  

#### 7.15. Prefer the use of the spread operator `...` to call variadic functions.

eslint: [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread)

  

>❓Why? It’s cleaner, you don’t need to supply a context, and you can not easily compose `new` with `apply`.

  

```javascript
// ❌ bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// ✅ good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// ❌ bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// ✅ good
new Date(...[2016, 8, 5]);
```

  

#### 7.16. Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item.

  

eslint: [`function-paren-newline`](https://eslint.org/docs/rules/function-paren-newline)

```javascript
// ❌ bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// ✅ good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

// ❌ bad
console.log(foo,
  bar,
  baz);

// ✅ good
console.log(
  foo,
  bar,
  baz,
);
```

  

8\. Arrow Functions
-------------------

  

#### 8.1. When you must use an anonymous function (as when passing an inline callback), use arrow function notation.

eslint: [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing.html)

  

>❓Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.  
Why not? If you have a fairly complicated function, you might move that logic out into its own named function expression.

  

```javascript
// ❌ bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// ✅ good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

  

#### 8.2. If the function body consists of a single statement returning an [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement.

eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

  

>❓Why? Syntactic sugar. It reads well when multiple functions are chained together.

  

```javascript
// ❌ bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// ✅ good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// ✅ good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// ✅ good
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

// No implicit return with side effects
function foo(callback) {
  const val = callback();
  if (val === true) {
    // Do something if callback returns true
  }
}

let bool = false;

// ❌ bad
foo(() => bool = true);

// ✅ good
foo(() => {
  bool = true;
});
```

  

#### 8.3. In case the expression spans over multiple lines, wrap it in parentheses for better readability.

  

>❓Why? It shows clearly where the function starts and ends.

  

```javascript
// ❌ bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// ✅ good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));
```

  

#### 8.4. If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include parentheses around arguments for clarity and consistency.

eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html)

  

**💡 Note:** it is also acceptable to always use parentheses, in which case use the [“always” option](https://eslint.org/docs/rules/arrow-parens#always) for eslint.

  

>❓Why? Less visual clutter.

  

```javascript
// ❌ bad
[1, 2, 3].map((x) => x * x);

// ✅ good
[1, 2, 3].map(x => x * x);

// ✅ good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// ❌ bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// ✅ good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

  

#### 8.5. Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`).

eslint: [`no-confusing-arrow`](https://eslint.org/docs/rules/no-confusing-arrow)

  

```javascript
// ❌ bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

// ❌ bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

// ✅ good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

// ✅ good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height > 256 ? largeSize : smallSize;
};
```

  

#### 8.6. Enforce the location of arrow function bodies with implicit returns.

eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak)

  

```javascript
// ❌ bad
(foo) =>
  bar;

(foo) =>
  (bar);

// ✅ good
(foo) => bar;
(foo) => (bar);
(foo) => (
   bar
)
```

  

9\. Classes & Constructors
--------------------------

  

#### 9.1. Always use `class`. Avoid manipulating `prototype` directly.

  

>❓Why? `class` syntax is more concise and easier to reason about.

  

```javascript
// ❌ bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// ✅ good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

  

#### 9.2. Use `extends` for inheritance.

  

>❓Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

  

```javascript
// ❌ bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
};

// ✅ good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

  

#### 9.3. Methods can return `this` to help with method chaining.

```javascript
// ❌ bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// ✅ good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```

  

#### 9.4. It’s okay to write a custom `toString()` method, just make sure it works successfully and causes no side effects.

```javascript
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

  

#### 9.5. Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary.

eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

  

```javascript
// ❌ bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// ❌ bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// ✅ good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}
```

  

#### 9.6. Avoid duplicate class members.

eslint: [`no-dupe-class-members`](https://eslint.org/docs/rules/no-dupe-class-members)

  

>❓Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.

  

```javascript
// ❌ bad
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// ✅ good
class Foo {
  bar() { return 1; }
}

// ✅ good
class Foo {
  bar() { return 2; }
}
```

  

10\. Modules
------------

  

#### 10.1. Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.

  

>❓Why? Modules are the future, let’s start using the future now.

  

```javascript
// ❌ bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

  

#### 10.2. Do not use wildcard imports.

  

>❓Why? This makes sure you have a single default export.

  

```javascript
// ❌ bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// ✅ good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

  

#### 10.3. And do not export directly from an import.

  

**💡 Note:** It's allowed to write wildcard export in \`index.js\` files to simplify import paths

  

>❓Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

  

```javascript
// ❌ bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// ✅ good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;

// ✅ good
// filename index.js
export * from './AirbnbStyleGuide'
```

  

#### 10.4. Only import from a path in one place.

eslint: [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)

  

>❓Why? Having multiple lines that import from the same path can make code harder to maintain.

  

```javascript
// ❌ bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// ✅ good
import foo, { named1, named2 } from 'foo';

// ✅ good
import foo, {
  named1,
  named2,
} from 'foo';
```

  

#### 10.5. Do not export mutable bindings.

eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

  

>❓Why? Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.

  

```javascript
// ❌ bad
let foo = 3;
export { foo };

// ✅ good
const foo = 3;
export { foo };
```

  

#### 10.6. Prefer named export over default export.

  

>❓Why? Easier to maintain and refactor. Same module name is enforced across all project imports

  

```javascript
// ❌ bad
export default function foo() {}

import foo from './foo';
import myFoo from './foo';

// ✅ good
export function foo() {}

import { foo } from './foo' // import name is stable
```

  

#### 10.7. Put all `import`s above non-import statements.

eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

  

>❓Why? Since `import`s are hoisted, keeping them all at the top prevents surprising behavior.

  

```javascript
// ❌ bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// ✅ good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

  

#### 10.9. Multiline imports should be indented just like multiline array and object literals.

  

>❓Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.

  

```javascript
// ❌ bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// ✅ good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';
```

  

#### 10.9. Disallow Webpack loader syntax in module import statements.

eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)

  

>❓Why? Since using Webpack syntax in the imports couples the code to a module bundler. Prefer using the loader syntax in `webpack.config.js`.

  

```javascript
// ❌ bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';

// ✅ good
import fooSass from 'foo.scss';
import barCss from 'bar.css';
```

  

11\. Iterators and Generators
-----------------------------

#### 11.1. Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like `for-in` or `for-of`.

eslint: [`no-iterator`](https://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax)

  

>❓Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.  
Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / … to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

  

```javascript
const numbers = [1, 2, 3, 4, 5];

// ❌ bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// ✅ good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// ❌ bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// ✅ good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map(num => num + 1);
```

  

#### 11.2. Don’t use generators for now in browsers.

**💡 Note:** It's allowed to use generators in NodeJS environment

  

>❓Why? They don’t transpile well to ES5.

  

#### 11.3. If you must use generators, make sure their function signature is spaced properly.

eslint: [`generator-star-spacing`](https://eslint.org/docs/rules/generator-star-spacing)

  

>❓Why? `function` and `*` are part of the same conceptual keyword - `*` is not a modifier for `function`, `function*` is a unique construct, different from `function`.

  

```javascript
// ❌ bad
function * foo() {
  // ...
}

// ❌ bad
const bar = function * () {
  // ...
};

// ❌ bad
const baz = function *() {
  // ...
};

// ❌ bad
const quux = function*() {
  // ...
};

// ❌ bad
function*foo() {
  // ...
}

// ❌ bad
function *foo() {
  // ...
}

// very bad
function
*
foo() {
  // ...
}

// very bad
const wat = function
*
() {
  // ...
};

// ✅ good
function* foo() {
  // ...
}

// ✅ good
const foo = function* () {
  // ...
};
```

  

12\. Properties
---------------

  

#### 12.1. Use dot notation when accessing properties.

eslint: [`dot-notation`](https://eslint.org/docs/rules/dot-notation.html)

  

```javascript
const luke = {
  jedi: true,
  age: 28,
};

// ❌ bad
const isJedi = luke['jedi'];

// ✅ good
const isJedi = luke.jedi;
```

  

#### 12.3. Use bracket notation `[]` when accessing properties with a variable.

```javascript
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

  

#### 12.3. Use exponentiation operator `**` when calculating exponentiations.

eslint: [`no-restricted-properties`](https://eslint.org/docs/rules/no-restricted-properties)

  

```javascript
// ❌ bad
const binary = Math.pow(2, 10);

// ✅ good
const binary = 2 ** 10;
```

  

#### 13\. Variables

  

#### 13.1. Always use `const` or `let` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.

eslint: [`no-undef`](https://eslint.org/docs/rules/no-undef) [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

  

```javascript
// ❌ bad
superPower = new SuperPower();

// ✅ good
const superPower = new SuperPower();
```

  

#### 13.3. Use one `const` or `let` declaration per variable or assignment.

eslint: [`one-var`](https://eslint.org/docs/rules/one-var.html)

  

>❓Why? It’s easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

  

```javascript
// ❌ bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// ❌ bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// ✅ good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

  

#### 13.3. Group all your `const`s and then group all your `let`s.

  

>❓Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

  

```javascript
// ❌ bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// ❌ bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// ✅ good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

  

#### [13.4](https://mate-academy.github.io/style-guides/javascript.html#variables--define-where-used) Assign variables where you need them, but place them in a reasonable place.

  

>❓Why? `let` and `const` are block scoped and not function scoped.

  

```javascript
// ❌ bad - unnecessary function call
function checkName(hasName) {
  const name = getName();

  if (hasName === 'test') {
    return false;
  }

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}

// ✅ good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }

  const name = getName();

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}
```

  

#### 13.6. Don’t chain variable assignments.

eslint: [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)

  

>❓Why? Chaining variable assignments creates implicit global variables.

  

```javascript
// ❌ bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// ✅ good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// the same applies for `const`
```

  

#### 13.6. Avoid using unary increments and decrements (`++`, `--`).

eslint [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus)

  

>❓Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

  

```javascript
// ❌ bad

const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// ✅ good

const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

  

#### 13.7. Avoid linebreaks before or after `=` in an assignment. If your assignment violates [`max-len`](https://eslint.org/docs/rules/max-len.html), surround the value in parens.

eslint [`operator-linebreak`](https://eslint.org/docs/rules/operator-linebreak.html)

  

>❓Why? Linebreaks surrounding `=` can obfuscate the value of an assignment.

  

```javascript
// ❌ bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// ❌ bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// ✅ good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// ✅ good
const foo = 'superLongLongLongLongLongLongLongLongString';


```

  

#### 13.9. Disallow unused variables.

eslint: [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)

  

>❓Why? Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.

  

```javascript
// ❌ bad

var some_unused_var = 42;

// Write-only variables are not considered as used.
var y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
var z = 0;
z = z + 1;

// Unused function arguments.
function getX(x, y) {
    return x;
}

// ✅ good
function getXPlusY(x, y) {
  return x + y;
}

var x = 1;
var y = a + 2;

alert(getXPlusY(x, y));

// 'type' is ignored even if unused because it has a rest property sibling.
// This is a form of extracting an object that omits the specified keys.
var { type, ...coords } = data;
// 'coords' is now the 'data' object without its 'type' property.
```

  

14\. Hoisting
-------------

  

#### 14.1. `var` declarations get hoisted to the top of their closest enclosing function scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone). It’s important to know why [typeof is no longer safe](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).

  

```javascript
// we know this wouldn’t work (assuming there
// is no notDefined global variable)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// creating a variable declaration after you
// reference the variable will work due to
// variable hoisting. Note: the assignment
// value of `true` is not hoisted.
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// the interpreter is hoisting the variable
// declaration to the top of the scope,
// which means our example could be rewritten as:
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// using const and let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

  

#### 14.2. Anonymous function expressions hoist their variable name, but not the function assignment.

  

```javascript
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function () {
    console.log('anonymous function expression');
  };
}
```

  

#### 14.3. Named function expressions hoist the variable name, not the function name or the function body.

  

```javascript
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// the same is true when the function name
// is the same as the variable name.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log('named');
  };
}
```

  

#### 14.4. Function declarations hoist their name and the function body.

  

```javascript
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}
```

*   For more information refer to [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](http://www.adequatelygood.com/).

  

15\. Comparison Operators & Equality
------------------------------------

  

#### 15.1. Use `===` and `!==` over `==` and `!=`.

eslint: [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq.html)

  

#### 15.2. Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

*   **Objects** evaluate to **true**
*   **Undefined** evaluates to **false**
*   **Null** evaluates to **false**
*   **Booleans** evaluate to **the value of the boolean**
*   **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
*   **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

```javascript
if ([0] && []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}
```

  

#### 15.3. Use shortcuts for booleans, but explicit comparisons for strings and numbers.

```javascript
// ❌ bad
if (isValid === true) {
  // ...
}

// ✅ good
if (isValid) {
  // ...
}

// ❌ bad
if (name) {
  // ...
}

// ✅ good
if (name !== '') {
  // ...
}

// ❌ bad
if (collection.length) {
  // ...
}

// ✅ good
if (collection.length > 0) {
  // ...
}
```

  

#### 15.4. For more information see [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.

  

#### 15.6. Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`).

eslint: [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations.html)

  

>❓Why? Lexical declarations are visible in the entire `switch` block but only get initialized when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

  

```javascript
// ❌ bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// ✅ good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
```

  

#### 15.6. Ternaries should not be nested. Enforce newlines between operands of ternary expressions.

eslint: [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary.html) , [`multiline-ternary`](https://eslint.org/docs/latest/rules/multiline-ternary)

  

```javascript
// ❌ bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// ✅ good
// split into 2 separated ternary expressions
const maybeNull = value1 > value2 
  ? 'baz' 
  : null;

const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;
```

  

#### 15.7. Avoid unneeded ternary statements.

eslint: [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary.html)

  

```javascript
// ❌ bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// ✅ good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

  

#### 15.8 When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators (`+`, `-`, `*`, & `/`) since their precedence is broadly understood.

eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators.html)

  

>❓Why? This improves readability and clarifies the developer’s intention.

  

```javascript
// ❌ bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// ❌ bad
const bar = a ** b - 5 % d;

// ❌ bad
// one may be confused into thinking (a || b) && c
if (a || b && c) {
  return d;
}

// ✅ good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

// ✅ good
const bar = (a ** b) - (5 % d);

// ✅ good
if (a || (b && c)) {
  return d;
}

// ✅ good
const bar = a + b / c * d;
```

  

16\. Blocks
-----------

  

#### 16.1. Enforce consistent brace style for all control statements.

eslint: [`curly`](https://eslint.org/docs/latest/rules/curly) , [`brace-style`](https://eslint.org/docs/rules/brace-style.html)

  

```javascript
// ❌ bad
if (test)
  return false;

// ❌ bad
if (test) return false;

// ✅ good
if (test) {
  return false;
}

// ❌ bad
function foo() { return false; }

// ✅ good
function bar() {
  return false;
}
```

  

#### 16.2. If you’re using multi-line blocks with `if` and `else`, put `else` on the same line as your `if` block’s closing brace.

eslint: [`brace-style`](https://eslint.org/docs/rules/brace-style.html)

  

```javascript
// ❌ bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// ✅ good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

  

#### 16.4. If an `if` block always executes a `return` statement, the subsequent `else` block is unnecessary. A `return` in an `else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks.

eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

  

```javascript
// ❌ bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// ❌ bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// ❌ bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// ✅ good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// ✅ good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

// ✅ good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
```

  

17\. Control Statements
-----------------------

  

#### 17.1 In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line.

  

>❓Why? Requiring operators at the beginning of the line keeps the operators aligned and follows a pattern similar to method chaining. This also improves readability by making it easier to visually follow complex logic.

  

```javascript
// ❌ bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1();
}

// ❌ bad
if (foo === 123 &&
  bar === 'abc') {
  thing1();
}

// ❌ bad
if (foo === 123
  && bar === 'abc') {
  thing1();
}

// ❌ bad
if (
  foo === 123 &&
  bar === 'abc'
) {
  thing1();
}

// ✅ good
if (
  foo === 123
    && bar === 'abc'
) {
  thing1();
}

// ✅ good
if (
  (foo === 123 || bar === 'abc')
    && doesItLookGoodWhenItBecomesThatLong()
    && isThisReallyHappening()
) {
  thing1();
}

// ✅ good
if (foo === 123 && bar === 'abc') {
  thing1();
}
```

  

#### 17.2 Don’t use selection operators in place of control statements.

```javascript
// ❌ bad
!isRunning && startRunning();

// ✅ good
if (!isRunning) {
  startRunning();
}
```

  

18\. Comments
-------------

  

#### 18.1 Use `/** ... */` for multi-line comments.

```javascript
// ❌ bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...

  return element;
}

// ✅ good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}
```

  

#### 18.2. Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

```javascript
// ❌ bad
const active = true;  // is current tab

// ✅ good
// is current tab
const active = true;

// ❌ bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// ✅ good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}
```

  

#### 18.3. Start all comments with a space to make it easier to read.

eslint: [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment)

  

```javascript
// ❌ bad
//is current tab
const active = true;

// ✅ good
// is current tab
const active = true;

// ❌ bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

// ✅ good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}
```

  

#### 18.4. Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you’re pointing out a problem that needs to be revisited, or if you’re suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.

  

💡 Note: `FIXME` and `TODO` comments should have a link to the task

  

#### 18.5. Use `// FIXME:` to annotate problems.

```javascript
class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: shouldn’t use a global here (https://task.manager/t/12345)
    total = 0;
  }
}
```

  

#### 18.6. Use `// TODO:` to annotate solutions to problems.

```javascript
class Calculator extends Abacus {
  constructor() {
    super();

    // TODO: total should be configurable by an options param (https://task.manager/t/12345)
    this.total = 0;
  }
}
```

  

#### 19\. Whitespace

  

#### 19.1. Use soft tabs (space character) set to 2 spaces.

eslint: [`indent`](https://eslint.org/docs/rules/indent.html)

  

```javascript
// ❌ bad
function foo() {
∙∙∙∙let name;
}

// ❌ bad
function bar() {
∙let name;
}

// ✅ good
function baz() {
∙∙let name;
}
```

  

#### 19.2. Place 1 space before the leading brace.

eslint: [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks.html)

  

```javascript
// ❌ bad
function test(){
  console.log('test');
}

// ✅ good
function test() {
  console.log('test');
}

// ❌ bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// ✅ good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```

  

#### 19.3. Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations.

eslint: [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing.html)

  

```javascript
// ❌ bad
if(isJedi) {
  fight ();
}

// ✅ good
if (isJedi) {
  fight();
}

// ❌ bad
function fight () {
  console.log ('Swooosh!');
}

// ✅ good
function fight() {
  console.log('Swooosh!');
}
```

  

#### 19.4. Set off operators with spaces.

eslint: [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops.html)

  

```javascript
// ❌ bad
const x=y+5;

// ✅ good
const x = y + 5;
```

  

#### 19.5. End files with a single newline character.

eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

  

```javascript
// ❌ bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;
```

  

```javascript
// ❌ bad
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
↵
```

  

```javascript
// ✅ good
import { es6 } from './AirbnbStyleGuide';
  // ...
export default es6;↵
```

  

#### 19.6. Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which emphasizes that the line is a method call, not a new statement.

eslint: [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](https://eslint.org/docs/rules/no-whitespace-before-property)

  

```javascript
// ❌ bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// ❌ bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// ✅ good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// ❌ bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// ✅ good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// ✅ good
const leds = stage.selectAll('.led').data(data);
```

  

#### 19.7. Leave a blank line after blocks and before the next statement.

  

```javascript
// ❌ bad
if (foo) {
  return bar;
}
return baz;

// ✅ good
if (foo) {
  return bar;
}

return baz;

// ❌ bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// ✅ good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// ❌ bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// ✅ good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;
```

  

#### 19.8. Do not pad your blocks with blank lines.

eslint: [`padded-blocks`](https://eslint.org/docs/rules/padded-blocks.html)

  

```javascript
// ❌ bad
function bar() {

  console.log(foo);

}

// ❌ bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// ❌ bad
class Foo {

  constructor(bar) {
    this.bar = bar;
  }
}

// ✅ good
function bar() {
  console.log(foo);
}

// ✅ good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}
```

  

#### 19.9. Do not add spaces inside parentheses.

eslint: [`space-in-parens`](https://eslint.org/docs/rules/space-in-parens.html)

  

```javascript
// ❌ bad
function bar( foo ) {
  return foo;
}

// ✅ good
function bar(foo) {
  return foo;
}

// ❌ bad
if ( foo ) {
  console.log(foo);
}

// ✅ good
if (foo) {
  console.log(foo);
}
```

  

#### 19.10. Do not add spaces inside brackets.

eslint: [`array-bracket-spacing`](https://eslint.org/docs/rules/array-bracket-spacing.html)

```javascript
// ❌ bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// ✅ good
const foo = [1, 2, 3];
console.log(foo[0]);
```

  

#### 19.11. Add spaces inside curly braces.

eslint: [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing.html)

  

```javascript
// ❌ bad
const foo = {clark: 'kent'};

// ✅ good
const foo = { clark: 'kent' };
```

  

#### 19.12. Avoid having lines of code that are longer than 80 characters (including whitespace). Note: per [above](https://app.clickup.com/24383048/v/dc/q83j8-12520/q83j8-29741?block=block-66fbe678-6c41-4e12-9e4b-72671228fd2c), long strings are exempt from this rule, and should not be broken up.

eslint: [`max-len`](https://eslint.org/docs/rules/max-len.html)

  

>❓Why? This ensures readability and maintainability.

  

```javascript
// ❌ bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

// ❌ bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// ✅ good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy;

// ✅ good
$.ajax({
  method: 'POST',
  url: 'https://airbnb.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));
```

  

#### 19.13. Avoid spaces before commas and require a space after commas.

eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

```javascript
// ❌ bad
var arr = [1 , 2];

// ✅ good
var arr = [1, 2];
```

  

#### 19.14. Enforce spacing inside of computed properties.

eslint: [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing)

  

```javascript
// ❌ bad
obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]

// ✅ good
obj[foo]
obj['foo']
var x = { [b]: a }
obj[foo[bar]]
```

  

#### 19.15. Avoid spaces between functions and their invocations.

eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

  

```javascript
// ❌ bad
func ();

func
();

// ✅ good
func();
```

  

#### 19.16 Enforce spacing between keys and values in object literal properties.

eslint: [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

  

```javascript
// ❌ bad
var obj = { "foo" : 42 };
var obj2 = { "foo":42 };

// ✅ good
var obj = { "foo": 42 };
```

  

#### 19.17 Avoid trailing spaces at the end of lines.

eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

  

#### 19.18 Avoid multiple empty lines and only allow one newline at the end of files.

eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)

  

```javascript
// ❌ bad
var x = 1;



var y = 2;

// ✅ good
var x = 1;

var y = 2;
```

  

20\. Commas
-----------

  

#### 20.1. Leading commas: **Nope.** 

eslint: [`comma-style`](https://eslint.org/docs/rules/comma-style.html)

  

```javascript
// ❌ bad
const story = [
    once
  , upon
  , aTime
];

// ✅ good
const story = [
  once,
  upon,
  aTime,
];

// ❌ bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// ✅ good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```

  

#### 20.2. Additional trailing comma: **Yup.** 

eslint: [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle.html)

  

>❓Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the [trailing comma problem](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) in legacy browsers.

  

```javascript
// ❌ bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};

// ✅ good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};
```

  

```javascript
// ❌ bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

const heroes = [
  'Batman',
  'Superman'
];

// ✅ good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];

// ❌ bad
function createHero(
  firstName,
  lastName,
  inventorOf
) {
  // does nothing
}

// ✅ good
function createHero(
  firstName,
  lastName,
  inventorOf,
) {
  // does nothing
}

// ✅ good (note that a comma must not appear after a "rest" element)
function createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
) {
  // does nothing
}

// ❌ bad
createHero(
  firstName,
  lastName,
  inventorOf
);

// ✅ good
createHero(
  firstName,
  lastName,
  inventorOf,
);

// ✅ good (note that a comma must not appear after a "rest" element)
createHero(
  firstName,
  lastName,
  inventorOf,
  ...heroArgs
);
```

  

21\. Semicolons
---------------

  

#### 21.1. **Yup.** 

eslint: [`semi`](https://eslint.org/docs/rules/semi.html)

  

>❓Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) to determine whether or not it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

  

```javascript
// ❌ bad - raises exception
const luke = {}
const leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')

// ❌ bad - raises exception
const reaction = "No! That’s impossible!"
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}())

// ❌ bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
function foo() {
  return
    'search your feelings, you know it to be foo'
}

// ✅ good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});

// ✅ good
const reaction = "No! That’s impossible!";
(async function meanwhileOnTheFalcon() {
  // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
  // ...
}());

// ✅ good
function foo() {
  return 'search your feelings, you know it to be foo';
}
```

*   [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214#7365214).

  

22\. Type Casting & Coercion
----------------------------

  

#### 22.1. Perform type coercion at the beginning of the statement.

  

#### 22.2 Strings:

eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

  

```javascript
// => this.reviewScore = 9;

// ❌ bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// ❌ bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// ❌ bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// ✅ good
const totalScore = String(this.reviewScore);
```

  

#### 22.3. Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings.

eslint: [`radix`](https://eslint.org/docs/rules/radix) [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

  

```javascript
const inputValue = '4';

// ❌ bad
const val = new Number(inputValue);

// ❌ bad
const val = +inputValue;

// ❌ bad
const val = inputValue >> 0;

// ❌ bad
const val = parseInt(inputValue);

// ✅ good
const val = Number(inputValue);

// ✅ good
const val = parseInt(inputValue, 10);
```

  

#### 22.4. Bitwise operators: no

eslint: [`no-bitwise`](https://eslint.org/docs/latest/rules/no-bitwise)

  

```javascript
// ❌ bad
if (!~[1, 2, 3].indexOf(5)) {
  // ...
}

// ✅ good
if ([1, 2, 3].indexOf(5) === -1) {
  // ...
}
```

  

#### 22.5. If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](https://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you’re doing.

  

```javascript
// ✅ good
/**
 * parseInt was the reason my code was slow.
 * Bitshifting the String to coerce it to a
 * Number made it a lot faster.
 */
const val = inputValue >> 0;
```

  

#### 22.6 Booleans:

eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)

  

```javascript
const age = 0;

// ❌ bad
const hasAge = new Boolean(age);

// ✅ good, but ! and !! may be confused 
const hasAge = !!age;

// best
const hasAge = Boolean(age);
```

  

23\. Naming Conventions
-----------------------

  

#### [23.1](https://mate-academy.github.io/style-guides/javascript.html#naming--descriptive) Avoid single letter names. Be descriptive with your naming.

eslint: [`id-length`](https://eslint.org/docs/rules/id-length)

  

**💡 Note:** it's allowed to use single letter name for iterator variable

  

```javascript
// ❌ bad
function q() {
  // ...
}

// ✅ good
function query() {
  // ...
}

// ✅ good
for (let i = 0; i < array.length; i+=1) {
  // ...
}
```

  

#### 23.2. Use camelCase when naming objects, functions, and instances. Function names are typically verbs or verb phrases.

eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase.html) 

  

```javascript
// ❌ bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// ✅ good
const thisIsMyObject = {};
function calculatePrice() {}
```

  

#### 23.3. Use PascalCase only when naming constructors or classes.

eslint: [`new-cap`](https://eslint.org/docs/rules/new-cap.html)

  

```javascript
// ❌ bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// ✅ good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```

  

#### 23.4 Do not use trailing or leading underscores.

eslint: [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle.html)

  

>❓Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tl;dr: if you want something to be “private”, it must not be observably present.

  

```javascript
// ❌ bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// ✅ good
this.firstName = 'Panda';
```

  

#### 23.5 Don’t save references to `this`. Use arrow functions or [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

  

```javascript
// ❌ bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// ❌ bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// ✅ good
function foo() {
  return () => {
    console.log(this);
  };
}
```

  

#### 23.6 A base filename should exactly match the name of its primary named or default export.

```javascript
// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// file 4 contents
export class User {}

// in some other file
// ❌ bad
import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export
import { User } from './user'; // PascalCase import/filename, camelCase export

// ❌ bad
import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
import forty_two from './forty_two'; // snake_case import/filename, camelCase export
import inside_directory from './inside_directory'; // snake_case import, camelCase export
import index from './inside_directory/index'; // requiring the index file explicitly
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

// ✅ good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import { User } from './User' // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js
```

  

#### 23.7 Use camelCase when you export a function. Your filename should be identical to your function’s name.

  

```javascript
// filename makeStyleGuide.js
export function makeStyleGuide() {
  // ...
}
```

  

#### 23.8 Use PascalCase when you export a constructor / class / singleton / function library / bare object.

  

```javascript
// filename AirbnbStyleGuide.js
export const AirbnbStyleGuide = {
  es6: {
  },
};
```

  

#### 23.9 Acronyms and initialisms should always be all capitalized, or all lowercased.

  

>❓Why? Names are for readability, not to appease a computer algorithm.

  

```javascript
// ❌ bad
import SmsContainer from './containers/SmsContainer';

// ❌ bad
const HttpRequests = [
  // ...
];

// ✅ good
import SMSContainer from './containers/SMSContainer';

// ✅ good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from './containers/TextMessageContainer';

// best
const requests = [
  // ...
];
```

  

#### 23.10 You may optionally uppercase a constant only if it (1) is exported, (2) is a `const` (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.

  

>❓Why? This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE\_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.

  

*   What about all `const` variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.
*   What about exported objects? - Uppercase at the top level of export (e.g. `EXPORTED_OBJECT.key`) and maintain that all nested properties do not change.

  

```javascript
// ❌ bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// ❌ bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// ❌ bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---

// allowed but does not supply semantic value
export const apiKey = 'SOMEKEY';

// better in most cases
export const API_KEY = 'SOMEKEY';

// ---

// ❌ bad - unnecessarily uppercases key while adding no semantic value
export const MAPPING = {
  KEY: 'value'
};

// ✅ good
export const MAPPING = {
  key: 'value'
};
```

  

#### 23.11 Don't shorten variables or functions names

  

>❓Why? For better readability and maintainance

  

```javascript
// ❌ bad
const usr = new User();
this.repo = new UserRepository();
this.userRepo = new UserRepoistory();
const findVac = () => this.vacRep.find();

// ✅ good
const user = new User();
this.userRepository = new UserRepository();
const findVacancy = () => this.vacancyRepository.find();
```

24\. Accessors
--------------

  

#### 24.1 Accessor functions for properties are not required.

  

#### 24.2 Do not use JavaScript getters/setters as they cause unexpected side effects and are harder to test, maintain, and reason about. Instead, if you do make accessor functions, use `getVal()` and `setVal('hello')`.

  

```javascript
// ❌ bad
class Dragon {
  get age() {
    // ...
  }

  set age(value) {
    // ...
  }
}

// ✅ good
class Dragon {
  getAge() {
    // ...
  }

  setAge(value) {
    // ...
  }
}
```

  

#### 24.3 If the property/method is a `boolean`, use `isVal()` or `hasVal()`.

```javascript
// ❌ bad
if (!dragon.age()) {
  return false;
}

// ✅ good
if (!dragon.hasAge()) {
  return false;
}
```

  

#### 24.4 It’s okay to create `get()` and `set()` functions, but be consistent.

```javascript
class Jedi {
  constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}
```

  

25\. ECMAScript 5 Compatibility
-------------------------------

#### 25.1. Refer to [Kangax](https://twitter.com/kangax/)’s ES5 [compatibility table](https://kangax.github.io/es5-compat-table/).

  

26\. ECMAScript 6+ (ES 2015+) Styles
------------------------------------

#### 26.1 This is a collection of links to the various ES6+ features.

1.  [Arrow Functions](https://mate-academy.github.io/style-guides/javascript.html#arrow-functions)
2.  [Classes](https://mate-academy.github.io/style-guides/javascript.html#classes--constructors)
3.  [Object Shorthand](https://mate-academy.github.io/style-guides/javascript.html#es6-object-shorthand)
4.  [Object Concise](https://mate-academy.github.io/style-guides/javascript.html#es6-object-concise)
5.  [Object Computed Properties](https://mate-academy.github.io/style-guides/javascript.html#es6-computed-properties)
6.  [Template Strings](https://mate-academy.github.io/style-guides/javascript.html#es6-template-literals)
7.  [Destructuring](https://mate-academy.github.io/style-guides/javascript.html#destructuring)
8.  [Default Parameters](https://mate-academy.github.io/style-guides/javascript.html#es6-default-parameters)
9.  [Rest](https://mate-academy.github.io/style-guides/javascript.html#es6-rest)
10.  [Array Spreads](https://mate-academy.github.io/style-guides/javascript.html#es6-array-spreads)
11.  [Let and Const](https://mate-academy.github.io/style-guides/javascript.html#references)
12.  [Exponentiation Operator](https://mate-academy.github.io/style-guides/javascript.html#es2016-properties--exponentiation-operator)
13.  [Iterators and Generators](https://mate-academy.github.io/style-guides/javascript.html#iterators-and-generators)
14.  [Modules](https://mate-academy.github.io/style-guides/javascript.html#modules)

  

#### 26.2 Do not use [TC39 proposals](https://github.com/tc39/proposals) that have not reached stage 3.

  

>❓Why? [They are not finalized](https://tc39.github.io/process-document/), and they are subject to change or to be withdrawn entirely. We want to use JavaScript, and proposals are not JavaScript yet.

  

27\. Standard Library
---------------------

The [Standard Library](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects) contains utilities that are functionally broken but remain for legacy reasons.

  

#### 27.1. Use `Number.isNaN` instead of global `isNaN`.

eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

  

>❓Why? The global `isNaN` coerces non-numbers to numbers, returning true for anything that coerces to NaN. If this behavior is desired, make it explicit.

  

```javascript
// ❌ bad
isNaN('1.2'); // false
isNaN('1.2.3'); // true

// ✅ good
Number.isNaN('1.2.3'); // false
Number.isNaN(Number('1.2.3')); // true
```

  

#### 27.2. Use `Number.isFinite` instead of global `isFinite`.

eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

  

>❓Why? The global `isFinite` coerces non-numbers to numbers, returning true for anything that coerces to a finite number. If this behavior is desired, make it explicit.

  

```javascript
// ❌ bad
isFinite('2e3'); // true

// ✅ good
Number.isFinite('2e3'); // false
Number.isFinite(parseInt('2e3', 10)); // true
```

  

28\. Testing
------------

#### 28.1. **Yup.**

  

#### 28.2. **No, but seriously**:

*   Whichever testing framework you use, you should be writing tests!
*   Strive to write many small pure functions, and minimize where mutations occur.
*   Be cautious about stubs and mocks - they can make your tests more brittle.
*   We primarily use [`mocha`](https://www.npmjs.com/package/mocha) and [`jest`](https://www.npmjs.com/package/jest) at Mate academy
*   100% test coverage is a good goal to strive for, even if it’s not always practical to reach it.
*   Whenever you fix a bug, _write a regression test_. A bug fixed without a regression test is almost certainly going to break again in the future.

  

Performance
-----------

*   [On Layout & Web Performance](https://www.kellegous.com/j/2013/01/26/layout-performance/)
*   [String vs Array Concat](https://jsperf.com/string-vs-array-concat/2)
*   [Try/Catch Cost In a Loop](https://jsperf.com/try-catch-in-loop-cost)
*   [Bang Function](https://jsperf.com/bang-function)
*   [innerHTML vs textContent for script text](https://jsperf.com/innerhtml-vs-textcontent-for-script-text)
*   [Long String Concatenation](https://jsperf.com/ya-string-concat)
*   [Are Javascript functions like](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta) [`map()`](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta)[,](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta) [`reduce()`](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta)[, and](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta) [`filter()`](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta) [optimized for traversing arrays?](https://www.quora.com/JavaScript-programming-language-Are-Javascript-functions-like-map-reduce-and-filter-already-optimized-for-traversing-array/answer/Quildreen-Motta)

  

Resources
---------

#### **Learning ES6+**

*   [Latest ECMA spec](https://tc39.github.io/ecma262/)
*   [ExploringJS](http://exploringjs.com/)
*   [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)
*   [Comprehensive Overview of ES6 Features](http://es6-features.org/)

#### **Read This**

*   [Standard ECMA-262](http://www.ecma-international.org/ecma-262/6.0/index.html)

#### **Tools**

*   Code Style Linters
    *   [ESlint](https://eslint.org/) - [Mate academy .eslintrc](https://github.com/mate-academy/fed/tree/master/eslint-config-internal)

#### **Other Style Guides**

*   [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
*   [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)
*   [StandardJS](https://standardjs.com/)

#### **Other Styles**

*   [Naming this in nested functions](https://gist.github.com/cjohansen/4135065) - Christian Johansen
*   [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen
*   [Popular JavaScript Coding Conventions on GitHub](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun
*   [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

#### **Further Reading**

*   [Understanding JavaScript Closures](https://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/) - Angus Croll
*   [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) - Dr. Axel Rauschmayer
*   [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Zack Bloom & Adam Schwartz
*   [ES6 Features](https://github.com/lukehoban/es6features) - Luke Hoban
*   [Frontend Guidelines](https://github.com/bendc/frontend-guidelines) - Benjamin De Cock

#### **Books**

*   [JavaScript: The Good Parts](https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford
*   [JavaScript Patterns](https://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752) - Stoyan Stefanov
*   [Pro JavaScript Design Patterns](https://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X) - Ross Harmes and Dustin Diaz
*   [High Performance Web Sites: Essential Knowledge for Front-End Engineers](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309) - Steve Souders
*   [Maintainable JavaScript](https://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680) - Nicholas C. Zakas
*   [JavaScript Web Applications](https://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X) - Alex MacCaw
*   [Pro JavaScript Techniques](https://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273) - John Resig
*   [Smashing Node.js: JavaScript Everywhere](https://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595) - Guillermo Rauch
*   [Secrets of the JavaScript Ninja](https://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X) - John Resig and Bear Bibeault
*   [Human JavaScript](http://humanjavascript.com/) - Henrik Joreteg
*   [Superhero.js](http://superherojs.com/) - Kim Joar Bekkelund, Mads Mobæk, & Olav Bjorkoy
*   [JSBooks](http://jsbooks.revolunet.com/) - Julien Bouquillon
*   [Third Party JavaScript](https://www.manning.com/books/third-party-javascript) - Ben Vinegar and Anton Kovalyov
*   [Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript](http://amzn.com/0321812182) - David Herman
*   [Eloquent JavaScript](http://eloquentjavascript.net/) - Marijn Haverbeke
*   [You Don’t Know JS: ES6 & Beyond](http://shop.oreilly.com/product/0636920033769.do) - Kyle Simpson

#### **Blogs**

*   [JavaScript Weekly](http://javascriptweekly.com/)
*   [JavaScript, JavaScript…](https://javascriptweblog.wordpress.com/)
*   [Bocoup Weblog](https://bocoup.com/weblog)
*   [Adequately Good](http://www.adequatelygood.com/)
*   [NCZOnline](https://www.nczonline.net/)
*   [Perfection Kills](http://perfectionkills.com/)
*   [Ben Alman](http://benalman.com/)
*   [Dmitry Baranovskiy](http://dmitry.baranovskiy.com/)
*   [nettuts](http://code.tutsplus.com/?s=javascript)

#### **Podcasts**

*   [JavaScript Air](https://javascriptair.com/)
*   [JavaScript Jabber](https://devchat.tv/js-jabber/)
