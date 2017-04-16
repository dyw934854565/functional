## 入门知识：高阶函数
很多同学不理解高阶函数，这里做一个简单的说明
```
const func = handle => callback => (...initArgs) => handle(callback)(...initArgs)
const ajax = cb => (...initArgs) => {
  console.log(...initArgs)
  // 伪代码
  // request(initArgs, response => {
  cb('模拟返回数据')
  // })

}
func(ajax)(data => { console.log(data)})('ajax请求参数')
```

看到这么多箭头函数，我们应该如何分析呢？

这里有两个函数，func是高阶套高阶。而ajax就是个普通的高阶函数。

func函数执行时候，分别传入`ajax,data => { console.log(data)},'ajax请求参数'。也就是说，执行一次返回第二个高阶函数`callback => (...initArgs) => handle(callback)(...initArgs)`，
再传入callback执行返回`(...initArgs) => handle(callback)(...initArgs)`,再传入initArgs执行`handle(callback)(...initArgs)`并返回结果，也就是ajax函数开始执行。

紧接着ajax的传入参数，cb就是`handle(callback)(...initArgs)`中的callback，也就是func函数执行中传入的`data => { console.log(data)}`,初始化参数就是`'ajax请求参数'`。
ajax执行完毕后会执行cb，也就是callback，把服务端返回数据data传给cb，也就执行了也就是callback函数。

**所以，遇到`const a => b => c => d => b+c+d`的同学，不要头晕，只需要按照声明的顺序传入参数即可，`a(b)(c)(d)`**

## 1. compose
依次执行参数中的函数数组，把每个函数的返回值传入下个函数的第一个参数中，返回最后一个函数的返回值。



