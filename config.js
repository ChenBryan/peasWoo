/**
 * @fileOverview : 配置文件
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2012年12月25日 星期二 22时51分11秒
 * @filename : config.js
 * @version : v1.0
 * @description : 配置文件
 */
    
var config = function(req){
        var hostname = req.headers.host,
	    config;
	    
	    if (global.woo.develop == hostname) {
	       //开发模式配置
	       config = {
		     mysql :  {
			 host : '127.0.0.1',
			 user : 'root',
			 pass : '123',
			 database : 'test',
			 port : 3306
                     }
	       };

	    } else {
	       //生产模式配置 
	       config = {
	       
	       
	       };
	    }
	return config;
    };

exports.config = config;

