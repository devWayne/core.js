var core = (function() {
	var core = {};

	var $ = function(selector, context) {
		return core.init(selector, context)
	};

	$.fn = {
		a: function() {
			return console.log('hello');
		}
	};


	core.init = function(selector, context) {
		var dom;
		if (!context) {
			context = document;
		}
		if (!selector) {
			return {}
		} else {
			dom = core.selectorng(context, selector);
		}
		dom.__proto__ = $.fn
		//	dom.prototype=$.fn;
		console.log(dom);
		console.log(this);
		return dom;
	};

	core.selectorng = function(elem, selector) {
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
	//core.Z.prototype = $.fn;
	return $;
})()
window.$ === undefined && (window.$ = core)