const a = [{ key: 1 }, { key: 2 }]
const b = [{ key: 1 }, { key: 3 }]
const map = (arr, key) => arr.reduce((last, item) => {
  last[item[key]] = item
  return last
}, {})

const reduce = obj => Object.keys(obj).map(key => obj[key])
console.log(reduce(Object.assign(map(a, 'key'), map(b, 'key'))))
