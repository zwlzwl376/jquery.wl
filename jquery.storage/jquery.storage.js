/**
 * Author:ZengWeilong Version 1.4
 * V1.4
 */
(function() {
	$.storage = function(options) {
		/*默认值*/
		var dfault = {
			place:'page',/*从什么位置 session local page*/
			oper:'set',  /*做什么操作 set get remove*/
			key:'test',	 /*操作那个key */
			value:'test', /* 值[可选]  当 set 的时候该项必填*/
			clean:false,  /* 默认false,当为true的时候需慎重！！！ 会清除place里面的所有值，当place为*/
			obj:window,	  /* 对象[可选] 当 page 的时候该项必填,默认为window */
		};
		
		var json = $.extend({},dfault, options);
		
		/*放入值*/
		var set = {
			/*局部分发*/
			core:function(json){
				if(json.value == "test" || json.key == "test"){
					return false;
				}
				switch(json.place){
					case 'session':set.session(json.key,json.value); break;
					case 'local':set.local(json.key,json.value); break;
					case 'page':set.data(json.obj,json.key,json.value); break;
				}
			},
			session:function(key,value){
				if(window.sessionStorage) sessionStorage.setItem(key,value);
			},
			local:function(key,value){
				if(window.localStorage)	localStorage.setItem(key,value);
			},
			data:function(obj,key,value){
				$(obj).data(key,value);
			}
		};	
		/*获取值*/
		var get = {
			/*局部分发*/
			core:function(json){
				var value;
				switch(json.place){
					case 'session':value = get.session(json.key); break;
					case 'local':value = get.local(json.key); break;
					case 'page':value = get.data(json.obj,json.key); break;
				}
				return value;
			},
			session:function(key){
				if(window.sessionStorage) return sessionStorage.getItem(key);
				return null;
			},
			local:function(key){
				if(window.localStorage) return localStorage.getItem(key);
				return null;
			},
			data:function(obj,key){
				var value = $(obj).data(key);
				if(value == undefined) value = null;
				return value;
			}
		};
		/*移除值*/
		var remove = {
			/*局部分发*/
			core:function(json){
				switch(json.place){
					case 'session':remove.session(json.key); break;
					case 'local':remove.local(json.key); break;
					case 'page':remove.data(json.obj,json.key); break;
				}
			},
			session:function(key){
				if(window.sessionStorage) sessionStorage.removeItem(key);
			},
			local:function(key){
				if(window.localStorage) localStorage.removeItem(key);
			},
			data:function(obj,key){
				$(obj).removeData(key);
			}			
		};
		
		/*核心分发*/
		var core = function(){
			if(json.clean){
				switch(json.place){
					case 'session': if(window.sessionStorage) sessionStorage.clearStorage();break;
					case 'local': if(window.localStorage) localStorage.clearStorage();break;
					case 'page': break;
				}
				return false;
			}
			var value;
			switch(json.oper){
				case 'set':set.core(json); break;
				case 'get':value = get.core(json); break;
				case 'remove':remove.core(json); break;
			}
			return value;
		};
		
		//执行核心逻辑*/
		return core(json);
	};
	
	$.getSession = function(){
		if(window.sessionStorage) return sessionStorage;
	}
	
	$.getLocal = function(){
		if(window.localStorage) return localStorage;
	}
})();