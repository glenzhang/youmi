/// <reference path="../youmi.js" />
/// <reference path="../widget.js" />
/// @import youmi.js, widget.js, zepto.js

// 192.168.100.40 -> http://ued.51fanli.com/
// demo: http://ued.51fanli.com/fesky/css3toggle/demo.html

Youmi.UI.define("Css3Toggle", {
  
  init: function() {
    // toggle's direction, "up", "down", "left", "right"
    this.direction = "up";
    this.effect = "all .3s ease-in-out";
    this.$toggleEle = "";
  },

  setup: function() {
    if (this.$toggleEle.length == 0) {
      return;
    }

    this.transitionCssProp = "-webkit-transition";
    this.transformCssProp = "-webkit-transform";
    this.translateX = "translateX";
    this.translateY = "translateY";
    this.translateX0 = "translateX(0)";
    this.translateX100 = "translateX(100%)";
    this.translateX_100 = "translateX(-100%)";
    this.translateY0 = "translateY(0)";
    this.translateY100 = "translateY(100%)";
    this.translateY_100 = "translateY(-100%)";

    this.$toggleEle.css(this.transitionCssProp, this.effect).css({
      position: "fixed",
      zIndex: 99
    });

    this["_{0}_init".format(this.direction)]();
  },

  _up_init: function() {
    return this.$toggleEle.css("bottom", "0").css(this.transformCssProp, this.translateY100);
  },

  _up_activate: function() {
    this.$toggleEle.css(this.transformCssProp, this.translateY0);
  },

  _down_init: function() {
    return this.$toggleEle.css("top", "0").css(this.transformCssProp, this.translateY_100);
  },

  _down_activate: function() {
    this.$toggleEle.css(this.transformCssProp, this.translateY0);
  },

  _left_init: function() {
    return this.$toggleEle.css("left", "0").css(this.transformCssProp, this.translateX_100);
  },

  _left_activate: function() {
    this.$toggleEle.css(this.transformCssProp, this.translateX0);
  },

  _right_init: function() {
    return this.$toggleEle.css("right", "0").css(this.transformCssProp, this.translateX100);
  },

  _right_activate: function() {
    this.$toggleEle.css(this.transformCssProp, this.translateX0);
  },

  activate: function() {
    this.$toggleEle.show();
    setTimeout(this.proxy(function() {
      this["_{0}_activate".format(this.direction)]();
    }), 0);
  },

  deactivate: function() {
    this["_{0}_init".format(this.direction)]();
    setTimeout(this.proxy(function() {
      this.$toggleEle.hide();
    }), 350);
  }
});