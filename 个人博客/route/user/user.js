var express = require('express')
var db = require('../../db')
var route = express.Router()

// 用户注册--------------------------------------------------------------------

route.post('/reginster', (req,res) =>{
    req.body.ip = req.ip
    req.body.time = new Date()
    db.User
    .find({username:req.body.username})
    .select('username')
    .exec((err,data) =>{
        if (err) {

        } else {
            
            if (data.length == 0) {
                console.log('111')
               res.json({code:'success',message:'该用户未注册'})
               db.User(req.body).save( (err) =>{
                   if(err) {
                       res.json({code:'error',message:'系统错误!'})
                   } else {
                       res.json({code:'success',message:'注册成功!'})
                   }
               })
            } else {
                res.json({
                    code:'error',
                    message:'该用户已注册过'
                })
            }
        }
    })
})

// 用户登录 --------------------------------------------------

route.post('/signin', (req,res) =>{
    db.User
    .find({username:req.body.username})
    .select('username password')
    .exec((err,data) =>{
        if(err) {

        } else {
            if(data.length == 0) {
                res.json({code:'error',message:'该用户尚未注册！'})
            } else {
                if(data[0].toObject().password == req.body.password) {
                    res.cookie('petname',req.body.username)
                    res.json({
                        code:'success',
                        message:'登录成功！',
                    })
                } else {
                    res.json({code:'error',message:'密码错误'})
                }
            }
        }
    })
})

// 用户注销-------------------------------------------------------

route.get('/signout', (req,res) =>{
    res.clearCookie('petname')
    res.status(200).json({
        code:'success',
        message:'退出成功'
    })
})









// 模块导出，供外部使用

module.exports = route