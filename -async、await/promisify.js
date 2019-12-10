let fs = require('fs');

// promisify 针对的是error-first方法
// 对某些方法进行promise化，使用哪个方法时再去调用promisify方法
function promisify (func) {
    return function(...arg) {
        return new Promise((res,rej) =>{
            func(...arg,(err,data) => {
                if(err){
                    rej(err);
                }else{
                    res(data);
                }
            })
        })
    }
}
let readFile = promisify(fs.readFile);
readFile('../-promise/data/name.txt','utf-8').then((val) =>{
       return readFile(val,'utf-8');
},(reason) =>{
    console.log(reason)
}).then((val) => {
    return readFile(val,'utf-8');
},(reason) =>{
    console.log(reason)
}).then((val) =>{
    console.log(val)
},(reason) =>{
    console.log(reason);
})

// 对某个对象上的所有方法进行promisify,统一一个接口进行调用
function promisifyAll (obj) {
    for(let i in obj){
        let fn = obj[i];
        if(typeof fn === 'function'){
            obj[i + 'Async'] = promisify(fn); 
        }
    }
}
promisifyAll(fs);
fs.readFileAsync('data/number.txt','utf-8').then((val)=>{
    console.log(val);
});


///bluebird 和 p  库中有这些方法