var express = require('express')
var mg = require('mongoose')

mg.connect('mongodb://localhost/personal-blog')

db = mg.connection

db.on('error',(error) =>{
    console.log('数据库连接失败！')
})
db.on('open',() =>{
    console.log('数据库连接成功！')
})

// 导出数据模型

exports.User = mg.model('user',{
    username:String,
    password:String,
    isMale:Boolean,
    email:String,
    ip:String,
    time:Date
})

exports.Blog = mg.model('blog',{
    title:String,
    tag1:String,
    tag2:String,
    tag3:String,
    content:String,
    username:String,
    count:Number,
    ip:String,
    time:Date,
    reply:[{
        message:String,
        content:String,
        username:String,
        time:Date,
        ip:String
    }]
})