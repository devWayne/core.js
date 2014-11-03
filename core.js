var core = (function() {
	var _array = [];
	var $ = function(selector, context) {
		return init(selector, context)
	};


	function init(selector, context) {
		var dom;
		selector = selector.trim();
		context = context.tirm();
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
		css:function(elem,value){
			if(arguments.length<2){
				var result=this[0].getComputedStyle(elem,'');
				return result;
			}
			else{

			}
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

	$.cookie = function(key,value,time){
		if(value==undefined&&time==undefined){
			var cookieArr=document.cookie.split('; ');
			for (var i=0 ;i<cookieArr.length;i++)
			{
		    		var _cookie=cookieArr[i].split('=');
				if(key==_cookie[0]) return decodeURI(_cookie[1]);
			}
			return "";	
		}
		else{
		 var str = key + "=" + encodeURI(value);
   			 if(time > 0){                               
       				 var date = new Date();
       				 var ms = time*3600*1000;
       				 date.setTime(date.getTime() + ms);
       				 str += "; expires=" + date.toUTCString();
   			}
		}
		document.cookie = str;
	}


	return $;
})()
window.$ === undefined && (window.$ = core)
