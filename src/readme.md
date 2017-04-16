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

用来拆解大函数，函数内部过程执行大量逻辑，每段逻辑均有关联，比如依赖上一段逻辑的返回。

low b:
```
const { trust } = require('../../../common/util')

// 模拟函数
const checkUserInput = ({ username, password }) => {
  if (!trust(username) || !trust(password)) {
    throw new Error('用户名或者密码不能为空')
  }
  return { username, password }
}
const checkUserInfo = ({ username, password }) => ({ status: 'normal', id: '100' })
const analyzeTocken = ({ status, id }) => ({ status: 'normal', id: '100', name: 'lhj', tocken: 'zHcuqhrehduqwexxx' })
const login = user => ({ redirectUrl: 'http://www.taobao.com/' })
const redirect = feedback => ({ code: '10000' })

// 重构前代码
function enter(input) {
  // 客户端校验用户名密码是否填写
  checkUserInput(input)

  // 服务端校验用户名密码是否正确
  const { status, id } = checkUserInfo(input)

  // 获取用户 Tocken
  const user = analyzeTocken({ status, id })

  // 登录
  const feedback = login(user)

  // 跳转
  return redirect(feedback)
}

console.log(enter({username: 'aa', password: 'bb'}))
```

nb:
```
const { trust } = require('../../../common/util')
const compose = require('../')

// 模拟函数
const checkUserInput = ({ username, password }) => {
  if (!trust(username) || !trust(password)) {
    throw new Error('用户名或者密码不能为空')
  }
  return { username, password }
}
const checkUserInfo = ({ username, password }) => ({ status: 'normal', id: '100' })
const analyzeTocken = ({ status, id }) => ({ status: 'normal', id: '100', name: 'lhj', tocken: 'zHcuqhrehduqwexxx' })
const login = user => ({ redirectUrl: 'http://www.taobao.com/' })
const redirect = feedback => ({ code: '10000' })

// 重构后代码
const enter = compose(checkUserInput, checkUserInfo, analyzeTocken, login, redirect)

console.log(enter({username: 'aa', password: 'bb'}))
```

## 2. concat
依次执行参数中的函数数组，每个函数的参数相同，返回每个函数的返回值数组。

用来拆解大函数，函数内部过程执行大量逻辑，每段逻辑没有任何关联。

low b:
```
function before(...args){
  console.log(...args)
  return '验证通过'
}

function upload(...args){
  console.log(...args)
  return '上传完毕'
}

function after (...args) {
  console.log(...args)
  return '本地缓存完毕'
}


function handle(...args) {
  return [before(...args), upload(...args), after(...args) ]
}

console.log(handle({
  name: 'test.txt',
  path: '/user/lihongji/work/test.txt',
  size: '15kb',
}))
```

nb:
```
const concat = require('../')

function before(...args){
  console.log(...args)
  return '验证通过'
}

function upload(...args){
  console.log(...args)
  return '上传完毕'
}

function after (...args) {
  console.log(...args)
  return '本地缓存完毕'
}

const handle = concat(before, upload, after)

console.log(handle({
  name: 'test.txt',
  path: '/user/lihongji/work/test.txt',
  size: '15kb',
}))
```

## 3. switcher
根据参数配置类型执行配置表中的函数，返回函数执行的返回值

消除函数内if,switch.把逻辑判断改成配置表。

low b:
```
function clearMemory(){
  console.log('clearMemory', arguments)
  return '内存清除完毕'
}

function clearCache(){
  console.log('clearCache', arguments)
  return '缓存清除完毕'
}

function clearBuffer () {
  console.log('clearBuffer', arguments)
  return '缓冲清除完毕'
}

function clear(type, ...args) {
  switch (type) {
    case 'memory':
      return clearMemory(...args)
    case 'cache':
      return clearCache(...args)
    case 'buffer':
      return clearBuffer(...args)
    default:
      return
  }
}

console.log(clear('memory', 1,2,3))
```

nb:
```
const switcher = require('../')

function clearMemory(){
  console.log('clearMemory', arguments)
  return '内存清除完毕'
}

function clearCache(){
  console.log('clearCache', arguments)
  return '缓存清除完毕'
}

function clearBuffer () {
  console.log('clearBuffer', arguments)
  return '缓冲清除完毕'
}

const clear = switcher({
  memory: clearMemory,
  cache: clearCache,
  buffer: clearBuffer,
})

console.log(clear('memory', 1,2,3))
```

## 4. switcher
依次执行参数中的函数数组，返回第一个有返回值的函数的返回值。

重构同一函数内有大量校验函数的代码。

low b:
```
function validateNull(obj) {
  if (!obj) {
    return '年龄不能为空'
  }
}

function validateNumber(obj) {
  if (parseInt(obj) != obj) {
    return '年龄必须为自然数'
  }
}

function pass() {
  return '验证通过'
}


function validator(obj) {
  const r1 = validateNull(obj)
  if(r1) {
    return r1
  }

  const r2 = validateNumber(obj)
  if(r2) {
    return r2
  }

  return pass()
}

console.log(validator('55'))
```

nb:
```
const some = require('../')

function validateNull(obj) {
  if (!obj) {
    return '年龄不能为空'
  }
}

function validateNumber(obj) {
  if (parseInt(obj) != obj) {
    return '年龄必须为自然数'
  }
}

function pass() {
  return '验证通过'
}

console.log(some(validateNull, validateNumber, pass)('55'))
```