const func = handle => callback => (...initArgs) => handle(callback)(...initArgs)
const ajax = cb => (...initArgs) => {
  console.log(...initArgs)
  // 伪代码
  // request(initArgs, response => {
  cb('模拟返回数据')
  // })

}
func(ajax)(data => { console.log(data)})('ajax请求参数')