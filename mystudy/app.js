var express = require("express");
var app = express();
// 设置回调函数名字
app.set('jsonp callback name', 'cb');

var cors = require("cors");

// 延迟两秒响应请求 模拟网络差
// app.use(function(req,res,next){
//     setTimeout(() => {
//         next();
//     }, 2000);
// })


// 引入接口模块
var api = require("./api/api.js")

// 跨域资源共享
app.use(cors());


// app.use(function(req,res,next){

// 	setTimeout(function(){

// 		next();

// 	},1000)

// })


// 静态资源处理
app.use(express.static("public"));



app.use("/api", api);
var fs = require("fs");
app.use((req, res, next) => {
    fs.readFile("./public/index.html", (err, data) => {
        res.end(data);
    })
})
let duankou = 9527
app.listen(9527)
console.log('9527开启')
