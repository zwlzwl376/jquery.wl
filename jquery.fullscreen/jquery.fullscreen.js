/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.fullscreen = function(options) {
		var setting = {
			screen:true
		};
		var json = $.extend({},setting,options);
		var elementId = $(this).attr("id");
		/*工具封装*/
		var util = {
				fullscreen:function(){  
					elem=document.getElementById(elementId);  
					if(elem.webkitRequestFullScreen){  
						elem.webkitRequestFullScreen();     
					}else if(elem.mozRequestFullScreen){  
						elem.mozRequestFullScreen();  
					}else if(elem.requestFullScreen){  
						elem.requestFullscreen();  
					}else{  
						//浏览器不支持全屏API或已被禁用  
					}  
				},
				exitFullscreen:function(){  
					var elem=document;  
					if(elem.webkitCancelFullScreen){  
						elem.webkitCancelFullScreen();      
					}else if(elem.mozCancelFullScreen){  
						elem.mozCancelFullScreen();  
					}else if(elem.cancelFullScreen){  
						elem.cancelFullScreen();  
					}else if(elem.exitFullscreen){  
						elem.exitFullscreen();  
					}else{  
						//浏览器不支持全屏API或已被禁用  
					}  
				} 
		};
		if(json.screen){
			util.fullscreen();
		}else{
			util.exitFullscreen();
		}
 }
})(jQuery);

