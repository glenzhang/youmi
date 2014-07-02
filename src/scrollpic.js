/// <reference path="youmi.js" />
/// <reference path="widget.js" />

Youmi.UI.define("ScrollPic", {
    init: function(id) {
        this.id = id || '';
        this.num = 0;
        this.moveNum = 1;
        this.unitNum = 0;
        this.index = 1;
        this.pages = 0;
        this.page = 1;
        this.dotId = null;
        this.dotClass = 'dot_list';
        this.dotClassOn = 'current';
        this.dotEvent = 'click';
        this.speed = 15;
        this.time = this.speed / 30 + 's';
        this.vertical = false;
        this.autoPlay = true;
        this.playTime = 5000;
        this.isLoop = true;
        this.scrollType = 'scrollLeft';
        this.width = null;
        this.isIE = !+'\v1'; //ie8及以下
        this.timer = null;
        this.transition = this.getCSSName('transition');
        this.transform = this.getCSSName('transform');
        this.scrollState = false;
        this.boxSize = 0;
        this.isTouch = typeof window.ontouchstart !== 'undefined';
        if (this.isTouch) {
            this.touchInitPos = 0;
            this.startPos = 0;
            this.totalDist = 0, this.deltaX1 = 0;
            this.deltaX2 = 0
        }
    },

    setup: function() {
        if (!this.id) {
            throw new Error("必须指定滚动的容器Id.");
            return
        }
        this.o = this.$(this.id);
        this.o.style.overflow = 'hidden';
        this.boxSize = this.vertical ? this.o.clientHeight : this.o.clientWidth;
        var self = this,
            items = [],
            lists = this.o.childNodes;
        for (var i = 0, l = lists.length; i < l; i++) {
            if (lists[i].nodeType == 1) {
                this.num++;
                items.push(lists[i]);
                if (!this.vertical) {
                    this.isIE ? lists[i].style.styleFloat = 'left' : lists[i].style.cssFloat = 'left'
                }
            }
        }
        if (this.num < 2 * this.moveNum) return;
        this.num = Math.ceil(this.num / this.moveNum);
        if (this.vertical) {
            var width = parseInt(this.getStyle(items[0], 'marginTop')) + parseInt(this.getStyle(items[0], 'marginBottom'));
            width = width ? width : 0;
            width += items[0].offsetHeight
        } else {
            var width = parseInt(this.getStyle(items[0], 'marginLeft')) + parseInt(this.getStyle(items[0], 'marginRight'));
            width = width ? width : 0;
            width += items[0].offsetWidth
        }
        this.width = this.moveNum * width;
        if (this.o.clientWidth > this.width * this.num) return;
        this.unitNum = this.boxSize / this.width;
        this.pages = Math.ceil(this.num / this.unitNum);
        var dom = '',
            ctn = this.o.innerHTML;
        if (this.isLoop) {
            dom = '<div style="' + (this.vertical ? 'height' : 'width') + ':30000px;zoom:1;" id="' + this.id + 'wrap_box">  <div style="float:left;zoom:1;">' + ctn + '</div>   <div style="float:left;zoom:1;">' + ctn + '</div></div>'
        } else {
            dom = '<div style="' + (this.vertical ? 'height' : 'width') + ':30000px;zoom:1;" id="' + this.id + 'wrap_box">' + ctn + '</div>'
        }
        this.o.innerHTML = dom;

        function dotType(i) {
            var ret = '';
            if (self.dotType == 'number') {
                ret = i + 1
            } else if (self.dotType) {
                ret = self.dotType
            }
            return ret
        }
        if (this.dotId) {
            this.dot = this.$(this.dotId);
            var dot_html = '';
            for (var i = 0; i < this.pages; i++) {
                dot_html += '<span class="' + this.dotClass + '">' + dotType(i) + '</span>'
            }
            this.dot.innerHTML = dot_html;
            this.dots = this.dot.getElementsByTagName('span');
            this.dots[this.page - 1].className += ' ' + this.dotClassOn;
            for (var j = 0; j < this.pages; j++) {
                this.addEvent(this.dots[j], this.dotEvent, (function(j) {
                    return function() {
                        self.dotsMove(j)
                    }
                })(j))
            }
        }
        if (this.autoPlay) {
            clearInterval(this.playTimer);
            this.playTimer = setInterval(function() {
                self.next()
            }, this.playTime)
        }
        this.scrollType = this.vertical ? 'scrollTop' : 'scrollLeft';
        this.o[this.scrollType] = 0;
        this.box = this.$(this.id + 'wrap_box');
        if (this.isTouch) {
            this.box.style[this.transition] = 'all ' + this.time + ' ease-out';
            this.addEvent(this.box, 'touchstart', function(e) {
                self.touchstart(e)
            });
            this.addEvent(this.box, 'touchmove', function(e) {
                self.touchmove(e)
            });
            this.addEvent(this.box, 'touchend', function(e) {
                self.touchend(e)
            })
        }
        if (this.prevId) {
            this.btnPrev = this.$(this.prevId);
            this.addEvent(this.btnPrev, 'mousedown', function(e) {
                self.prev();
                if (e.preventDefault) {
                    e.preventDefault()
                };
                return false
            })
        }
        if (this.nextId) {
            this.btnNext = this.$(this.nextId);
            this.addEvent(this.btnNext, 'mousedown', function(e) {
                self.next();
                if (e.preventDefault) {
                    e.preventDefault()
                }
                return false
            });
        }
        this.addEvent(this.o, 'mouseover', function(e) {
            if (self.playTimer) {
                clearInterval(self.playTimer)
            }
        });
        this.addEvent(this.o, 'mouseout', function(e) {
            if (self.playTimer) {
                clearInterval(self.playTimer)
            };
            self.playTimer = setTimeout(function() {
                self.next()
            }, self.playTime)
        })
    },
    next: function() {
        var self = this;
        if (!this.isLoop && (this.index + this.unitNum > this.num)) {
            if (this.autoPlay && !window.event) {
                this.moveTo(1)
            }
            return
        }
        if (!this.transition) {
            if (this.index > this.num) {
                this.index = 1;
                this.o[this.scrollType] = 0
            }
        }
        this.moveTo(Math.floor(this.index) + 1)
    },
    prev: function() {
        var self = this;
        if (this.index == 1) {
            if (!this.isLoop) return;
            this.index += this.num;
            var x = this.num * this.width;
            if (this.transition) {
                var pos = self.vertical ? '0,-' + x + 'px' : '-' + x + 'px,0';
                this.box.style[this.transition] = 'width 0s ease-out';
                this.box.style[this.transform] = 'translate(' + pos + ')';
                setTimeout(function() {
                    var x = -(self.index - 2) * self.width + 'px';
                    self.box.style[self.transition] = 'all ' + self.time + ' ease-out';
                    var pos = self.vertical ? '0,' + x : x + ',0';
                    self.box.style[self.transform] = 'translate(' + pos + ')';
                    self.index--;
                    self.moveEnd()
                }, 20)
            } else {
                this.o[this.scrollType] = x;
                this.moveTo(this.index - 1)
            }
        } else {
            this.moveTo(Math.ceil(this.index) - 1)
        }
    },
    dotsMove: function(n) {
        if (!this.isLoop && (n + 1) * this.unitNum > this.num) {
            n = this.num - this.unitNum
        } else {
            n = n * this.unitNum
        }
        this.moveTo(n + 1)
    },
    moveTo: function(num) {
        var self = this;
        if (this.playTimer) {
            clearInterval(this.playTimer)
        }
        var page = num - 1;
        if (page >= this.num) {
            page = 0
        }
        if (page < 0) {
            page = this.num - 1
        }
        if (this.dotId && this.dots) {
            for (var i = 0; i < this.dots.length; i++) {
                this.dots[i].className = this.dots[i].className.replace(new RegExp(' ' + this.dotClassOn, 'gi'), '')
            }
            this.dots[page].className += ' ' + this.dotClassOn
        }
        if (this.transition) {
            if (this.index > this.num) {
                self.index = 1;
                num = self.index + 1;
                self.box.style[self.transition] = 'all 0s ease-out';
                self.box.style[self.transform] = 'translate(0,0)';
                setTimeout(function() {
                    var x = -(num - 1) * self.width + 'px';
                    var pos = self.vertical ? '0,' + x : x + ',0';
                    self.box.style[self.transition] = 'all ' + self.time + ' ease-out';
                    self.box.style[self.transform] = 'translate(' + pos + ')';
                    self.index = num;
                    self.moveEnd()
                }, 20)
            } else {
                var x = -(num - 1) * self.width + 'px';
                var pos = self.vertical ? '0,' + x : x + ',0';
                self.box.style[self.transition] = 'all ' + self.time + ' ease-out';
                self.box.style[self.transform] = 'translate(' + pos + ')';
                self.index = num;
                self.moveEnd()
            }
        } else {
            this.scrollState = true;
            if (num > this.index && this.o[this.scrollType] < (num - 1) * this.width) {
                var gap = Math.ceil(((num - 1) * this.width - this.o[this.scrollType]) / 5);
                this.o[this.scrollType] += gap;
                this.index = Math.floor(this.index) + 0.5
            } else if (num < this.index && this.o[this.scrollType] > (num - 1) * this.width) {
                var gap = Math.ceil((this.o[this.scrollType] - (num - 1) * this.width) / 5);
                this.o[this.scrollType] -= gap;
                this.index = Math.ceil(this.index) - 0.5
            } else {
                this.index = num;
                clearTimeout(this.timer);
                this.moveEnd();
                this.scrollState = false;
                return
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                self.moveTo(num)
            }, this.speed)
        }
    },
    touchstart: function(e) {
        if (e.touches.length !== 1) {
            return
        }
        if (this.isLoop) {
            if (this.index == 1) {
                this.index += this.num
            }
            if (this.index > this.num * 2 - 1) {
                this.index -= this.num
            }
            var x = -(this.index - 1) * this.width + 'px';
            this.box.style[this.transition] = 'width 0s ease-out';
            var pos = this.vertical ? '0,' + x : x + ',0';
            this.box.style[this.transform] = 'translate3d(' + pos + ',0)'
        }
        this.touchInitPos = this.vertical ? e.touches[0].pageY : e.touches[0].pageX;
        this.deltaX1 = this.touchInitPos;
        this.startPos = -(this.index - 1) * this.width
    },
    touchmove: function(e) {
        if (e.touches.length !== 1) {
            return
        }
        if (!this.isLoop && (this.index == 1 || this.index + this.unitNum > this.num) && Math.abs(this.deltaX2) > this.boxSize / 2) {
            e.preventDefault();
            return
        }
        var currentX = this.vertical ? e.touches[0].pageY : e.touches[0].pageX;
        this.deltaX2 = currentX - this.deltaX1;
        this.totalDist = this.startPos + currentX - this.touchInitPos;
        var pos = this.vertical ? '0,' + this.totalDist + 'px' : this.totalDist + 'px,0';
        this.box.style[this.transform] = 'translate3d(' + pos + ', 0)';
        this.startPos = this.totalDist;
        this.touchInitPos = currentX;
        e.preventDefault()
    },
    touchend: function(e) {
        if (this.deltaX2 < -30 && !(this.index + this.unitNum > this.num && !this.isLoop)) {
            this.next();
            this.deltaX2 = 0
        } else if (this.deltaX2 > 30 && !(this.index == 1 && !this.isLoop)) {
            this.prev();
            this.deltaX2 = 0
        } else {
            this.restore()
        }
    },
    restore: function() {
        this.totalDist = this.startPos = this.startPos - this.deltaX2;
        var pos = this.vertical ? '0,' + this.totalDist + 'px' : this.totalDist + 'px,0';
        this.box.style[this.transform] = 'translate3d(' + pos + ', 0)';
        this.deltaX2 = 0
    },
    moveEnd: function() {
        var self = this;
        if (this.autoPlay) {
            clearInterval(this.playTimer);
            this.playTimer = setInterval(function() {
                self.next()
            }, this.playTime)
        }
        if (this.index >= 2 * this.num) {
            this.index -= this.num
        }
        var page = Math.round((this.index - 1) * this.width / this.boxSize);
        if (this.index > this.num) {
            page = this.index % this.num - 1
        }
        if (this.dotId && this.dots) {
            this.dots[this.page - 1].className = this.dots[this.page - 1].className.replace(new RegExp(this.dotClassOn, 'gi'), '');
            this.dots[page].className += ' ' + this.dotClassOn
        }
        this.page = page + 1;
        if (typeof(this.onPageChange) === 'function') {
            this.onPageChange()
        }
    },
    $: function(o) {
        return document.getElementById(o)
    },
    getStyle: function(elm, style) {
        return elm.currentStyle ? elm.currentStyle[style] : document.defaultView.getComputedStyle(elm, null)[style]
    },
    getCSSName: function(name) {
        var cssName, parseEl = document.createElement('div');
        if (parseEl.style[name] !== undefined) {
            cssName = name
        } else {
            var a = ['Webkit', 'Moz'],
                name_t = name.substr(0, 1).toUpperCase() + name.substr(1);
            for (var i = 0; i < a.length; i++) {
                if (parseEl.style[(name = a[i] + name_t)] !== undefined) {
                    cssName = name;
                    break
                }
            }
        }
        return cssName;
    },
    addEvent: function(o, type, fn) {
        o.attachEvent ? o.attachEvent('on' + type, fn) : o.addEventListener(type, fn, false)
    }
});