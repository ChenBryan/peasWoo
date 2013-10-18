/**
 * @fileOverview : index 控制器 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月14日 星期一 22时01分40秒
 * @filename : app/controller/index.js
 * @version : v1.0 
 * @description : index 控制器
 */

exports.index = {

       /**
	* 缓存对象
	*/
	req : null,
	res : null,
	fs : global.woo.fs,
	exception : global.woo.exception,
       	viewDir : global.woo.viewDir,
       	jst : global.woo.jst,
        htmlVar : null,
       
       /**
        * 初始化
	*/
	init : function(req,res) {
            this.req = req;
	    this.res = res;
	    this.display();
	},
 
       /**
        * 显示输出
	*/
	display : function() {
         
	    htmlFile = this.fs.readFileSync(this.viewDir + 'index.html','utf-8');  
            htmlVar = this.jst.render(htmlFile, {
	       title : 'Welcome to Woo!',
	       obj : {
	          a : 'obj.a'
	       }
            });
            this.res.writeHead(200, {"Content-Type": "text/html"});                                                                                      this.res.write(htmlVar);
	    this.res.end();   
	},

};
