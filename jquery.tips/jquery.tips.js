/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {

	$.fn.tips = function(options) {
		var dfault = {
			rgba : 0.8, 
			width:300,
			font:14
		};
		
		var json = $.extend({}, dfault, options);
		
		var timeout;			
		
		var winobj = $(this);
		
		$(winobj).mousemove(function(e){
			if(!$("#tips").html()){
				$("body").prepend("<div id='tips' style='display:none;'></div>");
			}
			var X = e.pageX;
			var Y = e.pageY;
			var style = "position:absolute;border-radius:5px;line-height:20px; max-width:"+json.width+"px;left:"+X+"px;top:"+Y+"px;z-index:99;font-size:"+json.font+"px;background:rgba(237,246,254,"+json.rgba+");border:1px solid #007D8F;padding:5px;color:#333;";
			$("#tips").attr("style",style);
			$("#tips").html($(this).text()).hide();
			timeout = setTimeout(function(){
				$("#tips").delay(100).fadeIn(100);
			},500);
		});	
		
		$(winobj).mouseleave(function(){
			$("#tips").remove();
		});
	}

})();