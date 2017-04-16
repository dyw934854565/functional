const switcher = map => (type, ...args) => map[type] ? map[type](...args) : undefined
module.exports = switcher

