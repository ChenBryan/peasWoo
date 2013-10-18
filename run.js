/**
 * @fileOverview : woo 启动 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2012年12月25日 星期二 21时50分50秒
 * @filename : run.js
 * @version : v1.0
 * @description : woo node框架启动
 */

global.woo = {
    
    baseDir  : __dirname,
    
    frameDir : __dirname+'/frame/',

    publicDir : __dirname+'/public/',

    appDir : __dirname+'/app/',

    controllerDir : __dirname+'/app/controller/',

    modelDir : __dirname+'/app/model/',

    viewDir : __dirname+'/app/view/',

    develop : '127.0.0.1:8888',

    product : 'www.test.com',
   
    os : require('os'), 
    
    http : require('http'),
    
    url : require('url'),
    
    querystring : require('querystring'),
    
    path : require('path'),
    
    process : require('process'),
    
    fs : require('fs'),

    mysql : require('mysql'),
    
    jst : require('ejs'), //JS模板
   
    eventproxy : require('eventproxy') 
};

function run() {
   //浏览器chrome每次都会发送favicon.ico得请求,等于刷新一次，请求2次
   function onRequest(req, res) {
         global.woo.exception = require(global.woo.frameDir+'exception.js').exception;
         //通过域名判断生产环境与开发环境配置
         global.woo.config = require(global.woo.baseDir+'/config.js').config(req);
         global.woo.db = require(global.woo.frameDir+'db.js').db;
         global.woo.request = require(global.woo.frameDir+'request.js').request;
         global.woo.router = require(global.woo.frameDir+'router.js').router;
	 //global.woo.exception.write(404,'',res);
         //路由
         global.woo.router.init(req,res);
         global.woo.request.init(req,res);
   }
   global.woo.http.createServer(onRequest).listen(8888);
   console.log("Server has started.");
}
//启动
run();
