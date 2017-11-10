
// 搜索框的功能实现
$('form').submit(function(ev){
    
     ev.preventDefault();
     
    $.post(
        $(this).attr('action'),
        $(this).serialize(),
        function(res){
            console.log('111111')
            if(res.code == 'success') {
                location.href = 'search.html'
            }
        }
    )
})






// Angular Js------------------

var app = angular.module('myApp',[])
app.controller('myCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
    $scope.idClick = function(e) {
        console.log(e)
        $.cookie('id',e)
        // console.log($.cookie('id'))
        location.href = 'discuss.html'
    }


    $http.get('/api/index')
    .then(function(res){
        console.log(res.data)
        if(res.status == 200) {
            angular.extend($scope,res.data.data)
            $rootScope.items = $scope
            console.log($rootScope.items)
        }
    })



}])

// 自定义过滤器
app.filter('showTime', function(){
    return function (time) {
        var time = new Date(time)
        var y = time.getFullYear()
        var M = time.getMonth() +1
        var d = time.getDate()
        var h = time.getHours()
        var m = time.getMinutes()

        M = M < 10 ? '0'+M : M
        d = d < 10 ? '0'+d : d
        h = h < 10 ? '0'+h : h
        m = m < 10 ? '0'+m : m

        return y+'-'+M+'-'+d+'    '+h+':'+m
    }
})

app.filter('showYear',function(){
    return function (time) {

        var time = new Date(time)

        return time.getFullYear()
    }
})

app.filter('showTime', function() {
    return function (time) {
        var time = new Date(time)

        var y = time.getFullYear()
        var M = time.getMonth() +1
        var d = time.getDate()

        return y+'-'+M+'-'+d

    }
})