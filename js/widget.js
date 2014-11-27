/**
 * used to create ur own UI framework
 */

///<reference path="youmi.js" />

(function() {

    Youmi.UI.Base = new Youmi.Class();

    Youmi.UI.Base.include({

        eventNamespace: ".YMEVENT",

        destroy: function() {
         
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