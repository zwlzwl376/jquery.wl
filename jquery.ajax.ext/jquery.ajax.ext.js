(function($) {

	var _ajax = $.ajax;

	$.ajaxRequest = function(options) {
		/* 默认设置 */
		var settings = {
			cache : false,
			dataType : "html",
			type : "POST",
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			},
			success : function(data, textStatus) {
			},
			statusCode : {
				606 : function() {
					alert("session invalid!");
				}
			}
		}
		
		var json = $.extend({},settings, options);
		
		$.extend(settings, options);
		
		/* 扩展增强处理 */
		var _opt = $.extend(json, {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				/* 错误方法增强处理 */
				settings.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success : function(data, textStatus) {
				/* 成功回调方法增强处理 */
				settings.success(data, textStatus);
			},
			statusCode:settings.statusCode
		});

		_ajax(_opt);
	};

})(jQuery);