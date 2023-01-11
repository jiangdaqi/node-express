const express = require('express')
const expressJoi = require('@escook/express-joi')
const articleRule = require('../schema/article')

const router = express.Router()
const articleHandler = require('../router_handler/article')

router.get('/cates',articleHandler.getArticleCate)
router.post('/addCate',expressJoi(articleRule.addCateRule),articleHandler.addArticleCate)
router.get('/deleteCate/:id',expressJoi(articleRule.deleteCateRule),articleHandler.deleteCate)
router.get('/queryCate/:id',expressJoi(articleRule.queryCateRule),articleHandler.queryCate)

module.exports = router