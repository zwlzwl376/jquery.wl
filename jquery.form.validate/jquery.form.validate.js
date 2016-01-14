/**
 * Author:ZengWeilong
 * V1.4
 **/
(function () {	
	
	//表单初始化
	$.fn.formUI = function(options){
		//是否需要回选 false 表示不回选
		var def = {
			filed:false
		}

		var json = $.extend({},def,options);
		
		if(json.filed){
			var elementId = $(this).attr("id");
			
			$(this).find("input[type=text],select").each(function(){
				$(this).val($(this).attr("filed"));
			});
			
			$(this).find("input[type=radio]").each(function(){
				if($(this).val() == $(this).attr("filed")){
					$(this).attr("checked",true);
				}else{
					$(this).removeAttr("checked");
				}
			});
			
			$(this).find("input[type=checkbox]").each(function(){
				var values = $(this).attr("filed");
				if(values){
					if(values.indexOf($(this).val()) > -1){
						$(this).attr("checked",true);
					}else{
						$(this).attr("checked",false);
					}
				}
			});
		}
	};
	
	//表单验证
	$.fn.validate = function(options){
		$(".error").html("");
		var def = {
			result:function(msg){},
			validator:false
		}
		var json = $.extend(def,options);
		var message = "success";
		$(this).find("input[type=text],input[type=password],textarea,select").each(function(){
			var validator = $(this).attr("validator");
			if(validator){
				var value = $.trim($(this).val());
				var jsonTmp = eval("("+validator+")");
				
				if(jsonTmp.required != undefined){
					if(value == ""){
						message = jsonTmp.required;
						//if  json.validator == true show error
						if(json.validator){
							if($(this).next("span").attr("class") == 'error'){
								$(this).next("span").html(message);
							}else{
								$(this).after("<span class='error'>"+message+"</span>");
							}
						}else{
							return false;
						}
					}
				}
				
				if(value != "" && jsonTmp.match != undefined){
					var pattern = new RegExp(jsonTmp.match.pattern);
					if(!pattern.test(value)){
						message = "Date format error!";
						if(jsonTmp.match.message){
							message = jsonTmp.match.message;
							//if  json.validator == true show error
							if(json.validator){
								if($(this).next("span").attr("class") == 'error'){
									$(this).next("span").html(message);
								}else{
									$(this).after("<span class='error'>"+message+"</span>");
								}
							}else{
								return false;
							}
						}						
					}
				}
			}
		});
		json.result(message);
	};
	
	//表单JSON data值
    $.fn.dataJson=function(){  
        var serializeObj={};  
        $(this.serializeArray()).each(function(){ 
			if(serializeObj[this.name]){
				serializeObj[this.name] += ","+this.value;
			}else{
				serializeObj[this.name] = this.value;
			}
        });  
        return serializeObj;  
    }; 
})(jQuery);