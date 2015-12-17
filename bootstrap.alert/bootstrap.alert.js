/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {

	var alert_timeoutId;

	$.close = function(type){
		if(type == "confirm"){
			$('#confirm-modal').modal('hide');
		}else{
			$("#alert-msg").fadeOut().remove();
		}	
	};
	
	$.alert = function(type,options) {
		
		/* 默认值不可随意更改 */
		var dfault = {
			title:"System Message",
			content:"This is your message",
			width:400
		};
		var json = $.extend(dfault, options);
		
		if (alert_timeoutId) {
			clearTimeout(alert_timeoutId);
			$("#alert-msg").remove();
		}

		var core = {
			info : function(style) {
				if ($("#alert-msg").html()) $("#alert-msg").remove();
				$("body").append("<div id='alert-msg' class='alert alert-"+style+" fade in hides'><strong>"+json.title+"</strong>"+ json.content + "</div>");
				$("#alert-msg").delay(100).fadeIn(200, function() {
					alert_timeoutId = setTimeout(function() {
						$("#alert-msg").fadeOut().remove();
					}, 6000);
				});
			},
			confirm:function(){
				if ($("#confirm-modal").html()) $("#confirm-modal").remove();
				var elemHtml = '<div class="modal fade" id="confirm-modal" role="dialog" style="background:rgba(168,168,168,0.6)">'+
							  		'<div class="modal-dialog" style="width:'+json.width+'px;margin-top:10%;">'+
							  			'<div class="modal-content">'+
							  				'<div class="modal-header">'+
							  					'<button id="modal-upper-close" data-dismiss="modal" class="close modal-close" aria-label="Close" type="button"><span aria-hidden="true">×</span></button>'+
							  					'<h4 id="modal-title" class="modal-title">'+json.title+'</h4>'+
							  				'</div>'+
							  			'<div id="modal-body" class="modal-body">'+json.content+'</div>'+
							  			'<div id="modal-footer" class="modal-footer">'+
								  			'<button type="button" class="btn btn-warning" data-dismiss="modal">  Cancel  </button>';
											if(options.buttons instanceof Array){
												for(var i = 0 ; i < options.buttons.length; i++){
													var button = options.buttons[i];
													elemHtml += '<button type="button" id="'+button.id+'" class="btn btn-primary">'+button.text+'</button>';
												}
											}
								  			elemHtml += '</div>'+
							  		'</div>'+
							  	'</div>';
				$("body").append(elemHtml);
				/* add callback*/
				
				if(options.buttons instanceof Array){
					$("button").on('click',function(){
						var id = $(this).attr("id");
						for(var i = 0 ; i < options.buttons.length; i++){
							var button = options.buttons[i];
							if(id == button.id)
								button.callback();
						}
					});
				}
				/*显示弹出层*/
				$('#confirm-modal').modal('show');
			}
		}

		if (type == "info")
			core.info('success');

		if (type == "error")
			core.info('danger');
		
		if(type == "confirm")
			core.confirm();
	};
})();