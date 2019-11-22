"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

// let s=10;
// const a=100;
// let b = 10;
// {
//     console.log(b);
//     let b = 20;
// }
// var arr = [];
// for(var i = 0; i < 10; i++) {
//     arr[i] = function () {
//         console.log(i);
//     }
// }
// arr[0]();
// arr[4]();
// arr[7]();
// let arr = [];
// for(let i = 0; i < 10; i++) {
//     arr[i] = function () {
//         console.log(i);
//     }
// }
// arr[0]();
// arr[4]();
// arr[7]();
var P = 20;
P = (_readOnlyError("P"), 10);
console.log(P); // const W;
// W = 20;
// console.log(W);
// const E = {};
// E.name = 20;
// E.name = 10;
// console.log(E.name);
// let b;
