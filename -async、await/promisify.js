let fs = require('fs');

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
readFile('./data/number.txt','utf-8').then((val) =>{
    console.log(val);
    // readFile(val,'utf-8')
},(reason) =>{
    console.log(reason)
})
// }).then((val)=>{
//     readFile(val,'utf-8')
// },(reason) =>{
//     console.log(reason)
// }).then((val) =>{
//     console.log(val);
// });

// function promisifyAll (obj) {
//     for(let i in obj){
//         let fn = obj[i];
//         if(typeof fn === 'function'){
//             obj[i + 'Async'] = promisify(fn); 
//         }
//     }
// }
// promisifyAll(fs);
// fs.readFileAsync('data/number.txt','utf-8').then((val)=>{
//     console.log(val);
// });


///bluebird 和 p  库中有这些方法