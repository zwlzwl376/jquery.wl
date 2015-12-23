/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {
	$.fn.sizes = function(options) {
		var json = {};
		var dfault = {
			size:15,
			content:'...'
		};
		json = $.extend(json,dfault, options);
		var text = $(this).html();
		var size = text.length;
		if(size > json.size){
			var jclen = json.content.length;
			jclen--;
			text = text.substring(0,(json.size-jclen)) + json.content;
		}
		$(this).html(text);
	}
})();