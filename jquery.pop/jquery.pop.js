/**
 * Author:ZengWeilong Version 1.4
 * V1.4.2
 */
(function() {
	$.fn.pop = function(options) {
		var dfault = {
			content:"This content",
			borderColor:"RGB(253,184,163)"
		};
		var json = $.extend({},dfault, options);
		var elementId = $(this).attr("id");
		var showtips = elementId+"-tips";
		if($("."+showtips).html() != undefined){
			$("#body-tips div").hide();
			$("."+showtips).show();
			return;
		}
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		var width = $(this).width();
		var height = $(this).height();		
		var core = {
			right : function(){
				var tip_left = left+width+20;
				$("#body-tips").append("<div id='"+showtips+"' class='"+showtips+"'  style='position:absolute;display:none;top:"+(top-5)+"px;left:"+tip_left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding:6px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(top+4)+"px;left:"+(tip_left-16)+"px;border:8px solid transparent;border-right:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(top+5)+"px;left:"+(tip_left-14)+"px;border:7px solid transparent;border-right:8px solid #fff;'></div>");
				$("."+showtips).show();
			},
			left:function(){
				$("#body-tips").append("<div id='"+showtips+"' class='"+showtips+"'  style='position:absolute;display:none;top:"+(top-5)+"px;left:"+left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding:6px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				var rzleft=$("#"+elementId).offset().left - $("#"+showtips).width()-27;
				$("#"+showtips).css({"left":rzleft+"px"});
				var subleft=$("#"+elementId).offset().left;
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(top+4)+"px;left:"+(subleft-16)+"px;border:8px solid transparent;border-left:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(top+5)+"px;left:"+(subleft-16)+"px;border:7px solid transparent;border-left:8px solid #fff;'></div>");
				$("."+showtips).show();
			},
			top:function(){
				$("#body-tips").append("<div id='"+showtips+"' class='"+showtips+"'  style='position:absolute;display:none;top:"+top+"px;left:"+left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding:6px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				var rzleft=$("#"+elementId).offset().top - $("#"+showtips).outerHeight()-10;
				$("#"+showtips).css({"top":rzleft+"px"});
				var subleft=$("#"+elementId).offset().left + 20;
				var subtop = $("#"+elementId).offset().top - 15;
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(subtop+3)+"px;left:"+(subleft-17)+"px;border:9px solid transparent;border-top:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(subtop+2)+"px;left:"+(subleft-16)+"px;border:8px solid transparent;border-top:8px solid #fff;'></div>");
				$("."+showtips).show();
			},
			bottom:function(){
				$("#body-tips").append("<div id='"+showtips+"' class='"+showtips+"'  style='position:absolute;display:none;top:"+top+"px;left:"+left+"px;border: 1px solid "+json.borderColor+";background:#fff;padding:6px;text-align:left;border-radius: 5px;' >"+json.content+"</div>");
				var rzleft=$("#"+elementId).offset().top + $("#"+elementId).outerHeight() + 5;
				$("#"+showtips).css({"top":rzleft+"px"});
				var subleft=$("#"+elementId).offset().left + 20;
				var subtop = rzleft - 16;
				$("."+showtips).before("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(subtop+1)+"px;left:"+(subleft-17)+"px;border:9px solid transparent;border-bottom:9px solid "+json.borderColor+";'></div>");
				$("."+showtips).after("<div class='"+showtips+"'  style='position:absolute;display:none;top:"+(subtop+3)+"px;left:"+(subleft-16)+"px;border:8px solid transparent;border-bottom:8px solid #fff;'></div>");
				$("."+showtips).show();
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
	};
})();