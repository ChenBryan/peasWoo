/**
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月15日 星期二 22时49分11秒
 * @filename : frame/db.js
 * @version : 
 * @description : 
 */

exports.db =  {
       
       /**
	* 缓存对象
	*/
	req : null,
	res : null,
	mysql : global.woo.mysql,
	config : global.woo.config,
	exception : global.woo.exception,

       /**
	* 数据库初始化
	*/
	init : function(){},

        /**
	 * mysql数据库
	 */
	mysqlDB : function() {
	   var tthis = this,
	       mysql = tthis.mysql.createClient({
		  host : tthis.config.mysql.host,
		  port : tthis.config.mysql.port,
		  user : tthis.config.mysql.user,
		  password : tthis.config.mysql.pass
	      });
	      mysql.query('use ' + tthis.config.mysql.database);
	      return mysql;
        },

        /**
	 * mssql数据库
	 */
	mssqlDB : function() {
	   
	}
};

