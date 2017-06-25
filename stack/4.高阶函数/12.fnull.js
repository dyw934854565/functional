const nums = [1, 2, 3, null, 5]

const fillnull = (handle, ...args) => (...argvs) => handle(...argvs.map((argv, i) => argv || args[i]))

console.log(nums.reduce(fillnull((total, n) => {
  return total * n
}, 1, 1)))

const identity = prop => prop

const defaults = d => (o, k) => {
  const val = fillnull(identity, d[k])
  return o && val(o[k])
}

const ages = [{ age: 100 }, { age: 120 }, { age: 150 }, { }, { age: 30 }]

const lookup = defaults({ age: 0 })

console.log(ages.reduce((total, age) => {
  return total + lookup(age, 'age')
}, 0))

