;
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
        forEach: function(callback) {
            _array.forEach.call(this,callback);
        },

	map:function(callback){
	    _array.map.call(this,callback);
	},
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

        width: function() {
            var obj = this[0].getBoundingClientRect();
            return obj.width;
        },

        height: function() {
            var obj = this[0].getBoundingClientRect();
            return obj.height;
        },

        //Node Manipulation

        eq: function(idx) {
            return idx === -1 ? this.slice(-1) : this.slice(idx, idx + 1);
        },

        get: function() {
	    return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
	},

        empty: function() {
            return this.each(function() {
                this.innerHTML = ''
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
	pluck:function(){
	
	}



    });

     /*['after', 'prepend', 'before', 'append'].forEach(function(operator, operatorIndex) {
        $.fn[operator] = function() {

        }
    })

    ['after', 'prepend', 'before', 'append'].forEach(function(operator, operatorIndex) {
        var inside = operatorIndex % 2;
        JSLite.fn[operator] = function() {
            var argType, nodes = JSLite.map(arguments, function(arg) {
                    argType = JSLite.type(arg)
                    if (argType == "Function") arg = funcArg(this, arg)
                    return argType == "Object" || argType == "Array" || arg == null ? arg : P.fragment(arg)
                }),
                parent, script, copyByClone = this.length > 1
            if (nodes.length < 1) return this
            return this.each(function(_, target) {
                parent = inside ? target : target.parentNode
                target = operatorIndex == 0 ? target.nextSibling :
                    operatorIndex == 1 ? target.firstChild :
                    operatorIndex == 2 ? target :
                    null;

                var parentInDocument = JSLite.contains(document.documentElement, parent)

                nodes.forEach(function(node) {
                    var txt
                    if (copyByClone) node = node.cloneNode(true)
                    parent.insertBefore(node, target);
                    if (parentInDocument && node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' &&
                        (!node.type || node.type === 'text/javascript') && !node.src) txt = node.innerHTML;
                    else if (parentInDocument && node.children && node.children.length > 0 && JSLite(node) && (script = JSLite(node).find("script")))
                        if (script.length > 0) script.each(function(_, item) {
                            txt = item.innerHTML
                        });
                    txt ? window['eval'].call(window, txt) : undefined;
                });
            })
        }
        JSLite.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function(html) {
            JSLite(html)[operator](this)
            return this
        }
    });

    */
    return $;
})();
this.$ === undefined && (this.$ = core)

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
    var handlers = {},_jid = 1
    /* 绑定事件 start */
    $.extend($.fn,{
        bind: function(event, func) {return this.each(function(){add(this, event, func)})},
        unbind:function(event, func) {return this.each(function(){remove(this, event, func)})},
        on:function(event, selector, data, callback){
            var self = this
            if (event && !$.isString(event)) {
                $.each(event, function(type, fn){
                    self.on(type, selector, data, fn)
                })
                return self
            }
            if (!$.isString(selector) && !$.isFunction(callback) && callback !== false)
                callback = data, data = selector, selector = undefined
            if ($.isFunction(data) || data === false)
                callback = data, data = undefined
            if (callback === false) callback = function(){return false;}
            return this.each(function(){ 
                add(this, event, callback, data, selector) 
            })
        },
        off:function(event, selector, callback){
            var self = this
            if (event && !$.isString(event)) {
                $.each(event, function(type, fn){
                    self.off(type, selector, fn)
                })
                return self
            }
            if (!$.isString(selector) && !$.isFunction(callback) && callback !== false)
                callback = selector, selector = undefined
            if (callback === false) callback =  function(){return false;}
            return self.each(function(){
                remove(this, event, callback, selector)
            })
        },
        delegate: function(selector, event, callback){
            return this.on(event, selector, callback)
        },
        trigger:function(event, data){
            var type = event,specialEvents={}
            specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
            if (typeof type == 'string') {
                event = document.createEvent(specialEvents[type] || 'Events');
                event.initEvent(type,true, true);
            }else return;
            event._data = data;
            return this.each(function(){
                if('dispatchEvent' in this) this.dispatchEvent(event);
            });
        }
    });
    $.event={add:add,remove:remove};
    function add(element, events, func, data, selector){
        var self=this,id=jid(element),set=(handlers[id] || (handlers[id] = []));
        events.split(/\s/).forEach(function(event){
            var handler = $.extend(parse(event), {fn: func,sel: selector, i: set.length});
            var proxyfn = handler.proxy = function (e) {
                //处理事件代理
                if (selector) {
                    var $temp = $(element).find(selector);
                    var res = some.call($temp, function(val) {
                        return val === e.target || $.contains(val, e.target);
                    });
                    //不包含
                    if (!res) {
                        return false;
                    }
                }
                e.data = data;
                var result = func.apply(element,e._data == undefined ? [e] : [e].concat(e._data));
                if (result === false) e.preventDefault(), e.stopPropagation();
                return result;
            };
            set.push(handler)
            if (element.addEventListener) element.addEventListener(handler.e,proxyfn, false);
        })
    }
    function remove(element, events, func, selector){
        ;(events || '').split(/\s/).forEach(function(event){
            $.event = parse(event)
            findHandlers(element, event, func, selector).forEach(function(handler){
                delete handlers[jid(element)][handler.i]
                if (element.removeEventListener) element.removeEventListener(handler.e, handler.proxy, false);
            })
        })
    }
    function jid(element) {return element._jid || (element._jid = _jid++)}
    function parse(event) {
        var parts = ('' + event).split('.');
        return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
    }
    function findHandlers(element, event, func, selector){
        var self=this,id = jid(element);event = parse(event)
        return (handlers[jid(element)] || []).filter(function(handler) {
            return handler 
            && (!event.e  || handler.e == event.e) 
            && (!func || handler.fn.toString()===func.toString())
            && (!selector || handler.sel == selector);
        })
    }
    ;("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error paste drop dragstart dragover " +
    "beforeunload").split(' ').forEach(function(event) {
        $.fn[event] = function(callback) {
            return callback ? this.bind(event, callback) : this.trigger(event);
        }
    });
    /* 绑定事件 end */
})(core);
