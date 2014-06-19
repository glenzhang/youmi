/**
* used to create ur own UI framework
*/

///<reference path="youmi.js" />

; (function () {

    Youmi.UI.Base = new Youmi.Class();

    Youmi.UI.prop("define", function (name, protypes, superclass) {
        if (typeof superClass != "function") {
            superclass = this.Base;
        }

        protypes = protypes || {};

        window[name] = new Youmi.Class(superclass);
        window[name].include(protypes);
    });

}(Youmi.namespace("Youmi.UI")));