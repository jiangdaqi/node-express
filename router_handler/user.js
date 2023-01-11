
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
// 注册处理函数
exports.register = function(req,res){
    const userInfo = req.body
    console.log(req.body);
    // if(!userInfo.username || !userInfo.password){
    //     return res.requestHandler('用户名和密码不能为空！')
    // }
    // 数据库查询是否有相同用户名
    const checkNameSql = 'select * from ev_users where username = ?'
    db.query(checkNameSql,[userInfo.username],(err,results)=>{
        if(err){
            return res.requestHandler(err)
        }
        if(results.length > 0){
            return res.requestHandler('用户名已被占用！')
        }
        // 加密用户密码
        userInfo.password = bcrypt.hashSync(userInfo.password,10)
        // 插入用户数据
        const registerSql = 'insert into ev_users set ?'
        db.query(registerSql,userInfo,(err,results)=>{
            if(err){
                return res.send({
                    status:1,
                    message:err.message
                })
            }
            if(results.affectedRows !== 1){
                return res.requestHandler('注册失败,请稍后再试')
            }
            return res.requestHandler('注册成功！',0)
        })
    })
}
// 登录处理函数
exports.login = function(req,res){
    const userInfo = req.body
     console.log('接受参数:',userInfo);
    // 查询数据库比较
    const selectUserSql = 'select * from ev_users where username = ?'
    db.query(selectUserSql,userInfo.username,(sqlErr,sqlRes)=>{
        console.log(sqlErr);
        if(sqlErr) return res.requestHandler(sqlErr)
        if(sqlRes.length != 1) return res.requestHandler('该用户名没有注册!')
        // 通过compareAsync比较密码
        const compareRes = bcrypt.compareSync(userInfo.password,sqlRes[0].password)
        if(!compareRes) return res.requestHandler('密码错误!')
        // 生成登录的token
        console.log('生成token',config);
        const user = {...sqlRes[0],password:'',user_pic:''}
        const jwtTokenStr = jwt.sign(user,config.jwtSecretkey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + jwtTokenStr
        })
    })
}