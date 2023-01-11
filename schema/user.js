const joi = require('joi')
// 定义校验规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义更新校验规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
// 定义更新密码校验规则
// const oldval = password
// const newval = joi.not(joi.ref('oldval')).concat(password)
exports.userReg = {
    body:{
        username,
        password
    }
}
exports.updateUserInfo = {
    body:{
        id,
        nickname,
        email
    }
}
exports.updatePwd = {
    body:{
        oldval:password,
        newval:joi.not(joi.ref('oldval')).concat(password)
    }
}