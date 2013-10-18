/**
 * @fileOverview : 请求参数处理 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月24日 星期四 22时26分55秒
 * @filename : frame/request.js
 * @version : v1.0
 * @description : 请求参数处理
 */
exports.request = {
      
        url : global.woo.url,
       
        querystring : global.woo.querystring,

        req : null,  
        
	res : null,
	
	postData : null, 
	
	get : null,
 
        cookieData : null, 
        
	//POST请求回调函数
	backPostFunction : function(data){console.log('backPostFunction',data)},
        
        /**
	 * 初始化参数
	 * POST 是监听 异步 1:变异步为同步 2：回调函数 woo使用得是回调函数
	 */
        init : function(req,res) {
            this.req = req;
	    this.res = res;
	    //this.postData = this.postData();
	    this.get = this.getData();
	    //this.cookie = this.cookieData();
	},


        /**
	 * 获取GET参数集合
	 * @return data {obj}  get参数集合
	 */
	getData : function() {
	    
	    var dataString = this.url.parse(this.req.url).query,
	        data = this.querystring.parse(dataString);
            
	    return data;
	},

	/**
	 * post方式参数
	 */
	postData : function() {
            var tthis = this, 
	        postData = '';
            
		this.req.setEncoding("utf8");
		this.req.addListener("data", function(postDataChunk) {
	            postData += postDataChunk;
		});

		this.req.addListener("end", function() {
	            paramObj = tthis.querystring.parse(postData);
		    tthis.backPostFunction(paramObj);
		});
	},
 
        /**
	 * 获取cookie值
	 */
	cookieData : function () { 
	    return this.querystring.parse(this.req.headers.cookie); 
        }, 

	/**
         * 获取get值
	 */
        getValue : function(name) {
	   return this.requestValue(name,this.get);
	},

        /**
         * 获取post值
	 */
        postValue : function(name) {
	   return this.req(name,this.postData);
	},

        /**
         * 获取cookie值
	 */
        cookieValue : function(name) {
	   return this.req(name,this.cookieData);
	},

	/**
	 * 封装获取值
	 */
        requestValue : function(name,data) {
	    var value;
	    if (typeof(data[name]) != 'undefined') {
	        value = data[name];
	    } 
	    return value;
	}
}
