/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.headfixed = function() {
	var tableId = $(this).attr("id");
	$(window).scroll(function(){ 
		if($('#'+tableId+' tbody tr')){
			 if($(window).scrollTop() > $("#"+tableId).offset().top){
				 $('#'+tableId+' thead').attr("style","z-index:101;position: fixed;left:"+$("#"+tableId).offset().left+"px;top:0px;");
				 $('#'+tableId+' thead tr th').each(function(){
					var index = $(this).parent("tr").find("th").index($(this));
					var td = $($('#'+tableId+' tbody tr')[0]).find("td").eq(index);
					$(this).width($(td).width());
				 });
			 }else{
				 $('#'+tableId+' thead').attr("style","");
			 }
		}
	});
	$(window).resize(function(){
		if($('#'+tableId+' tbody tr')){
			 if($(window).scrollTop() > $("#"+tableId).offset().top){
				 $('#'+tableId+' thead').attr("style","z-index:101;position: fixed;left:"+$("#"+tableId).offset().left+"px;top:0px;");
				 $('#'+tableId+' thead tr th').each(function(){
					var index = $(this).parent("tr").find("th").index($(this));
					var td = $($('#'+tableId+' tbody tr')[0]).find("td").eq(index);
					$(this).width($(td).width());
				 });
			 }else{
				 $('#'+tableId+' thead').attr("style","");
			 }
		}
	});
 }
})(jQuery);