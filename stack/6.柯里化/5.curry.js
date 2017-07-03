console.log([11, 11, 11, 11].map(parseInt))

const curry = fun => args => fun(args)

console.log([11, 11, 11, 11].map(curry(parseInt)))
