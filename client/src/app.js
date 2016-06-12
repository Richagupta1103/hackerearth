var app = angular.module('hackerearth', ['ngRoute']);

var codetable = {'user_name':'Richa Gupta','user_email':'ric.gupta1103@gmail.com','base_url':'http://127.0.0.1:8000'}
app.controller('CodeTableController',['$scope','$http','$location', function ($scope,$http,$location) {

    // checking if url has key, if not, generate the key

    var full_url = window.location.href;
    var url_part = full_url.split('/')
    if(url_part.length == 4 && url_part[3]==''){
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var rString = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        window.location.href = full_url + rString
    }

    // creating list of languages

    $scope.availableOptions= [
      {id: 'C', name: 'C (gcc 4.8.4)'},
      {id: 'CPP', name: 'C++ (g++ 4.8.4)'},
      {id: 'JAVA', name: 'Java (openjdk 1.7.0_91)'},
      {id: 'PYTHON', name: 'Python (python 2.7.6)'}
    ]

    $scope.selectLanguage = 'C'
    $scope.date = new Date();
    $scope.testInput = false
    $scope.editor = ace.edit("editor");
    $scope.testInputText = ''
    $scope.viewResult = false
    $scope.compilation = false
    $scope.compiling = false
    $scope.shareUrl = false
    $scope.data = {}
    $scope.getCode = function(lang){
        $scope.editor.setValue($scope.code[lang], 1)
    }
    $scope.code = {'C':'','CPP':'','JAVA':'','PYTHON':''}

    // saving data in front-end,when any changes are happening

    $scope.editor.session.on("change", function(delta){
        $scope.code[$scope.selectLanguage] = $scope.editor.getValue()
        $scope.save()
    })

    // showing the sharing URL

    $scope.share = function(){
        if($scope.data){
         $scope.shareUrl = true
        }
    }

    // calling the api for getting the data from database for key, if present

    $scope.get_data = {}
    $scope.getData = function(){
        $scope.get_data['lang'] = $scope.selectLanguage
        $scope.get_data['key'] =  url_part[3]
        $http({
            method: 'POST',
            url: codetable.base_url+'/get_code',
            data: $scope.get_data,
        }).then(
            function (result) {
                $scope.editor.setValue(result.data.code, 1)
            },
            function (err) {
                console.log(err)
            });
    }
    $scope.getData()

    // calling the api for saving the data in database for key

    $scope.save_data = {}
    $scope.save = function(){
        $scope.save_data['lang'] = $scope.selectLanguage
        $scope.save_data['source'] = $scope.editor.getValue()
        $scope.save_data['key'] =  url_part[3]
        $http({
            method: 'POST',
            url: codetable.base_url+'/save',
            data: $scope.save_data,
        }).then(
            function (result) {
                console.log('saved')
            },
            function (err) {
                console.log(err)
            });
    }

    // calling the api for compilation

    $scope.compileAndRun=function(value){
        $scope.source = value
        if($scope.source==''){
            alert('Nothing to run')
            return false
        }
        $scope.compiling = true
        $scope.viewResult = false
        $scope.compilation = false
        $scope.inputData = {}
        $scope.inputData['source'] = $scope.source
        $scope.inputData['lang'] = $scope.selectLanguage
        $scope.inputData['input'] = $scope.testInputText
        $scope.inputData['time_limit'] = 5
        $scope.inputData['memory_limit'] = 262144
        // calling the api
        $http({
            method: 'POST',
            url: codetable.base_url+'/result',
            data: $scope.inputData,
        }).then(
            function (result) {
                $scope.data = result.data
                $scope.compiling = false
                $scope.viewResult = true
                if($scope.data.run_status.status == 'CE'){
                    $scope.compilation = true
                }
                if($scope.testInputText == ''){
                    $scope.testInputText = 'Standard input is empty'
                }
                if($scope.data.run_status.output == ''){
                    $scope.testInputText = 'Standard output is empty'
                }
                console.log($scope.data)

            },
            function (err) {
                $scope.compiling = false
                console.log(err)
            });
    }

}]);




