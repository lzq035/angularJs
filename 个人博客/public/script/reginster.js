

$('form').submit(function(ev) {
    ev.preventDefault();
    
    var value = $(':password').map(function(){
        return $(this).val()
    })

    if(value[0] == value[1]) {
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function (res) {
                if (res.code == 'success') {
                    location.href = 'signin.html'
                    // console.log(res.message)
                } else {
                    alert(res.message)
                }
            }
        )
    } else {
        alert('两次输入的密码不相同')
    }
    
})