/**
 * 观察者-订阅发布模式 通用发布者
 * @import youmi.js
 */
///<reference path="youmi.js" />
(function() {
    Youmi.DP = (function() {
        
        var publisher = {
            subscribers: {
                any: []
            },

            subscribe: function(fn, type) {
                type = type || "any";

                if (typeof this.subscribers[type] === "undefined") {
                    this.subscribers[type] = [];
                }

                this.subscribers[type].push(fn);
            },

            unsubscribe: function(fn, type) {
                this.visitSubscribers("unsubscribe", fn, type);
            },

            publish: function(publication, type) {
                this.visitSubscribers("publish", publication, type);
            },

            visitSubscribers: function(action, arg, type) {
                var pubtype = type || "any";
                var subscribers = this.subscribers[pubtype];
                var len = subscribers.length;

                for (var i = 0; i < len; ++i) {
                    if (action == "publish") {
                        subscribers[i](arg);
                    } else {
                        if (subscribers[i] === arg) {
                            subscribers.splice(i, 1);
                        }
                    }
                }
            }
        };


        return {
            "makePublisher": function(o) {

                for (var i in publisher) {
                    if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                        o[i] = publisher[i]
                    }
                }

                o.subscribers = {
                    any: []
                };

                return o;
            }
        };

    }());

}());