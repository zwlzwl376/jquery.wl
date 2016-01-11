/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.countdown = function(options) {
		var setting = {
			staticTime:'2010-01-01 00:00:00',	/*目标时间*/
			serverTime: '2010-01-01 00:00:01', 	/*起点时间*/
			before:1*60,						/*单位秒,计时提前多少秒显示beforeId*/
			beforeId:"beforeId",				/*倒计时后显示的DemoId*/
			longtime:1*60,						/*设置计时多长时间显示OVER*/
			afterId:"afterId",					/*设置计时后要隐藏的DemoId*/
			server:false,						/*是否同步*/
			url:"/server.json",					/*同步的URL*/
			format:false,
			countfun:function(countSecond) {	/*该方法可覆写显示内容，参数为当前计数器值*/			
				var timeSecond = Math.abs(countSecond);
				var second = Math.floor(timeSecond % 60);
				var minite = Math.floor((timeSecond / 60) % 60);
				var hour = Math.floor((timeSecond / 3600) % 24);
				var day = Math.floor((timeSecond / 3600) / 24);
				if(options.format){
					if(countSecond <= 30 * 60){	
						/*小于半小时*/
						return 'Class Time Count Down: ' + minite + "':" + second + '"';
					}else{/*大于半小时*/
						return "Class Time: Too early";
					}
				}
				if(countSecond > 0) {
					var dayText = " days ",hourText = " hours ",miniteText = " minutes ",secondText = " seconds";
					if(day <= 1) dayText=" day ";
					if(hour <= 1) hourText = " hour ";
					if(minite <= 1) miniteText = " minute ";
					if(second <= 1) secondText = " second ";
					return "CountDown: " + day + dayText + hour + hourText + minite + miniteText +second + secondText;
				}else{
					return 'StartTime: ' + minite + "':" + second + '"';
				}
				
			}
		};
		var json = $.extend({},setting,options);
		
		/*工具封装*/
		var util = {
			show:function(ss,cs){
				if(ss)$("#"+json.beforeId).show();else $("#"+json.beforeId).hide();
				if(cs)$("#"+json.afterId).show();else $("#"+json.afterId).hide();
			},
			getTime:function(str) {
				str = str.replace(/-/g, "/");
				var dates = new Date(str);
				var times = dates.getTime();
				return times;
			}
		};
		var elementId = $(this).attr("id");
		var serverTime = util.getTime(json.serverTime);
		var staticTime = util.getTime(json.staticTime);
		/*计算秒差*/
		var countSecond = (staticTime - serverTime) / 1000;
		
		/*服务器时间同步*/
		if(json.server){
			$(window).focus(function(){
				$.ajax({
					url:json.url,
					dataType:"json",
					success:function(result){
						serverTime = util.getTime(result.serverTime);
						/*重新计算秒差*/
						countSecond = (staticTime - serverTime) / 1000;
					}
				});
			});
		}
		/*倒计时功能*/
		setTimeout(function() {
			countSecond--;
			/*计时在1分钟以内*/
			if( countSecond  >= (0-json.longtime)){
				/*大于0小于1分钟全部显示*/
				util.show(true,true);
				if(countSecond > json.before){
					/*离倒计时大于1分钟不可进入,但可取消*/
					util.show(false,true);
				}else if(countSecond < 0){
					/*倒计时开始:不能取消，但可进入*/
					util.show(true,false);
				}
				$("#"+elementId).html(json.countfun(countSecond));
				setTimeout(arguments.callee, 1000);
			}else{
				/*迟到大于1分钟，课程结束*/
				util.show(true,false);
				$("#"+elementId).html("OVER");
			}
		}, 1000);
 }
})(jQuery);