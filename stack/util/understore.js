const keys = Object.keys

class _ {

  /* 链式操作 */
  static then(callback) {
    this.next = callback(this.data)
    return this
  }

  static chain(props) {
    this.data = props
    return this
  }

  static tap(callback) {
    callback(this.data)
    return this
  }

  /* 数组操作 */
  static push(item) {
    console.log(this)
    this.data.push(item)
    return this
  }

  static all(...args) {
    return args.reduceRight((truth, f)=> (truth && f()), true)
  }

  static any(...args) {
    return args.reduceRight((truth, f)=> (truth || f()), false)
  }

  /* 对象操作 */
  static map(object, callback) {
    return keys(object).map((key, index) => callback(object[key], key, index, object))
  }

  /* 取值函数 */
  static value() {
    return this.data
  }

  /* 工具函数 */
  static identity(value) {
    return value
  }

  static range(start, stop, step) {
    const array = []
    if (start > stop) {
      for (let i = start; i >= stop; i = i - (step || 1)) {
        array.push(i)
      }
    } else {
      for (let i = start; i <= stop; i = i + (step || 1)) {
        array.push(i)
      }
    }
    return array
  }
}

_.keys = keys

module.exports = _