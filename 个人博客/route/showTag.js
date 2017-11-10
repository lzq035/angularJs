var express = require('express')
var db = require('../db')

var route = express.Router()

route.get('/showTag', (req , res)=>{
    var value = req.cookies.value
    // console.log(value)

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


route.post('/select',(req , res)=>{
    var value = req.body.tag
    console.log(value)
    res.cookie('search',value)
    db.Blog
    .find({$or:[{tag1:value},{tag2:value},{tag3:value}]})
    .exec((err, data)=>{
        if(err) {

        } else {
            var data = data.reverse()
            // console.log(data)
             res.json({
                 code:'success',
                 message:'查询成功！',
                 data:data
             })
        }
    })
})


route.get('/search', (req,res)=>{
    var search = req.cookies.search
    console.log(search+'-----------------------1')

    db.Blog
    .find({$or:[{tag1:search},{tag2:search},{tag3:search}]})
    .exec((err, data)=>{
        if(err) {

        } else {
           if(data.length == 0){
               res.json({
                   code:'error',
                   message:'没有符合的内容',
                   data:'没有你想要的内容'
               })
           } else {
            var data = data.reverse()
            console.log(data)
            res.json({
                code:'success',
                message:'查询成功',
                data:data
            })
           }
        }
    })
})

module.exports = route