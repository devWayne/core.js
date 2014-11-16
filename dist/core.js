var core = (function() {
    var _array = [];
    var $ = function(selector, context) {
        return init(selector, context)
    };


    function init(selector, context) {
        var dom;
        selector = selector.trim();
        if (!context) context = document;
        if (!selector) return {};
        if ($.isArray(selector)) dom = selector;
        if ($.isFunction(selector)) {
            return $.ready(selector);
        }
        if (dom == undefined) {
            dom = getdom(context, selector);
        }
        dom.__proto__ = $.fn;
        return dom;
    };

    function getdom(elem, selector) {
        var isId = selector[0] == "#",
            isClass = selector[0] == ".",
            selector_name = isId || isClass ? selector.slice(1) : selector;
        if (isId) {
            return [elem.getElementById(selector_name)];
        }
        if (isClass) {
            return elem.getElementsByClassName(selector_name);
        } else {
            return elem.getElementsByTagName(selector_name);
        }
    };

    $.fn = {

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
        }


    };

    /**
     * Concat two Object
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


    return $;
})();

window.$ === undefined && (window.$ = core)

;(function($) {
    function createXHR() {
        var xhr = false;
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP"); //ie msxml3.0+
        } catch (e1) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP"); //ie msxml 2.6
            } catch (e2) {
                xhr = false;
            }
        }
        if (!xhr && typeof XMLHttpRequest != 'undefined') { //firefox opera 8.0 safari
            xhr = new XMLHttpRequest();
        }
        return xhr;
    };

    $.ajax = function(option) {
        option.type = (option.type || 'GET').toUpperCase()
        var xhr = createXHR();
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader("Content-Type", option.contentType || "application/x-www-form-urlencoded");
        if (option.type === 'POST') {
            xhr.send(option.data || null);
        } else {
            xhr.send(null);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                option.success && $.isFunction(option.success) && option.success(xhr.responseText)
            }
        }
    };
})(core)

;(function($){

   /**
    * Event function collection
    */
    $.event = {

	   /**
	    * @param {varType} elem Description
	    * @param {varType} type Description
	    * @param {varType} callback Description
	    * @return {void} description
	    */
	    add:function(elem,type,callback){
		if(elem.addEventListener){
		elem.addEventListener(type,callback,false);	
		}	     	
		else{
		elem.attchEvent(type,callback);	
		}
	    },
	    remove:function(){
	  
	    }
    };
})(core);
