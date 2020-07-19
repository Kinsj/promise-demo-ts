import { type } from "os";

class Promise2 {
  success = null
  resolve() {
    setTimeout(() => {
      if (typeof this.success === 'function') {
        this.success();
      }
    })
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Promise 只接受函数作为参数')
    }
    fn(
      this.resolve.bind(this),
      () => { }
    );
  }
  then(fn) {
    this.success = fn;
  }
}

export default Promise2;