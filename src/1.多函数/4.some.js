function analyzePagePath(compositeName, realPath) {
  if (compositeName !== '') {
    return `复合组件:${compositeName}`
  }

  if (realPath.includes('Dialog')) {
    return `弹出框:${realPath[realPath.indexOf('Dialog') + 1] || ''}`
  }
  return '当前页面'
}

function a(compositeName) {
  if (compositeName !== '') {
    return `复合组件:${compositeName}`
  }
}
function b(compositeName, realPath) {
  if (realPath.includes('Dialog')) {
    return `弹出框:${realPath[realPath.indexOf('Dialog') + 1] || ''}`
  }
}
function c() {
  return '当前页面'
}

const ret = (...funs) => (...argv) => funs.reduce((ret, fun) => ret === undefined ? fun(...argv) : ret, undefined)

console.log(ret(a, b, c)('xxx', ['Dialog', 'aaa']))