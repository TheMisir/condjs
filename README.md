[![Build Status](https://travis-ci.com/TheMisir/condjs.svg?branch=master)](https://travis-ci.com/TheMisir/condjs)
[![npm](https://img.shields.io/npm/dm/condjs)](https://www.npmjs.com/package/condjs)

## Installation

Install the package using npm.
```bash
npm install condjs
```
*or use Yarn*
```bash
yarn add condjs
```

## Usage

```js
const Condition = require('condjs');

var willBeFalse = Condition.with(true).and(false).value;
var willBeTrue = Condition.with(false).or(true).value;
```

## Methods

`.and(condition)`\
`.or(condition)` - Logicial `&&` (and) and `||` (or) operations

`.set(condition)` - Sets current value (`.or(...).value`) to given condition's value

> **What is condition?**\
> Condition is a boolean or function that accepts a new `Condition` instance as a argument.
>
> `Condition.with(true).and(true).or(c => c.and(true).or(false)).value` equals to `true && true || (true || false)`.

`.then(action, ...args)` - Action will be called with given args if the condition value is **true**

`.else(action, ...args)` - Action will be called with given args if the condition value is **false**

## Example

```js
Condition.with(true)
    .and(coupon.isActive)
    .and(function (c) {
        c.or(coupon.limitDate === null)
         .or(coupon.limitDate > new Date())
    })
    .and(function (c) {
        c.or(coupon.limitMinPrice === null)
         .or(price >= coupon.limitMinPrice);
    })
    .then(function () {
        alert('Coupon applied')
    })
    .else(function () {
        alert('Coupon not available')
    });
```