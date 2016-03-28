/**
 * Author:ZengWeilong Version 1.4
 * V1.4.2
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
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;top:"+(top+2)+"px;left:"+(tip_left-16)+"px;display:none;border:8px solid transparent;border-right:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;top:"+(top+3)+"px;left:"+(tip_left-14)+"px;display:none;border:7px solid transparent;border-right:8px solid #fff;'></div>");
			},
			left:function(){
				$("#"+elementId).before("<div id='"+showtips+"' class='"+showtips+"'  style='display:none;position:absolute;top:"+(top-5)+"px;left:"+left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding: 8px 16px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				var rzleft=$("#"+elementId).offset().left - $("#"+showtips).width()- 50;
				$("#"+showtips).css({"left":rzleft+"px"});
				var subleft=$("#"+elementId).offset().left;
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;top:"+(top+2)+"px;left:"+(subleft-16)+"px;display:none;border:8px solid transparent;border-left:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;top:"+(top+3)+"px;left:"+(subleft-17)+"px;display:none;border:7px solid transparent;border-left:8px solid #fff;'></div>");
			},
			top:function(){
				$("#"+elementId).before("<div id='"+showtips+"' class='"+showtips+"'  style='display:none;position:absolute;top:"+top+"px;left:"+left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding: 8px 16px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				var rzleft=$("#"+elementId).offset().top - $("#"+showtips).outerHeight()-10;
				$("#"+showtips).css({"top":rzleft+"px"});
				var subleft=$("#"+elementId).offset().left + 20;
				var subtop = $("#"+elementId).offset().top - 15;
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;top:"+(subtop+3)+"px;left:"+(subleft-17)+"px;display:none;border:9px solid transparent;border-top:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;top:"+(subtop+2)+"px;left:"+(subleft-16)+"px;display:none;border:8px solid transparent;border-top:8px solid #fff;'></div>");
			},
			bottom:function(){
				$("#"+elementId).before("<div id='"+showtips+"' class='"+showtips+"'  style='display:none;position:absolute;top:"+top+"px;left:"+left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding: 8px 16px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				var rzleft=$("#"+elementId).offset().top + $("#"+elementId).outerHeight() + 5;
				$("#"+showtips).css({"top":rzleft+"px"});
				var subleft=$("#"+elementId).offset().left + 20;
				var subtop = rzleft - 16;
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;top:"+(subtop+1)+"px;left:"+(subleft-17)+"px;display:none;border:9px solid transparent;border-bottom:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;top:"+(subtop+3)+"px;left:"+(subleft-16)+"px;display:none;border:8px solid transparent;border-bottom:8px solid #fff;'></div>");
			}
		};		
		/*right*/
		if("right" == json.direction){
			core.right();
		/*left*/
		}else if("left" == json.direction){
			core.left();
		}else if("top" == json.direction){
			core.top();
		}else if("bottom" == json.direction){
			core.bottom();
		}
		$(this).blur(function(){$("."+showtips).hide();}).focus(function(){$("."+showtips).show();});
	};
})();