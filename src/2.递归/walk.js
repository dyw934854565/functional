const data = require('./easy-data')

function walk(obj, childrenName, handler, handlePath = () => {}, path = [], realPath = []) {
  handler(obj, path, realPath)
  if (obj[childrenName] !== undefined && Array.isArray(obj[childrenName])) {
    obj[childrenName].forEach((child, index) => {
      const childPath = handlePath(child, [childrenName, index])
      walk(child, childrenName, handler, handlePath, path.concat([childrenName, index]), realPath.concat(childPath !== undefined ? childPath : [childrenName, index]))
    })
  }
}

walk(data, 'children', (item, path, realPath) => {
  // console.log(path)
  if (realPath.includes('Dialog')) {
    console.log(realPath[realPath.indexOf('Dialog') + 1])
  }
}, (item, [childrenName, index]) => [item.type, item.bind, childrenName, index])
