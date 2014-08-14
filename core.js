var core = (function() {

	var $ = function(selector, context) {
		return init(selector, context)
	};


	function init(selector, context) {
		var dom;
		if (!context) context = document;
		if (!selector) return {};
		if ($.isFunction(selector)) {
			return $.ready(selector);
		} else {
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
		}
	};

	$.ready = function(callback) {
		document.addEventListener('DOMContentLoaded', function() {
			callback($)
		}, false)
	}
	$.isFunction = function(arg) {
		return arg != null && typeof(arg) == "function"
	}

	return $;
})()
window.$ === undefined && (window.$ = core)