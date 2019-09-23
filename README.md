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

## APIs

|**Condition**|Arguments|Returns|Description|
|--|--|--|--|
|.and|`condition: boolean \| (c: Condition) => Condition`|`Condition`|Logicial `&&` (and) operator|
|.or|`condition: boolean \| (c: Condition) => Condition`|`Condition`|Logicial `||` (or) operator|
|.set|`value: boolean`|`Condition`|Sets curent value by given argument|
|.then|`action: (...args) => {}, ...args`|`Condition`|Executes `action` by given `...args` if the value is true|
|.else|`action: (...args) => {}, ...args`|`Condition`|Executes `action` by given `...args` if the value is false|
|.value|*This is property*|`boolean`|Returns condition value|

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
