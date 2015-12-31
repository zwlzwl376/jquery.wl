/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {
	/**
	 * options = {action:"open",id:loadingId}
	 */
	$.fn.loading = function(options) {
		/*默认值不可随意更改*/
		var dfault = {
			id : null, /*loading Id*/
			rgba : 0.6, /*背景透明度*/
			action : "close", /*执行方式true打开 其他值关闭*/
			before : null, /* 动作执行前函数*/
			after : null, /*动作执行后函数*/
			font:10,
			position : "absolute" /*fixed 固定绝对位置 absolute相对位置*/
		};
		var json = $.extend({},dfault, options);

		if (json.id == null)
			return;
		
		var winobj = $(this);
		if (typeof (json.before) == "function")
			json.before();
		
		/*core*/
		var core = {
			restyle : function(winobj) {
				var height = $(winobj).innerHeight();
				var width = $(winobj).innerWidth();
				var top = $(winobj).offset() == undefined ? 0 : $(winobj).offset().top;
				var left = $(winobj).offset() == undefined ? 0 : $(winobj).offset().left;
				json.position = $(winobj).offset() == undefined ? "fixed":"absolute";
				var style = "z-index:10000;position:" + json.position + ";left:" + left + "px;top:"
						+ top + "px;width:" + width + "px;"
						+ "text-align:center;background:rgba(168,168,168," + json.rgba
						+ ");height:" + height + "px;line-height:" + height + "px;";
				return style;
			},
			open:function(){
				if (!$("#" + json.id).attr("style")) {
					var style = core.restyle(winobj);
					var divhtml = "<div id='" + json.id + "' style='display:none;" + style
							+ "'><span class='spinner-loader' style='font-size:"+json.font+"px!important;'>Loading&#8230;</span></div>";
					$("body").append(divhtml);
				}
				$("#" + json.id).fadeIn(200, function() {
					if (typeof (json.after) == "function")
						json.after();
				});
			},
			close:function(){
				$("#" + json.id).fadeOut(500, function() {
					if (typeof (json.after) == "function")
						json.after();
				}).remove();
			},
			resize:function(){
				var style = core.restyle(winobj);
				$("#" + json.id).removeAttr("style").attr("style", style);
			}
		}
		
		/*open*/
		if ("open" == json.action) {
			core.open();
		}
		/*close*/
		if ("close" == json.action) {
			core.close();
		}
		/*window change Listen*/
		$(window).resize(function() {
			core.resize();
		});
	}

})();