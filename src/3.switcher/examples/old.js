function clearMemory(){
  console.log('clearMemory', arguments)
  return '内存清除完毕'
}

function clearCache(){
  console.log('clearCache', arguments)
  return '缓存清除完毕'
}

function clearBuffer () {
  console.log('clearBuffer', arguments)
  return '缓冲清除完毕'
}

function clear(type, ...args) {
  switch (type) {
    case 'memory':
      return clearMemory(...args)
    case 'cache':
      return clearCache(...args)
    case 'buffer':
      return clearBuffer(...args)
    default:
      return
  }
}

console.log(clear('memory', 1,2,3))
