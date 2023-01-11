const db = require('../db')
exports.getArticleCate = function(req,res){
    const getCatesSql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(getCatesSql,(err,sqlRes)=>{
        if(err) return res.requestHandler(err)
        res.send({
            status:0,
            message:'获取文章分类成功',
            data:sqlRes
        })
    })
}
// 新增文章分类
exports.addArticleCate = function(req,res){
    const uniqueSql = 'select * from ev_article_cate where name = ? or alias = ?'
    const addCateSql = 'insert into ev_article_cate set ?'
    db.query(uniqueSql,[req.body.name,req.body.alias],(sqlErr,sqlRes)=>{
        if(sqlErr) return res.requestHandler(err)
        if(sqlRes.length != 0){
            return res.requestHandler('类别名称或者别名不能重复')
        }
        db.query(addCateSql,req.body,(sqlErr,sqlRes)=>{
            if(sqlErr) return res.requestHandler(sqlErr)
            if(sqlRes.affectedRows == 1){
                res.requestHandler('添加类别成功')
            }else{
                res.requestHandler('添加失败')
            }
        })
    })
}
// 删除文章分类
exports.deleteCate = function(req,res){
    const deleteSql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(deleteSql,req.params.id,(sqlErr,sqlRes)=>{
        if(sqlErr) return res.requestHandler(sqlErr)
        if(sqlRes.affectedRows == 1){
            res.requestHandler('删除成功')
        }else{
            res.requestHandler('删除失败')
        }
    })
}
// 查询文章分类
exports.queryCate = function(req,res){
    const querySql = `select * from ev_article_cate where id=?`
    db.query(querySql,req.params.id,(sqlErr,sqlRes)=>{
        if(sqlErr) return res.requestHandler(sqlErr)
        if(sqlRes.length == 1){
            res.requestHandler({
                status:0,
                message:'获取成功',
                data:sqlRes[0]
            })
        }else{
            res.requestHandler('获取失败')
        }
    })
}