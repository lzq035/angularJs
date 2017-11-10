
var name = $.cookie('petname')
console.log(name)

document.querySelector('#userImg img').src = 'upload/'+name+'.jpg'

document
.querySelector('#userImg input')
.addEventListener('change', function(){
    //当没选中图片时，清除预览
    if(this.files.length === 0){
        document.querySelector('#userImg img').src = '';
        return;
    }
    
    //实例化一个FileReader
    var reader = new FileReader();

    reader.onload = function (e) {
        //当reader加载时，把图片的内容赋值给
        document.querySelector('#userImg img').src = e.target.result;
    };

//读取选中的图片，并转换成dataURL格式
reader.readAsDataURL(this.files[0]);
}, false);






$('form').submit(function(ev){
    ev.preventDefault();
    
    var data = new FormData(this)

    $.post({
        url:'/api/user/images',
        data:data,
        contentType:false,
        processData:false,
        success:function(res){
            if(res.code == 'success'){
                location.href = '/'
            }
        }
    })
})