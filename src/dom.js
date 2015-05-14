;
var core = (function() {
    var _array = [];
    var $ = function(selector, context) {
        return init(selector, context)
    };


    function init(selector, context) {
        var dom, elementTypes = [1, 9, 11];
        //selector = selector.trim();
        if (!context) context = document;
        if (!selector) return {};
        else if ($.isFunction(selector)) {
            return $.ready(selector);
        } else {
            if ($.isArray(selector)) dom = selector;
            //ELemets or HTMLCollection
            if (elementTypes.indexOf(selector.nodeType) >= 0) dom = selector;
            if (/^\[object (HTMLCollection|NodeList)\]$/.test(Object.prototype.toString.call(selector)) &&
                selector.hasOwnProperty('length')) dom = selector;
            if (dom == undefined) {
                dom = getDom(context, selector);
            }
        }
        dom.__proto__ = $.fn;
        return dom;
    };

    /**
     * Selector
     * @param {varType} elem Description
     * @param {varType} selector Description
     * @return {void} description
     */
    function getDom(elem, selector) {
        var isId = selector[0] == "#",
            isClass = selector[0] == ".";
        var selector_name = isId || isClass ? selector.slice(1) : selector,
            singleQueryFlag = /^[\w-]*$/.test(selector_name)
        if (isId && singleQueryFlag) return [elem.getElementById(selector_name)];
        else if (isClass && singleQueryFlag) return elem.getElementsByClassName(selector_name);
        else return elem.querySelectorAll(selector_name);
    };


    //Utils functions	

    /**
     * Assign Objects
     * @param {Object} destination Description
     * @param {Object} source Description
     * @param {boolean} override Description
     * @return {Object} description
     */
    $.extend = function(destination, source, override) {
        override = override ? override : true;
        for (var key in source) {
            if (override || !(key in destination)) destination[key] = source[key];
        }
        return destination;
    };
    $.isNode = function(obj) {
        return !!(obj && obj.nodeType);
    };
    $.isDocument = function(obj) {
        return obj !== null && obj.nodeType == obj.DOCUMENT_NODE
    };
    $.isFunction = function(obj) {
        return obj != null && typeof(obj) == "function"
    };
    $.isWindow = function(obj) {
        return obj !== null && obj == obj.window
    };

    $.isArray = Array.isArray ||
        function(object) {
            return object instanceof Array
        };
    $.ready = function(callback) {
        document.addEventListener('DOMContentLoaded', function() {
            callback($)
        }, false)
    };
    $.cookie = function(key, value, time) {
        if (value == undefined && time == undefined) {
            var cookieArr = document.cookie.split('; ');
            for (var i = 0; i < cookieArr.length; i++) {
                var _cookie = cookieArr[i].split('=');
                if (key == _cookie[0]) return decodeURI(_cookie[1]);
            }
            return "";
        } else {
            var str = key + "=" + encodeURI(value);
            if (time > 0) {
                var date = new Date();
                var ms = time * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toUTCString();
            }
        }
        document.cookie = str;
    };

    //prototype

    $.fn = $.extend({
        forEach: _array.forEach,
        map: _array.map,
        filter: _array.filter,

        //HTML/Text/Value
        text: function(text) {
            return 0 in arguments ? (this.forEach(function(el) {
                el.textContent = text
            })) : this[0].textContent;
        },

        html: function(html) {
            return 0 in arguments ? (this.forEach(function(el) {
                el.innerHTML = html
            })) : this[0].innerHTML;
        },

        val: function(val) {
            return 0 in arguments ? (this.forEach(function(el) {
                el.value = val
            })) : this[0].value;
        },

        //Class and Attributes
        attr: function(name, value) {
            if (arguments.length < 2) {
                return name ? this[0].getAttribute(name) : false;
            } else {
                return this.forEach(function(el) {
                    el.setAttribute(name, value);
                })
            }
        },

        removeAttr: function(name) {
            return name ? (this.nodeType == 1 && this[0].setAttribute(name, '')) : false;
        },

        hasClass: function(cName) {
            return cName ? _array.some.call(this, function(el) {
                return !(new RegExp('(^|\\s)' + name + '(\\s|$)').test(el.className));
            }) : false;
        },

        addClass: function() {
            return this.forEach(function(el) {
                el.classList.add("anotherclass")
            });
        },
        removeClass: function() {
            return this.forEach(function(el) {
                el.classList.remove("anotherclass")
            });
        },
        toggleClass: function() {
            return this.forEach(function(el) {
                el.classList.toggle("anotherclass")
            });
        },

        //css和效果
        css: function(elem, value) {
            if (arguments.length < 2) {
                var result = this[0].getComputedStyle(elem, '');
                return result;
            } else {
                if (elem && typeof(value) == 'string') {
                    var css = elem + ":" + value;
                    return this.each(function() {
                        this.style.cssText += ';' + css
                    })
                }
            }
        },

        /**
         * Show node
         * @return {void} description
         */
        show: function() {
            return this.forEach(function(el) {
                el.css("display", "block")
            })

        },

        /**
         * Hide node
         * @return {void} description
         */
        hide: function() {
            return this.forEach(function(el) {
                el.css("display", "none")
            })
        },

        //尺寸位置

        /**
         * Get offset
         * @return {void} description
         */
        offset: function() {
            if (this.length == 0) return null;
            var obj = this[0].getBoundingClientRect();
            return {
                left: obj.left + window.pageXOffset,
                top: obj.top + window.pageYOffset,
                width: obj.width,
                height: obj.height
            };
        },

        //Node Manipulation

        eq: function(idx) {
            return idx === -1 ? _array.slice.call(this, -1) : _array.slice.call(this, idx, idx + 1);
        },

        get: function(idx) {
            return index === undefined ? _array.slice.call(this) : this[index >= 0 ? index : index + this.length];
        },

        empty: function() {
            return this.forEach(function(el) {
                el.innerHTML = ''
            })
        },
        /**
         * Remove node
         * @return {void}
         */
        remove: function() {
            return this.each(function() {
                if (this.parentNode != null)
                    this.parentNode.removeChild(this);
            })
        },

        find: function() {

        },

        children: function(selector) {
            var els = _array.filter.call(this.pluck('children'), function(els) {
                return els && els.nodeType == 1
            });
            return $(els);
        },

        parent: function() {
            var els = _array.filter.call(this.pluck('parentNode'), function(els) {
                return els && els.nodeType == 1
            });
            return $(els);
        },

        parents: function() {},

        prev: function() {
            var els = _array.filter.call(this.pluck('previousElementSibling'), function(els) {
                return els && els.nodeType == 1
            });
            return $(els);

        },

        next: function() {
            var els = _array.filter.call(this.pluck('nextElementSibling'), function(els) {
                return els && els.nodeType == 1
            });
            return $(els);
        },

        siblings: function() {
            var els = _array.filter.call(this.pluck('parentNode').children, function(els) {
                return els && els.nodeType == 1
            });
            return $(els);
        },


        pluck: function(property) {
            return this[0][property];
        }

    });


    ['after', 'prepend', 'before', 'append'].forEach(function(operator, operatorIndex) {
        var inside = operatorIndex % 2;
        $.fn[operator] = function(node) {
            return this.each(function(target) {
                parent = inside ? target : target.parentNode
                target = operatorIndex == 0 ? target.nextSibling :
                    operatorIndex == 1 ? target.firstChild :
                    operatorIndex == 2 ? target : null;
                parent.insertBefore(node, target);
            });
        }
    });

    ['width', 'height'].forEach(function(operator, operatorIndex) {
        $.fn[operator] = function(value) {
            var el = this[0];
            if (arguments.length == 0) return $.isWindow(el) ? el['inner' + operator] : $.isDocument(el) ? el.documentElement['scroll' + operator] : (offset = this.offset()) && offset[operator];
            else return this.each(function(v) {
                v.css(operator, value);
            })
        }
    });

    return $;
})();
this.$ === undefined && (this.$ = core)
