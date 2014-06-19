/**
 * 库utility
 * @import youmi.js
 */
/// <reference path="youmi.js" />

Youmi.prop("Utility", (function () {

    "use strict";

    function _random(n) {
        var uid = Math.random().toString(16).substr(2, n);

        while (uid.length < n) {
            uid = Math.random().toString(16).substr(2, n);
        }
        return uid;
    }

    function _guid() {
        // reference https://github.com/maccman/book-assets/blob/master/ch03/guid.js
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    function _escapeRegExp(text) {
        return text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    function _escapeHTML(value) {
        return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    return {
        random: _random,
        guid: _guid,
        escapeRegExp: _escapeRegExp,
        escapeHTML: _escapeHTML,
        prop: Youmi.prop
    };

}()));


/*
(function () {
    Youmi.utility = (function () {

        "use strict";

        return {
            "random": function (n) {
                var uid = Math.random().toString(16).substr(2, n);

                while (uid.length < n) {
                    uid = Math.random().toString(16).substr(2, n);
                }
                return uid;
            },

            "guid": function () {
                // reference https://github.com/maccman/book-assets/blob/master/ch03/guid.js
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }).toUpperCase();
            },

            "escapeRegExp": function (text) {
                return text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            },

            "escapeHTML": function (value) {
                return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
        };

    }());

}(Youmi.namespace("Youmi.utility")));
*/