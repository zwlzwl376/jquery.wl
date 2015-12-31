/**
 * Author:ZengWeilong
 **/
(function ($) {	
	$.fn.fileUI = function(options){
		var def = {
			width:120,
			height:40,
			accept:"*.*",
			maxSize:1,
			title:" Attach File ",
			showlength:25
		}
		var json = $.extend({},def,options);
		var randid = ((Math.random()*100000)+"").substring(0,5);
		var buttonStyle = "text-decoration: none;padding:5px;background:#f5f5f5; border:#eee 1px solid;border-radius: 4px; color: #f00;display:block;text-align: center;cursor:pointer;float:left;";
		var html = "<a id='button"+randid+"' href='javascript:;' style='"+buttonStyle+"height:"+(json.height-11)+"px;width:"+(json.width-11)+"px;margin-right:10px;'>"+json.title+"</a><span style='line-height:"+json.height+"px;' id='span"+randid+"'>No file attached</span>";
		$(this).after(html);
		var style = "left:"+$("#button"+randid).offset().left+"px;top:"+$("#button"+randid).offset().top+"px;";
		$(this).attr("style",style+"height:"+json.height+"px;width:"+json.width+"px;opacity:0;position:absolute;cursor:pointer;").attr("accept",json.accept).attr("title",json.title);
		$(this).change(function(){
			var fileSize = $(this)[0].files[0].size/1024;
			if(fileSize > json.maxSize*1024){
				$("#span"+randid).html("The file size can not exceed "+json.maxSize+"M!");
				$(this).val("");
			}else{
				var name = $(this).val().substring($(this).val().lastIndexOf("\\")+1);
				var suffix = name.substring(name.lastIndexOf("."));
				if((json.accept+",").indexOf(suffix+",") < 0){
					$("#span"+randid).html("File format only supports:"+json.accept);
					$(this).val("");
				}else{
					var showName = name;
					if(showName.length > json.showlength){
						showName = showName.substring(0,(json.showlength-3))+"...";
					}
					$("#span"+randid).html(showName).attr("title",name);
				}
			}
		});
		var butsty = $("#button"+randid).attr("style");
		$(this).hover(function(){
			$("#button"+randid).attr("style",butsty+"background: #ccc;color: #f00;border:#ddd 1px solid;");
		},function(){
			$("#button"+randid).attr("style",butsty);
		});
	};
})(jQuery);