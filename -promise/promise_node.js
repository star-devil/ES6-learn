//require是CommonJS的语法，
//CommonJS的模块是对象，输入时必须查找对象属性。
let fs = require('fs');

    
    //需求：
    // data文件中的个文件中都存着另一个文件的相对地址，
    // 通过回调得到最终文件中的data

// 拙劣的表演:

//读取文件的操作时异步操作，会产生回调地狱：
// fs.readFile('data/name.txt','utf-8',(err,data) =>{
//     // console.log(data);    //--->将读取到文件中的数据
//     fs.readFile(data,'utf-8',(err,data) => {
//         fs.readFile(data,'utf-8',(err,data) =>{
//             console.log(data); 
//         })
//     })
// })

//异步操作时的try...catch不好捕获，除非是：
//①把捕获写在异步函数内部
//②前端中调用window.onerror = function () {}捕获错误；
// 后台中用process.on('uncaughtException',(err) => {});去捕获


//异步操作时会有并发执行的结果不好获取，比如:
// 要获取某个文件中的信息，并在获取完之后全部输出
// let oNum = {};
// function show (data) {
//     console.log(data)
// }
// function show2 (data) {
//     console.log(data,2)
// }
// fs.readFile('number/numone.txt','utf-8',(err,data) => {
//     if(data) oNum.numone = data;
//     // newShow(oNum);
//     Store.fire(oNum);
// })
// fs.readFile('number/numtwo.txt','utf-8',(err,data) => {
//     if(data) oNum.numtwo = data;
//     // newShow(oNum);
//     Store.fire(oNum);
// })
// fs.readFile('number/numthree.txt','utf-8',(err,data) => {
//     if(data) oNum.numthree = data;
//     // newShow(oNum);
//     Store.fire(oNum);
// })

// 介个after只能传一个回调函数
// function after(times,cb) {
//     return function() {
//         --times ==0 && cb.apply(null,arguments);
//     }
// }

// let newShow = after(3,show);

//所以引入promise中的一个发布订阅概念
// let Store = {
//     list: [],
//     times: 3,
//     subscribe (func) {
//         this.list.push(func)
//     },
//     fire(...arg) {
//         --this.times == 0 && this.list.forEach((ele) =>{
//             ele.apply(null,arg);
//         })
//     }
// }

// Store.subscribe(show);
// Store.subscribe(show2);

//promise的使用请看html

//用promise改写上述的回调
function readFile (path) {
    return new Promise((res,rej) => {
        fs.readFile(path,'utf-8',(err,data) => {
            if(data) {
                res(data);
            }
        })
    })
}
readFile('data/name.txt').then((data)=>{
    return readFile(data);
}).then((data) => {
    return readFile(data);
}).then((data) => {
    console.log(data)
})