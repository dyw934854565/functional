const switcher = require('../')

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

const clear = switcher({
  memory: clearMemory,
  cache: clearCache,
  buffer: clearBuffer,
})

console.log(clear('memory', 1,2,3))
