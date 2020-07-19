import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);

const assert = chai.assert;
import Promise from "../src/promise";

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  });
  // it("new Promise() 如果接受的不是一个函数就报错", () => {});
  // it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {});
  // it("new Promise(fn) 中的 fn 立即执行", () => {});
  // it("new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数", done => {});
  // it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", done => {});
  // it("promise.then(null, fail) 中的 fail 会在 reject 被调用的时候执行", done => {});
  // it("2.2.1 onFulfilled和onRejected都是可选的参数：", () => {});
  // it("2.2.2 如果onFulfilled是函数", done => {});
  // it("2.2.3 如果onRejected是函数", done => {});
  // it("2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数", done => {});
  // it("2.2.4 失败回调", done => {});
  // it("2.2.5 onFulfilled和onRejected必须被当做函数调用", done => {});
  // it("2.2.6 then可以在同一个promise里被多次调用", done => {});
  // it("2.2.6.2 then可以在同一个promise里被多次调用", done => {});
});