const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userInfoHandler = require('../router_handler/userInfo')
const rule = require('../schema/user')

router.get('/userInfo',userInfoHandler.getUserInfo)
router.post('/updateUserInfo',expressJoi(rule.updateUserInfo),userInfoHandler.updateUserInfo)
router.post('/updatePwd',expressJoi(rule.updatePwd),userInfoHandler.updatePwd)

module.exports = router