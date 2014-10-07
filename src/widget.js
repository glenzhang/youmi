/**
 * used to create ur own UI framework
 */

///<reference path="youmi.js" />

(function() {

    Youmi.UI.Base = new Youmi.Class();

    Youmi.UI.Base.include({

        eventNamespace: "YM",

        bindEventElement: [],

        destory: function() {
            for (var i = 0, ee = this.bindEventElement, len = ee.length; i < len; ++i) {
                ee[i].off && ee[i].off("." + this.eventNamespace);
            }
        }
    });

    Youmi.UI.prop("define", function(name, protypes, superclass) {
        if (typeof superClass != "function") {
            superclass = this.Base;
        }

        protypes = protypes || {};

        // window[name] = new Youmi.Class(superclass);
        // window[name].include(protypes);

        // syntactic sugar
        Youmi.UI.prop(name, new Youmi.Class(superclass), true).include(protypes);
    });

}(Youmi.namespace("Youmi.UI")));