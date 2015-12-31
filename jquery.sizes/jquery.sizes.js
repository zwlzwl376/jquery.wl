/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {
	$.fn.sizes = function(options) {
		var dfault = {
			size:15,
			content:'...'
		};
		var json = $.extend({},dfault, options);
		var text = $.trim($(this).html());
		var size = text.length;
		if(size > json.size){
			$(this).attr("title",text);
			var jclen = json.content.length;
			text = text.substring(0,(json.size-jclen)) + json.content;
		}
		$(this).html(text);
	}
})();