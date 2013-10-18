/**
 * @fileOverview : 数据库连接测试
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月15日 星期二 22时39分51秒
 * @filename : app/controller/db.js
 * @version : v1.0
 * @description : 数据库连接测试
 */

exports.test = {
       /**
	* 缓存对象
	*/
	req : null,
	res : null,
	fs : global.woo.fs,
        eventProxy : global.woo.eventproxy,
        request : global.woo.request,
	exception : global.woo.exception,
       	viewDir : global.woo.viewDir,
       	jst : global.woo.jst,
	db : global.woo.db,
        testTableM : require(global.woo.modelDir+'testTableM.js').testTableM, 
       
       
       /**
        * 初始化
	*/
	init : function(req,res) {
            this.req = req;
	    this.res = res;
	    this.display();
	},
 
       /**
        * 显示数据库输出
	*/
	display : function() {
            var tthis = this,
	        sql = 'select * from test',
	        callfunc = function(err, result, fields) {
		  if (err) { 
		    throw err;
		  } else {
		    console.log('records show');
                    var htmlFile = tthis.fs.readFileSync(tthis.viewDir + 'test.html','utf-8');  
			htmlVar = tthis.jst.render(htmlFile, {
			   title : 'this data from table test in Mysql',
			   records : result
			});
			tthis.res.writeHead(200, {"Content-Type": "text/html"});   
			tthis.res.write(htmlVar);
			tthis.res.end();   
		   }
		 }


	    this.testTableM.select(sql,callfunc);     
        },
        
        /**
	 * 异步事件管理器 [主要解决多数据库查询回调的问题]
	 */
        eventProxyTest : function(req,res) {
	    var tthis = this;
	        /**统一从init进入在分配调用方法 */
	        this.req = req;
	        this.res = res;
                var proxy = new this.eventProxy();
	        var render = function(v1,v2,v3,result) {
		    var htmlFile = tthis.fs.readFileSync(tthis.viewDir + 'eventProxyTest.html','utf-8');  
			htmlVar = tthis.jst.render(htmlFile, {
			   title : 'eventProxy test',
			   v1 : v1,
			   v2 : v2,
			   v3 : v3,
			   records : result
			});
			tthis.res.writeHead(200, {"Content-Type": "text/html"});   
			tthis.res.write(htmlVar);
			tthis.res.end();   
		    
		    }

		    proxy.assign("v1", "v2", "v3","result", render);
		    sql1();
		    sql2();
		    sql3();
		    this.sqltest1(proxy);
       
		    function sql1(){
			proxy.trigger("v1",{a:'a'});
		    }
		    
		    function sql2(){
			proxy.trigger("v2",{b:'b'});
		    }
		    
		    function sql3(){
			proxy.trigger("v3",{c:'c'});
		    }
                     
	},

       /**
        * 显示数据库输出
	*/
	sqltest1 : function(proxy) {
            var tthis = this,
	        sql = 'select * from test',
	        callfunc = function(err, result, fields) {
		    if (err) { 
		       throw err;
		    } else {
		       proxy.trigger("result",result);
		    }
		 }

	    this.testTableM.select(sql,callfunc);     
        },

	/**
	 * request 获取参数
	 */
	getTest : function() {
           console.log(this.request.getValue('test'));              	 
	}

};

