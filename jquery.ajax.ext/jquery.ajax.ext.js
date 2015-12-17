(function($) {

	var _ajax = $.ajax;

	$.ajaxRequest = function(options) {
		/* 默认设置 */
		var settings = {
			cache : false,
			dataType : "html",
			type : "POST"
		}
		
		$.extend(settings, options);
		
		var callbacks = {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			},
			success : function(data, textStatus) {
			},
			statusCode : {
				606 : function() {
					alert("session invalid!");
				}
			}
		};

		/* 扩展增强处理 */
		var _opt = $.extend(settings, {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				/* 错误方法增强处理 */
				callbacks.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success : function(data, textStatus) {
				/* 成功回调方法增强处理 */
				callbacks.success(data, textStatus);
			},
			statusCode:callbacks.statusCode
		});

		_ajax(_opt);
	};

})(jQuery);