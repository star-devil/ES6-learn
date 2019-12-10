"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

function promisify(func) {
  return function () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    return new Promise(function (res, rej) {
      func.apply(void 0, arg.concat([function (err, data) {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      }]));
    });
  };
}

var readFile = promisify(fs.readFile); // 1.同步的写法执行异步的操作
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

function read1() {
  return _read.apply(this, arguments);
}

function _read() {
  _read = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var val1;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            val1 = null;
            _context.prev = 1;
            _context.next = 4;
            return readFile('../-promise/data/name.txt', 'utf-8');

          case 4:
            val1 = _context.sent;
            console.log(val1);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log("read1", _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _read.apply(this, arguments);
}

function read2() {
  return _read2.apply(this, arguments);
}

function _read2() {
  _read2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var val2;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            val2 = null;
            _context2.prev = 1;
            _context2.next = 4;
            return readFile('../-promise/data/number.txt', 'utf-8');

          case 4:
            val2 = _context2.sent;
            console.log(val2);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log("read1", _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _read2.apply(this, arguments);
}

function read3() {
  return _read3.apply(this, arguments);
}

function _read3() {
  _read3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var val3;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            val3 = null;
            _context3.prev = 1;
            _context3.next = 4;
            return readFile('../-promise/data/score.txt', 'utf-8');

          case 4:
            val3 = _context3.sent;
            console.log(val3);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log("read1", _context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _read3.apply(this, arguments);
}

function readAll() {
  for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arg[_key2] = arguments[_key2];
  }

  arg.forEach(function (ele) {
    ele.apply(void 0, arg);
  });
}

readAll(read1, read2, read3);
