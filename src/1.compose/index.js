const compose = (first, ...last) => (...initArgv) => last.reduce((composed, func) => func(composed), first(...initArgv))
module.exports = compose