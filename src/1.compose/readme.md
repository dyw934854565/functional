## compose
### 用途：
把一个长函数分成多个小函数，用来解构长函数。

### 用法
```
compose(fn1,fn2,fn3...)(...initArgs)
```
依次执行函数fn1,fn2,fn3...。initArgs作为初始化参数传递给第一个函数。每个函数的返回值传递给下个函数的第一个参数。

### 源码
```
const compose = (first, ...last) => (...initArgv) =>
  last.reduce((composed, func) =>
    func(composed), first(...initArgv))
```

### 实现
源码仅有一行，实现非常简单。

`last.reduce`循环所有参数中传入函数（即fn1,fn2,fn3...）。

`first(...initArgv)`执行第一个函数（即为fn1），返回结果即为`composed`（不明白reduce的同学参考ecmascript5 reduce api）

`func(composed)`composed作为参数又传入到下一个func（即为fn2）函数中，执行fn2，fn2返回后又为composed，composed作为参数传给fn3，最后返回fn3的返回值。

### 例子

1. 不使用compose(./examples/old.js)
2. 使用compose(./examples/test.js)





