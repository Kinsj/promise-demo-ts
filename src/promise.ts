class Promise2 {
  callList = []
  status = 'pending'
  resolve(res) {
    if(this.status !== 'pending') return;
    this.status = 'fulfilled'
    setTimeout(() => {
      this.callList.forEach(callback => {
        if (typeof callback[0] === 'function') {
          callback[0].call(undefined, res);
        }
      })
    })
  }
  reject(res) {
    if(this.status !== 'pending') return;
    this.status = 'rejected'
    setTimeout(() => {
      this.callList.forEach(callback => {
        if (typeof callback[1] === 'function') {
          callback[1].call(undefined, res);
        }
      })
    })
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Promise 只接受函数作为参数')
    }
    fn(
      this.resolve.bind(this),
      this.reject.bind(this)
    );
  }
  then(success?, fail?) {
    const handle = [
      typeof success === 'function' ? success : null,
      typeof fail === 'function' ? fail : null
    ]
    this.callList.push(handle)
  }
}

export default Promise2;