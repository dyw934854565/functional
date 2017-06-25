const max = (data, compare = item => item) => {
  return data.reduce((maxer, next) => {
    return compare(maxer) > compare(next) ? maxer : next
  })
}

console.log(max([{ age: 64 }, { age: 32 }, { age: 50 }], item => item.age))