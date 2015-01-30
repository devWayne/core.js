var core = (function() {
    var _array = [];
    var $ = function(selector, context) {
        return init(selector, context)
    };


    function init(selector, context) {
        var dom;
        //selector = selector.trim();
        if (!context) context = document;
        if (!selector) return {};
        if ($.isArray(selector)) dom = selector;
        if ($.isFunction(selector)) {
            return $.ready(selector);
        }
        if (dom == undefined) {
            dom = getDom(context, selector);
        }
        dom.__proto__ =$.fn; 
        return dom;
    };

    /**
     * Simple selector
     * @param {varType} elem Description
     * @param {varType} selector Description
     * @return {void} description
     */
    function getDom(elem, selector) {
        var isId = selector[0] == "#",isClass = selector[0] == ".";
        var selector_name = isId || isClass ? selector.slice(1) : selector,
	 singleQueryFlag =  /^[\w-]*$/.test(selector_name)
        if (isId && singleQueryFlag)return [elem.getElementById(selector_name)];
	else if (isClass && singleQueryFlag)return elem.getElementsByClassName(selector_name);
 	else return elem.querySelectorAll(selector_name);
    };
    
    /**
     * Assign Objects
     * @param {Object} destination Description
     * @param {Object} source Description
     * @param {boolean} override Description
     * @return {Object} description
     */
    $.extend = function(destination, source, override) {
        if (override === undefined) {
            override = true;
        }
        for (key in source) {
            if (override || !(key in destination)) destination[key] = source[key];
        }
        return destination;
    };
    $.isNode = function(obj) {
        return !!(obj && obj.nodeType);
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
    $.isFunction = function(obj) {
        return obj != null && typeof(obj) == "function"
    };
    $.isWindow = function(obj) {
        return obj !== null && obj == obj.window
    };
    $.isDocument = function(obj) {
        return obj !== null && obj.nodeType == obj.DOCUMENT_NODE
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

    $.fn =  $.extend({

        each: function(callback) {
            _array.every.call(this, function(el, idx) {
                return callback.call(el, idx, el) !== false
            })
            return this
        },

        remove: function() {
            return this.each(function() {
                if (this.parentNode != null) {
                    this.parentNode.removeChild(this)
                }
            })
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ''
            })
        },
        eq: function(idx) {
            return idx === -1 ? this.slice(-1) : this.slice(idx, idx + 1);
        },
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
            return this.css('display', 'block');
        },

        /**
         * Hide node
         * @return {void} description
         */
        hide: function() {
            return this.css("display", "none")
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
        }


    });



    return $;
})();
this.$ === undefined && (this.$ = core)
