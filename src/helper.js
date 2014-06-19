/**
* helper
*/

/**
* 字符串操作
*/
var StringBuilder = new Youmi.Class();
// var sb = new StringBuilder();
// sb.append("hello").append(" ").append("world!").toString();
// output "hello world!"
StringBuilder.inculde({
    init: function () {
        this.strings = [];
    },

    append: function (str) {
        this.strings.push(str);
        return this;
    },

    toString: function () {
        return this.strings.join("");
    }
});

/**
* 柯里化
function curry(fn) {
    var outerArgs = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments),
            finalArgs = outerArgs.concat(innerArgs);
        return fn.apply(null, finalArgs); //注意别漏了return  
    };
}
*/