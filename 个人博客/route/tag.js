var express = require('express')

var db = require('../db')

var route = express.Router()

// 
route.get('/tag',(req,res)=>{
    console.log('来自标签的请求')
    db.Blog
    .find()
    .exec((err,data) =>{
        
        if(err) {

        } else {
            var arr1 =[],arr2 = [],arr3 = []
           for(var i=0;i<data.length;i++){
                if(data[i].tag1 != '') arr1.push(data[i].tag1)
                if(data[i].tag2 != '') arr2.push(data[i].tag2)
                if(data[i].tag3 != '') arr3.push(data[i].tag3)
           }
        //    console.log(arr1)
        //    console.log(arr2)
        //    console.log(arr3)

        //  标签排重方法
        function repetition(rep){
            var rep = rep
            var result =[]
            var length = rep.length
            for (var i = 0; i< rep.length; i++) {
              var a = rep[i]
              for (var j = i+1; j< rep.length; j++) {
                var b = rep[j];
                 if (a == b){
                     break;
                     
                 } else{
                    if (j == length-1){
                        result.push(a)
                    }
                 }
              }
            }
            result.push(rep[rep.length-1])
            return result
        }
        
        // console.log(repetition(arr1))
        // console.log(repetition(arr2))
        // console.log(repetition(arr3))
        var result1 = repetition(arr1)
        var result2 = repetition(arr2)
        var result3 = repetition(arr3)
        var result = result1.concat(result2,result3)
        
        var total = repetition(result)
        console.log(total)
            // data = data.reverse()
            res.json({
                code:'success',
                message:'查询成功',
                data:total
                // data: data.map(m => {
                //     m = m.toObject();
                //     m.id = m._id.toString();
                //     delete m._id;
                //     return m;
                // })
            })
        }
    })
})

module.exports = route