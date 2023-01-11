const db = require('../db')
const bcrypt = require('bcryptjs')
// 获取用户信息接口处理函数
exports.getUserInfo = function(req,res){
    console.log(req.user)
    const getUserInfoSql = 'select * from ev_users where id = ?'
    db.query(getUserInfoSql,req.user.id,(err,sqlRes)=>{
        if(err) return res.requestHandler(err)
        if(sqlRes.length != 1) return res.requestHandler('获取用户信息失败')
        res.send({
            status:0,
            data:{...sqlRes[0],password:''},
            message:'获取用户信息成功'
        })
    })
}
// 更新用户信息接口处理函数
exports.updateUserInfo = function(req,res){
    console.log(req.body)
    const updateUserInfoSql = 'update ev_users set ? where id = ?'
    db.query(updateUserInfoSql,[req.body,req.body.id],(err,sqlRes)=>{
        if(err) return res.requestHandler(err)
        if(sqlRes.affectedRows != 1) return res.requestHandler('更新用户信息失败')
        res.send({
            status:0,
            message:'更新用户信息成功'
        })
    })
}
// 更新、重置密码
exports.updatePwd = function(req,res){
    // 根据id查询用户是否存在
    const queryUser = 'select * from ev_users where id = ?'
    const updatePwdSql = 'update ev_users set password = ? where id = ?'
    const newPwd = bcrypt.hashSync(req.body.newval,10)
    db.query(queryUser,[req.user.id],(err,sqlRes)=>{
        if(err) return res.requestHandler(err)
        if(sqlRes.length != 1) return res.requestHandler('用户不存在')
        const compareRes = bcrypt.compareSync(req.body.oldval,sqlRes[0].password)
        if(!compareRes) return res.requestHandler('旧密码错误')
        
        //更新sql
        db.query(updatePwdSql,[newPwd,req.user.id],(err,sqlRes2)=>{
            if(err) return res.requestHandler(err)
            if(sqlRes2.affectedRows != 1) return res.requestHandler('更新密码失败')
            res.requestHandler('更新密码成功')
        })
    })
}

