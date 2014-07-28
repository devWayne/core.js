var core = (function() {
	var core={};
	$ = function(selector, context) {
		return core.init(selector, context)
	}

	core.init = function(selector, context) {
		if (!context) {
			context = document;
		}
		if (!selector) {
			return {}
		} else {
			return core.selectorng(context, selector);
		}
	}

	core.selectorng = function(elem, selector) {
		var isId = selector[0] == "#",
			isClass = selector[0] == ".",
			selector_name = isId || isClass ? selector.slice(1) : selector;
		if (isId){
			return elem.getElementsById(selector_name);
	}
	if (isClass) {
		return elem.getElementsByClassName(selector_name);
	} else {
		return elem.getElementsByTagName(selector_name);
	}

}
return $;
})()