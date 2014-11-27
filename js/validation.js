/**
 * 嗅探模块
 * @import youmi.js,utility.js, regs.js
 */
/// <reference path="youmi.js" />
/// <reference path="utility.js" />
/// <reference path="regs.js" />

Youmi.Utility.prop("Validation", (function () {

    "use strict";

    function _isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]"
        }
    }

    function _isIe() {
        return /*@cc_on !@*/ false;
    }

    function _isIe6() {
        return !-[1, ] && !window.XMLHttpRequest;
    }

    function _regValid(reg, val) {
        reg = Youmi.Utility.Regs[reg];
        reg.lastIndex = 0;
        return reg.test(val);
    }

    return {
        isIe: _isIe,
        isIe6: _isIe6,
        isObject: _isType("Object"),
        isString: _isType("String"),
        isArray: Array.isArray || _isType("Array"),
        isFunction: _isType("Function"),
        isEmail: function (email) { return _regValid("email", email); },
        isUrl: function (url) { return _regValid("url", url); },
        isCellphone: function (cellphone) { return _regValid("cellphone", cellphone); },
        isBlank: function (str) { return _regValid("blank", str); }
    }
}()));