/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.selectedtd = function(options) {
	var dfault = {
		cpBy: "ALong", 
		url: "", 
		tdcount: 2,
		content:"OK",
		checked:function(){
			return "success";
		},
		cancel:function(){
			return "success";
		}
	};
	var ops = $.extend(dfault,options);
	var tableId = $(this).attr("id");
	var tdcount = ops.tdcount;
	//增加监听
	$("#"+tableId+" td").click(function(){
		if(!$(this).attr("booked")){
			var width = $(this).width();
			var height = $(this).height() * tdcount + (tdcount-1);
			var left = $(this).offset().left+1;
			var top = $(this).offset().top+1;
			var index = $(this).parents("tr").find("td").index($(this));
			var tds = [$(this).parents("tr").prev("tr").find("td").eq(index)];
			//用数组存放同列td
			for(var i = 1; i < tdcount-1; i++){
				tds[i] = $(tds[i-1]).parents("tr").prev("tr").find("td").eq(index);
			}
			//选择
			if(!$(this).find("div.base-class").attr("style")){
				if(ops.checked() == "success"){				
					var div = "<div class='base-class' style='z-index:100;width:"+width+"px;height:"+height+"px;line-height:"+height+"px;position: absolute;left:"+left+"px;top:"+top+"px'>"+ops.content+"</div>";
					$(this).append(div);
					for(var i = 0; i < tds.length; i++){
						$(tds[i]).attr("booked","true");
					}
				}
			}else{
				if(ops.cancel() == "success"){
					for(var i = 0; i < tds.length; i++){
						$(tds[i]).removeAttr("booked");
					}
					$(this).find("div.base-class").remove();
				}
			}
		}
	});
	
	//去掉尾部tr中td监听
	var trs = $("#"+tableId).find("tr");
	for(var i = trs.length; i > (trs.length - tdcount); i--){
		$(trs[i]).find("td").attr("booked","no");
	}
	
	//重定位事件
	$(window).resize(function(){
		$(".base-class").each(function(){
			var td = $(this).parent();
			var width = $(td).width();
			var height = $(td).height() * tdcount + (tdcount-1);
			var left = $(td).offset().left+1;
			var top = $(td).offset().top+1;
			$(this).attr("style","z-index:100;width:"+width+"px;height:"+height+"px;line-height:"+height+"px;position: absolute;left:"+left+"px;top:"+top+"px");
		});
	});
 }
})(jQuery);