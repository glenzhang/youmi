Function.prototype.method = function(name, fn) {
    if (typeof this.prototype[name] == "undefined") this.prototype[name] = fn;
};

!String.prototype.trim && String.method("trim", function() {
    // " hello world! ".trim() -> "hello world!"
    return this.replace(/^\s+|\s+$/g, '');
});

!Function.prototype.bind && Function.method("bind", function(oThis) {
    if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
});

String.method("format", function() {
    //"welcome to {0}, {1}!".format("Youmi", "dude") -> welcome to Youmi, dude!
    for (var s = this, i = 0; i < arguments.length; ++i) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
    return s;
});

String.method("setCookie", function(value, expiryDays, domain, path, secure) {
    // "cookiename".setCookie('1', '365', ".Youmi.com", '/');
    var builder = [this, "=", escape(value)];

    if (expiryDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expiryDays * 86400000));
        builder.push(";expires=");
        builder.push(date.toUTCString());
    }
    if (domain) {
        builder.push(";domain=");
        builder.push(domain);
    }
    if (path) {
        builder.push(";path=");
        builder.push(path);
    }
    if (secure) {
        builder.push(";secure");
    }

    document.cookie = builder.join("");
});

String.method("getCookie", function() {
    // "cookiename".getCookie();
    var re = new RegExp('\\b' + this + '\\s*=\\s*([^;]*)', 'i');
    var match = re.exec(document.cookie);
    return (match && match.length > 1 ? unescape(match[1]) : '');
});

String.method("delCookie", function(domain, path) {
    // "cookiename".delCookie(".51Youmi.com", '/');
    document.cookie = this + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (domain ? "; domain=" + domain : "") +
        (path ? "; path=" + path : "");
});

;(function() {
    // debug
    if (!window.console) {
        console = {
            log: function() {},
            dir: function() {},
            error: function() {}
        };
    }
}());