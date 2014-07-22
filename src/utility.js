/**
 * 库utility
 * @import youmi.js
 */
/// <reference path="youmi.js" />

Youmi.prop("Utility", (function() {

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
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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


Youmi.Utility.prop("BowserDetect", (function() {
    // navigator.userAgent
    // [firefox] "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0"
    // [chrome]  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36"
    // [safari]  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"

    var ua = navigator.userAgent;
    var _IE = (function() {
        var v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );

        return v > 4 ? v : false;

    }());

    function _platform() {
        var pf = "";
        if (/linux/i.test(ua)) {
            pf = "linux";
        } else if (/macintosh|mac os x/i.test(ua)) {
            pf = "mac";
        } else if (/windows|win32/i.test(ua)) {
            pf = "windows";
        }

        return pf;
    }

    function _bname() {
        var bn = "";
        if (/firefox/i.test(ua)) {
            bn = "Firefox";
        } else if (/chrome/i.test(ua)) {
            bn = "Chrome";
        } else if (/safari/i.test(ua)) {
            bn = "Safari";
        } else if (/msie 10.0/i.test(ua)) {
            bn = "IE";
            this.bversion = 10;
        }

        return bn;
    }

    return {
        platform: _platform(),
        bname: _IE ? "IE" : _bname(),
        bversion: _IE ? _IE : (/msie 10.0/i.test(ua) ? 10 : "")
    };

}()));