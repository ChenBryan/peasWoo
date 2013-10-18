/**
 * @fileOverview :  路由分发器模块
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月05日 星期六 21时54分40秒
 * @filename : frame/router.js
 * @version : v1.0
 * @description : 路由分发器模块
 */

exports.router = {
       
       /**
        * 缓存对象
	*/
       req : null,
       res : null,
       url : global.woo.url,
       querystring : global.woo.querystring,
       path : global.woo.path,
       exception : global.woo.exception,
       request : global.woo.request,

       /**
        * 路由初始化
	* @param req {obj} 请求对象
	* @param res {obj} 输出对象
	*/
       init : function(req,res){
          this.req = req;
	  this.res = res;
	  this.dispatcher();
	  //console.log(this.request);
          //this.request.init(req,res);	  
       },

       /**
	* 映射到对应得控制器
	*/
	controllerFunc : function(name,controller,func) {
	   if (typeof(controller[name][func]) ===  'function') { 
	       controller[name][func](this.req,this.res);
	   } else {
	       console.log('the controller' + name + ' function '+ func + 'is not found!');
	       this.exception.write(400,'bad request,the controller '+ name +' function '+ func + ' is not found!',this.res);
	   }
	},

	/**
	 * 路由分发器 
	 * @param req {obj} 请求对象
	 * @param res {obj} 输出对象
	 */
	dispatcher : function() {
	   /**判断文件这里使用得是异步**/
           this.parseRequest();	  
	},
        
	/**
         * 解析url
	 */
        parseRequest : function() {
	    var file = 'index',
	        func = 'init',
	        pathArr = [],
		pathName = this.url.parse(this.req.url).pathname;
	    
	    if (pathName == '/favicon.ico') {
	        return ;
	    } else if (pathName == '/') {
	        file = 'index';
	    } else {
	        //pathArr = pathName.split(this.path.sep);//没有该版本nodejs 无path.sep
	        pathArr = pathName.split('/');
               
	        //目前的路由能力比较简单，只能处理2级情况,报错情况处理等需完善
		if (typeof(pathArr[1]) != 'undefined') {
		   file = pathArr[1];
		} else {
		   console.log('bad request,the url is wrong');
		   this.exception.write(400,'bad request,the url is wrong!',this.res);
		}

		if (typeof(pathArr[2])!== 'undefined') {
		    func = pathArr[2];
		}
	    }

            this.fileExists(file,func);
        },
       
        /**
         * 判断文件是否存在
	 */
        fileExists : function(file,func) {
          var tthis = this,
	      controller,
              realPath = global.woo.controllerDir + file + '.js';
	     
	      //同步版 path.existsSync(filePath):boolean
	      this.path.exists(realPath,function(exists){
		  if(!exists) {
		     console.log('404 the page not find!');
		     tthis.exception.write(404,'the page not find!',tthis.res);
		  } else {
		     controller = require(realPath); 
		     tthis.controllerFunc(file,controller,func);
		  }
	      }); 
        },

	/**
         * 返回favicon.ico 
	 */
	getFavicon : function() {
	
	
	}

};

