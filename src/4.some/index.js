const some = (...funs) => (...args) => funs.reduce((last, fun) => last === undefined ? fun(...args) : last, undefined)
module.exports = some
