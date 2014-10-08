/**
 * used to create ur own UI framework
 */

///<reference path="youmi.js" />

(function() {

    Youmi.UI.Base = new Youmi.Class();

    Youmi.UI.Base.include({

        eventElementsArr: [],

        eventNamespace: ".FMUEVENT",

        destory: function() {
            // 遍历有事件的元素，然后off掉事件，释放内存
            for (var i = 0, cachedElementsArr = this.eventElementsArr, len = cachedElementsArr.length; i < len; ++i) {
                var currentItem = cachedElementsArr[i];
                if (currentItem.off || (typeof jQuery !== "undefined" && currentItem instanceof jQuery)) {
                    currentItem.off(this.eventNameSpace);
                }
            }
        }
    });

    Youmi.UI.prop("define", function(name, protypes, superclass) {
        if (typeof superClass != "function") {
            superclass = this.Base;
        }

        protypes = protypes || {};

        // syntactic sugar
        Youmi.UI.prop(name, new Youmi.Class(superclass), true).include(protypes);
    });

}(Youmi.namespace("Youmi.UI")));