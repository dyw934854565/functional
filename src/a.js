const func = handle => (...initArgs) => callback => handle(callback)(...initArgs)
const ajax = cb => (...initArgs) => cb('模拟返回数据')
func(ajax)('初始化参数')(data => { console.log(data)})