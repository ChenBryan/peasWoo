/**
 * @fileOverview : 异常类
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年01月05日 星期六 22时29分08秒
 * @filename : frame/exception.js
 * @version : v1.0
 * @description : 异常类
 */

exports.exception = { 
    
    httpCode : {
	     400 : 'Bad Request',
	     401 : 'Unauthorized',
	     403 : 'Forbidden',
	     404 : 'Not Found',
	     412 : 'Precondition Failed',
	     500 : 'Internal Server Error'
    },

    write : function(code,msg,res) {
       if (code > 1000) {
           this.output(code,msg,res);
       } else {
           if (msg == '') {
               msg = this.httpCode[code];
	   }
           this.output(code,msg,res);
       }
       return;
    },

    output : function(code,msg,res) {
      //日志记录

      res.writeHead(code,{"Content-Type":"text/plain"});
      res.write(code + ' '  + msg);
      res.end(); 
    }
};


