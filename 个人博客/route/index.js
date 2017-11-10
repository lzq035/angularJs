var express = require('express')

var db = require('../db')

var route = express.Router()

// 
route.get('/index',(req,res)=>{
    // console.log('来自首页的请求')
    db.Blog
    .find()
    .exec((err,data) =>{
        if(err) {

        } else {
            console.log(data)
            data = data.reverse()
            res.json({
                code:'success',
                message:'查询成功',
                data: data.map(m => {
                    m = m.toObject();
                    m.id = m._id.toString();
                    delete m._id;
                    return m;
                })
            })
        }
    })
})

module.exports = route