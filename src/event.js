;(function($){
var onStr = window.addEventListener ? 'addEventListener' : 'attachEvent',
    offStr = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = onStr !== 'addEventListener' ? 'on' : '';

	$.fn=$.extend($.fn,{
		/**
		 * On `el` event `type` to `fn`.
		 *
		 * @param {String} type
		 * @param {Function} fn
		 * @param {Boolean} capture
		 * @return {Function}
		 * @api public
		 */

		on:function(type, fn, capture){
			return this.each(function(idx,v){
				  v[onStr](prefix + type, fn, capture || false);
			});
		},
			/**
		 * Off `el` event `type`'s callback `fn`.
		 *
		 * @param {String} type
		 * @param {Function} fn
		 * @param {Boolean} capture
		 * @return {Function}
		 * @api public
		 */

		 off:function(type, fn, capture){
		 	return this.each(function(idx,v){
				 v[offStr](prefix + type, fn, capture || false);
		 	});
		}
	});

})(core);
