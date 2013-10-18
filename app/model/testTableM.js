/**
 * @fileOverview : 表test查询模型 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月15日 星期二 23时06分38秒
 * @filename : app/model/testTableM.js
 * @version : v1.0
 * @description : 表test查询模型 
 */

 
exports.testTableM = {
     
     mysql : global.woo.db.mysqlDB(), 
     
     /**
      * 初始化
      */
     init : function(){
       
     },
     
     /**
      * 查询处理
      */
     select : function(sql,func) {
	 console.log(this.mysql.query); 
	 this.mysql.query(sql,func);
     }

};
