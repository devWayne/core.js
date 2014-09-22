var core = (function() {
	var _array = [];
	var $ = function(selector, context) {
		return init(selector, context)
	};


	function init(selector, context) {
		var dom;
		//selector = selector.trim();
		//context = context.tirm();
		if (!context) context = document;
		if (!selector) return {};
		if ($.isArray(selector)) dom = selector;
		if ($.isFunction(selector)) {
			return $.ready(selector);
		}
		if (dom == undefined) {
			dom = selectorng(context, selector);
		}
		dom.__proto__ = $.fn;
		return dom;
	};

	function selectorng(elem, selector) {
		var isId = selector[0] == "#",
			isClass = selector[0] == ".",
			selector_name = isId || isClass ? selector.slice(1) : selector;
		if (isId) {
			return elem.getElementsById(selector_name);
		}
		if (isClass) {
			return elem.getElementsByClassName(selector_name);
		} else {
			return elem.getElementsByTagName(selector_name);
		}
	};


	$.fn = {
		this: function() {
			return console.log(this);
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
		each: function(callback) {
			_array.every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false
			})
		}

	};
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array
	}
	$.ready = function(callback) {
		document.addEventListener('DOMContentLoaded', function() {
			callback($)
		}, false)
	}
	$.isFunction = function(obj) {
		return obj != null && typeof(obj) == "function"
	}
	$.isWindow = function(obj) {
		return obj !== null && obj == obj.window
	}
	$.isDocument = function(obj) {
		return obj !== null && obj.nodeType == obj.DOCUMENT_NODE
	}


	return $;
})()
window.$ === undefined && (window.$ = core)