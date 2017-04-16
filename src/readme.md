
## 1. 高阶函数
很多同学不理解高阶函数，这里做一个简单的说明
```
const func = handle => (...initArgs) => callback => handle(callback)(...initArgs)
const ajax = cb => (...initArgs) => cb('模拟返回数据')
func(ajax)('初始化参数')(data => { console.log(data)})
```

看到这么多箭头函数，我们应该如何分析呢？

这里有两个函数，func是高阶套高阶。而ajax就是个普通的高阶函数。

func函数执行时候，分别传入ajax,initArgs。也就是说，执行一次返回第二个高阶函数`(...initArgs) => callback => handle(callback)(...initArgs)`，再传入(...initArgs)返回`callback => handle(callback)(...initArgs)`

所以，遇到`const a => b => c => d => b+c+d`的同学，不要头晕，只需要按照声明的顺序传入参数即可，`a(b)(c)(d)`


## 1. compose
依次执行参数中的函数数组，把每个函数的返回值传入下个函数的第一个参数中，返回最后一个函数的返回值。



