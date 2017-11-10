
var express = require('express')

var db = require('../db')

var route = express.Router()

route.post('/post',(req,res)=>{
    req.body.ip = req.ip
    req.body.time = new Date()
    req.body.count = 0
    var name = req.cookies.petname
    req.body.username = name

    db.Blog(req.body).save((err)=>{
        if(err) {
            res.json({
                code:'error',
                message:'发布失败！'
            })
        } else {
            
                    // res.cookie('id',data)
                    res.json({
                        code:'success',
                        message:'发布成功',
        
                })
        }
    })
    // console.log(req.id)
})

// 用户点击title时发送get请求

route.get('/dis/:id',(req,res)=>{
   var id = req.params.id
    console.log(req.params.id+'------------------38')
    // ------单独点击某个博客--------
    // db.Blog
    // .find({_id:req.params.id})
    // .exec((err, data)=>{
    //     if (err){

    //     } else {
    //         res.json({
    //             code:'success',
    //             message:'查询成功',
    //             data:data
    //         })
    //     }
    // })

     db.Blog
    .find({_id:req.params.id})
    .select('count')
    .exec((err, data)=>{
        if (err){

        } else {
           var count = data[0].count
           
           count = count + 1
           console.log(count)
           db.Blog.findByIdAndUpdate(id,{count:count},(err,data)=>{
               console.log(data.count)
               res.json({
                   code:'success',
                   message:'查询成功',
                   data:data
               })
           })
           
        }
    })
})

// 用户回复

route.post('/discuss',(req,res)=>{
    req.body.ip = req.ip
    req.body.time = new Date()
    req.body.username = req.cookies.petname
    // console.log(req.cookies.id)
    var id = req.cookies.id
    db.Blog.findByIdAndUpdate(id,{$push:{reply:req.body}},(err, data)=>{
        if(err){

        }else {
            // console.log(data)
            // data = data.reverse()
            res.json({
                code:'success',
                message:'回复成功',
                data:data
            })
        }
    })
})

// 响应点击标签的post响应
route.post('/tag',(req, res)=>{
    var value = req.cookies.value
    console.log(value+'----------------------103')

    db.Blog
    .find({$or:[{tag1:value},{tag2:value},{tag3:value}]})
    .exec((err,data)=>{
        if(err) {

        } else {
            var data = data.reverse()
            res.json({
                code:'success',
                message:'查询成功',
                data:data
            })
        }
    })
})



module.exports = route