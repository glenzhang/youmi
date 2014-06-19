var Youmi = window.Youmi || {
    namespace: function () {
        var a = arguments,
            o = null,
            i, j, d, rt;
        for (i = 0; i < a.length; ++i) {
            d = a[i].split(".");
            rt = d[0];

            if (typeof window[rt] == "undefined") {
                window[rt] = {
                    prop: function (k, v) {
                        if (!this[k]) {
                            this[k] = v;
                        }
                        return this;
                    }
                };
            }
            o = window[rt];
            for (j = 1; j < d.length; ++j) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
                o.prop = function (k, v) {
                    if (!this[k]) {
                        this[k] = v;
                    }
                    return this;
                };
            }
        }

        return o;
    },

    Class: function (parent) {
        var klass = function () {
            this.init.apply(this, arguments);
        };

        if (parent) {
            var subclass = function () { };
            subclass.prototype = parent.prototype;
            klass.prototype = new subclass();
        }

        klass.prototype.init = function () { };
        klass.fn = klass.prototype;
        klass.fn.parent = klass;

        // static method
        klass.extend = function (obj) {
            var extended = obj.extended;
            for (var i in obj) {
                klass[i] = obj[i];
            }

            if (extended) extended(klass);
        };

        // instance method
        klass.include = function (obj) {
            var included = obj.included;

            for (var i in obj) {
                klass.fn[i] = obj[i];
            }

            if (included) included(klass);
        };

        klass.proxy = function (func) {
            var self = this;

            return (function () {
                return func.apply(self, arguments);
            });
        };

        klass.fn.proxy = klass.proxy;

        return klass;
    },

    prop: function (k, v) {
        if (!this[k]) {
            this[k] = v;
        }
        return this;
    }
};