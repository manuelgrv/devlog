---
title: Testing this devlog's markdown parser
date: 2025-02-28
cover: cover.png
tags:
  - next.js
  - web-dev
featured: false
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<!-- sep -->

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

##### Unordered list

- Item
- Item
- Item

##### Ordered list

1. Item
2. Item
3. Item

##### To Do list

- [x] Item
- [ ] Item
- [ ] Item

##### Code Examples

`this_is_inline_code = () => {return("A")}`

```rust
fn print_line(input: &str){
    println!("{:?}", &str);
}
```

```python
def print_line(input):
    print(input)
```

```js
function printLine(input) {
  console.log(input);
}
```

```cpp
void printLine(input) {
    cout << input
}
```

##### Math Example

Inline math: $a=b$

$$\text{this is math } \cfrac{a}{b}$$

##### Video Plugin

::yt[keychron keyboard]{#hXohJwatIpA}

##### Admonitions

:::admonition{type="warning" title="This is a warning"}
Admonition content.
:::

:::admonition{type="tip" title="this is a tip"}
Admonition content
:::

:::admonition{type="caution" title="This is a question"}
This is kind of a long text to include in the admonition block and see how multiple lines could get wrapped.
:::

:::admonition{type="important" title="This is a question"}
This is kind of a long text to include in the admonition block and see how multiple lines could get wrapped.
:::

:::admonition{type="note" title="This is a question"}
This is kind of a long text to include in the admonition block and see how multiple lines could get wrapped.
:::

:::admonition{type="question" title="This is a question"}
This is kind of a long text to include in the admonition block and see how multiple lines could get wrapped.
:::

##### Image Plugin

![test cover](cover.jpg)

##### Table Example

| Item         | Price | # In stock |
| ------------ | :---: | ---------: |
| Juicy Apples | 1.99  |        739 |
| Bananas      | 1.89  |          6 |
