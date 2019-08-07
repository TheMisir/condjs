/**
 * @param {boolean} value Initial value
 */
function Condition(value) {
    this.value = value;
}

/**
 * @param {boolean} value Initial value
 */
Condition.with = function (value) {
    return new Condition(value);
}

Condition.value = function (condition) {
    if (typeof condition === 'function') {
        var child = new Condition();
        condition(child);
        return child.value;
    } else {
        return !(!(condition));
    }
}

/**
 * @param {boolean|((c: Condition) => any)} value Condition
 */
Condition.prototype.set = function (value) {
    this.value = Condition.value(value);
    return true;
}

/**
 * @param {boolean|((c: Condition) => any)} value Condition
 */
Condition.prototype.and = function (value) {
    if (this.value === undefined)
        this.value = true;
    this.value = this.value && Condition.value(value);
    return this;
}

/**
 * @param {boolean|((c: Condition) => any)} value Condition
 */
Condition.prototype.or = function (value) {
    if (this.value === undefined)
        this.value = false;
    this.value = this.value || Condition.value(value);
    return this;
}

Condition.prototype.promise = function () {
    return this.value ? Promise.resolve() : Promise.reject();
}

/**
 * @param {function} action
 */
Condition.prototype.then = function (action, ...args) {
    if (this.value) {
        action.apply(undefined, args);
    }
    return this;
}

/**
 * @param {function} action
 */
Condition.prototype.else = function (action, ...args) {
    if (!this.value) {
        action.apply(undefined, ...args);
    }
    return this;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = Condition;
}