var petname = $.cookie('petname')
console.log(petname)

if(petname) {
    $('.nav li:eq(1)').find('a').text(petname)
    $('.signin').css('display','none')
    $('.reginster').css('display','none')
    $('.upload').css('display','block')
    $('.post').css('display','block')
    $('.signout').css('display','block')

    document.querySelector('.userImg a img').src = 'upload/'+petname+'.jpg'
    
} 

// 退出

function signout() {
    $.get(
        '/api/user/signout',
        null,
        function (res) {
            console.log(res.message)
            if(res.code == 'success') {
                $('.nav li:eq(1)').find('a').text('')
                $('.signin').css('display','block')
                $('.reginster').css('display','block')
                $('.upload').css('display','none')
                $('.post').css('display','none')
                $('.signout').css('display','none')

                location.href = '/'
            }
        }
    )
}