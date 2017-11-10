


// Angular Js------------------

var app = angular.module('myApp',[])
app.controller('myCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
    $http.get('/api/blog/dis/'+$.cookie('id'))
    .then(function(res){
        console.log(res.data.data)
        if(res.status == 200) {
            angular.extend($scope,res.data.data)
            // $rootScope.items = $scope
            // console.log($rootScope.items)
            console.log($scope.reply)
            $rootScope.reply = $scope.reply
            $rootScope.reply = $rootScope.reply.reverse()
            console.log($rootScope.reply)
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

// 回复功能

$('form').submit(function(ev){
    ev.preventDefault();
    
    $.post(
        '/api/blog/discuss',
        $(this).serialize(),
        function(res){
            if (res.code == 'success') {
                location.reload()
            }
        }
    )
})