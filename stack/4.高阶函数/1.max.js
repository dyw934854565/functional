const max = (data) => {
  return data.reduce((maxer, next) => {
    return maxer > next ? maxer : next
  })
}

console.log(max([5, 1, 3, 4, 2]))

