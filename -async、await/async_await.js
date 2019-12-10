let fs = require('fs');

function promisify(func) {
    return function (...arg) {
        return new Promise((res, rej) => {
            func(...arg, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data)
                }
            })
        })
    }
}

let readFile = promisify(fs.readFile);


// 1.同步的写法执行异步的操作
// 2.捕获异常 try...catch
// async function read(url, unicode) {
//     try {
//         let val1 = await readFile(url, unicode);
//         let val2 = await readFile(val1, unicode);
//         let val3 = await readFile(val2, unicode);
//         return val3;
//     } catch (e) {
//         console.log("异步异常：", e)
//     }

// }

// read('../-promise/data/name.txt', 'utf-8').then((val) => {
//     console.log("分数", val);
// }, (reason) => {
//     console.log("错误", reason);
// })

// 3.同步获取异步执行的结果,之前是用的Promise.all()方法处理。当需求是想获取到异步中成功的部分结果时all方法无法满足
// 简化代码还没做，先去看后面了
async function read1 () {
    let val1 = null;
    try{
        val1 = await readFile('../-promise/data/name.txt','utf-8');
        console.log(val1);
    }catch (e) {
        console.log("read1",e)
    }
}
async function read2 () {
    let val2 = null;
    try{
        val2 = await readFile('../-promise/data/number.txt','utf-8');
        console.log(val2);
    }catch (e) {
        console.log("read1",e)
    }
}
async function read3 () {
    let val3 = null;
    try{
        val3 = await readFile('../-promise/data/score.txt','utf-8');
        console.log(val3);
    }catch (e) {
        console.log("read1",e)
    }
}
function readAll (...arg) {
    arg.forEach((ele) =>{
        ele(...arg);
    })
}
readAll(read1,read2,read3);