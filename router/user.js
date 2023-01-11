// 引入express
const express = require('express')
// 注册路由实例
const router = express.Router()
// 引入路由处理函数模块
const routerHandler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')
const { userReg } = require('../schema/user')
// 挂载具体路由
router.post('/register',expressJoi(userReg),routerHandler.register)
router.post('/login',expressJoi(userReg),routerHandler.login)

// 向外暴露路由模块
module.exports = router