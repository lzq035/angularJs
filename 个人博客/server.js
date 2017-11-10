var express = require('express')
var db = require('./db')
var bodyParser = require('body-parser')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var multer = require('multer')



// 声明一个app对象
var app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(cookieParser())

// 处理用户上传头像功能
const storage = multer.diskStorage({
    destination:'public/upload',
    filename:function(req,file,cb){
        var name = req.cookies.petname

        cb(null,`${name}.jpg`)
    }
})

var img = multer({
    storage:storage
})

app.post('/api/user/images',img.single('img'),(req ,res)=>{
    console.log('上传头像')
    res.json({
        code:'success',
        message:'上传成功'
    })
})







// 加载处理模块
// 处理用户登录、注册、注销
app.use('/api/user',require('./route/user/user'))

// 用户 发表/点击某个标签时/
app.use('/api/blog',require('./route/post'))
// 处理来自首页的get请求--------------
app.use('/api',require('./route/index'))
// 标签
app.use('/api/blog',require('./route/tag'))

// 查询
app.use('/api/blog',require('./route/showTag'))




app.listen(3000, () =>{
    console.log('服务器运行中...')
})