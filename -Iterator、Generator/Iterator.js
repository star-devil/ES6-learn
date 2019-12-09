// 用迭代生成器改写回调地狱
let fs = require('fs');

function readFile(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
                res(data);
            }
        })
    })
}

// readFile('../-promise/data/name.txt').then((data)=>{
//     return readFile(data);
// }).then((data) => {
//     return readFile(data);
// }).then((data) => {
//     console.log(data)
// })

function *read() {
    let path1 = yield readFile('../-promise/data/name.txt');
    let path2 = yield readFile(path1);
    let path3 = yield readFile(path2);
    return path3;
}

//递归方式解决回调地狱
function co(oPath) {
    return new Promise((res, rej) => {
        let next = (data) => {
            let {value,done} = oPath.next(data);
            if (done) {
                res(value)
            } else {
                value.then((val) => {
                    next(val);
                },rej)   //这里只写rej就够了 不要写成rej('')
            }
        }
        next();
    })
}
co(read()).then((val)=>{
    console.log(44,val)
},(reason)=>{
    console.log(reason);
});
