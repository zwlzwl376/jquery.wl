/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {
	$.fn.pop = function(options) {
		var dfault = {
			direction:"right",
			content:"This content",
			borderColor:"#66afe9"
		};
		var json = $.extend({},dfault, options);
		var elementId = $(this).attr("id");
		var showtips = elementId+"-tips";
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		var width = $(this).width();
		var height = $(this).height();
		
		var core = {
			right : function(){
				var tip_left = left+width+20;
				$("#"+elementId).after("<div id='"+showtips+"' class='"+showtips+"'  style='display:none;position:absolute;top:"+(top-5)+"px;left:"+tip_left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding: 8px 16px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;top:"+top+"px;left:"+(tip_left-16)+"px;display:none;border:9px solid transparent;border-right:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;top:"+(top+1)+"px;left:"+(tip_left-14)+"px;display:none;border:8px solid transparent;border-right:8px solid #fff;'></div>");
			}
		};
		
		/*right*/
		if("right" == json.direction){
			core.right();
		}
		
		$(this).blur(function(){$("."+showtips).hide();}).focus(function(){$("."+showtips).show();});
	};
})();