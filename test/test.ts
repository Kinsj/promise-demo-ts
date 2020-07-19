import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);

const assert = chai.assert;
import Promise from "../src/promise";
import { promises } from "dns";

describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  });
  it("new Promise() 如果接受的不是一个函数就报错", () => {
    assert.throw(() => {
      //@ts-ignore
      new Promise()
    })
    assert.throw(() => {
      new Promise(123)
    })
    assert.throw(() => {
      new Promise(true)
    })
  });
  it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {
    const p = new Promise(() => { })
    assert.isFunction(p.then)
  });
  it("new Promise(fn) 中的 fn 立即执行", () => {
    const fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  });
  it("new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数", () => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
    })
  });
  it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", done => {
    const success = sinon.fake()
    const p = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      })
    })
    p.then(success);
  });
  it("promise.then(null, fail) 中的 fail 会在 reject 被调用的时候执行", done => {
    const fail = sinon.fake()
    const p = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject();
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      })
    })
    p.then(null, fail);
  });
  it("2.2.2 onFulfilled一定是在status为fulfilled后调用，它接受参数，且只调用一次", done => {
    const fn = sinon.fake()
    const p = new Promise((resolve, reject) => {
      assert.isFalse(fn.called)
      resolve(233)
      resolve(333)
      setTimeout(() => {
        assert(p.status === 'fulfilled')
        assert(fn.called && fn.calledOnce)
        assert(fn.calledWith(233))
        done();
      })
    })
    p.then(fn)
  });
  it("2.2.3 onRejected 一定是在status为rejected后调用，它接受参数，且只调用一次", done => {
    const fn = sinon.fake()
    const p = new Promise((resolve, reject) => {
      assert.isFalse(fn.called)
      reject(233)
      reject(333)
      setTimeout(() => {
        assert(p.status === 'rejected')
        assert(fn.called && fn.calledOnce)
        assert(fn.calledWith(233))
        done();
      })
    })
    p.then(null, fn)
  });
  it("2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数", () => {
    const [succeed, failed] = [sinon.fake(), sinon.fake()]
    const p1 = new Promise((resolve, reject) => {
      resolve(333)
    })
    p1.then(succeed)
    const p2 = new Promise((resolve, reject) => {
      assert.isFalse(succeed.called)
      reject(333)
    })
    p2.then(null, failed)
    assert.isFalse(succeed.called || failed.called)
  });
  it("2.2.5 onFulfilled和onRejected必须被当做函数调用(this为undefined)", done => {
    const fn = function () {
      assert.isUndefined(this)
      done()
    }
    const p = new Promise((resolve, reject) => {
      resolve()
    }).then(fn)
  });
  it("2.2.6 then可以在同一个promise里被多次调用", done => {
    const [fn1, fn2, fn3] = [sinon.fake(), sinon.fake(), sinon.fake()]
    const p = new Promise((resolve, reject) => {
      resolve()
    })
    p.then(fn1)
    p.then(fn2)
    p.then(fn3)
    setTimeout(() => {
      assert(fn1.called && fn2.called && fn3.called)
      done()
    })
  });
});