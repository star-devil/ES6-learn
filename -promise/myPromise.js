function MyPromise(executor) {
    var self = this;
    self.status = "pending";
    self.resolveVal = null;
    self.rejectReason = null;
    self.resolveCallbackList = [];
    self.reasonCallbackList = [];

    function resolve(val) {
        if (self.status === "pending") {
            self.status = "Fulfilled";
            self.resolveVal = val;
            self.resolveCallbackList.forEach(function (ele) {
                ele();
            })
        }
    };

    function reject(reason) {
        if (self.status === "pending") {
            self.status = "Rejected";
            self.rejectReason = reason;
            self.reasonCallbackList.forEach(function (ele) {
                ele();
            })
        }
    };

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }

}

//处理返回值为promise对象
function solvePromiseReturn (returnVal,res,rej) {
    if(returnVal instanceof MyPromise){
        returnVal.then(function(val) {
            res(val);
        },function(reason) {
            rej(reason);
        })
    }else{
        res(returnVal);
    }
}

MyPromise.prototype.then = function (onFulfilled, onReject) {
    //空then()
    if (!onFulfilled) {
        onFulfilled = function (val) {
            return val
        }
    };
    // 这里有个问题当返回值为promise对象,且对象的返回值为失败时,如果用了空then(),就会抛出错误
    if (!onReject) {
        onReject = function (reason) {
            throw new Error(reason)
        }
    };
    var self = this;
    //解决链式调用
    //用setTimeOut模拟函数内部的异步调用操作,异步执行和抛出错误
    var nextMyPromise = new MyPromise(function (res, rej) {
        if (self.status === 'Fulfilled') {
            setTimeout(function () {
                try {
                    var nextResolveVal = onFulfilled(self.resolveVal);
                    solvePromiseReturn(nextResolveVal,res,rej);
                } catch (e) {
                    rej(e);
                }
            }, 0)
        }
        if (self.status === 'Rejected') {
            setTimeout(function () {
                try {
                    var newRejectReason = onReject(self.rejectReason);
                    solvePromiseReturn(newRejectReason,res,rej);
                } catch (e) {
                    rej(e)
                }
            }, 0)
        }
        //解决异步操作
        if (self.status === 'pending') {
            self.resolveCallbackList.push(function () {
                setTimeout(function () {
                    try {
                        var nextResolveVal = onFulfilled(self.resolveVal);
                        solvePromiseReturn(nextResolveVal,res,rej);
                    } catch (e) {
                        rej(e);
                    }
                }, 0)
            });

            self.reasonCallbackList.push(function () {
                setTimeout(function () {
                    try {
                        var newRejectReason = onReject(self.rejectReason);
                        solvePromiseReturn(newRejectReason,res,rej);
                    } catch (e) {
                        rej(e)
                    }
                }, 0)
            })

        }
    })
    return nextMyPromise;
}

MyPromise.prototype.race = function(promiseArr) {
    return new MyPromise(function (resolve,reject) {
        promiseArr.forEach(function (promisItem) {
            promisItem.then(resolve,reject);
        })
    })
}

MyPromise.prototype.all = function (promiseArr) {
    return new MyPromise(function (res,rej) {
        var resArr = [];
        // var i = 0;
        promiseArr.forEach(function(promiseItem,i) {
            promiseItem.then((val) =>{
                i++;
                resArr.push(val);
                if(resArr.length == promiseArr.length){
                    res(resArr);
                }
            },(reason)=>{
                rej(reason)
            });
            
        });
        
    })
}