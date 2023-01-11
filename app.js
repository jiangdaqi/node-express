// 引入express
const express = require('express')
// 引入cors跨域中间件
const cors = require('cors')
// 引入路由模块
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const userArticle = require('./router/article')
const Joi = require('joi')
// 引入解析token的express-jwt
const expressJwt = require('express-jwt')
const { config } = require('./db')
const globlConfig = require('./config')
// 注册应用
const app = express()

// 注册中间件
app.use(cors())
app.use(express.urlencoded({extended:false}))
// 注册请求回调中间件
app.use((req,res,next)=>{
    res.requestHandler = (message,status=1)=>{
        res.send({
            status:status,
            message:message instanceof Error ? message.message : message
        })
    }
    next()
})
app.use(expressJwt({secret:globlConfig.jwtSecretkey}).unless({path:[/^\/api/]}))
// 挂载路由
app.use('/api',userRouter)
app.use('/my',userInfoRouter)
app.use('/my/article',userArticle)

// 注册全局错误中间件
app.use((err,req,res,next)=>{
    console.log('校验',err);
    if(err.name == 'UnauthorizedError'){
        return res.requestHandler('身份认证失败')
    }
    if(err instanceof Joi.ValidationError){
        console.log('joi校验失败');
        return res.requestHandler(err)
    }
    res.requestHandler('未知错误')
})
// 启动端口监听
app.listen(8081,()=>{
    console.log('your server is running at http://127.0.0.1')
})