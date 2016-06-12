var app = angular.module('hackerearth', ['ngRoute']);

var codetable = {'user_name':'Richa Gupta','user_email':'ric.gupta1103@gmail.com','base_url':'http://127.0.0.1:8000'}
app.controller('CodeTableController',['$scope','$http', function ($scope,$http) {
    $scope.availableOptions= [
      {id: 'C', name: 'C (gcc 4.8.4)'},
      {id: 'CPP', name: 'C++ (g++ 4.8.4)'},
      {id: 'JAVA', name: 'Java (openjdk 1.7.0_91)'},
      {id: 'PYTHON', name: 'Python (python 2.7.6)'}
    ]
    $scope.selectLanguage = 'C'
    $scope.testInput = false
    $scope.editor = ace.edit("editor");
    $scope.testInputText = ''
    $scope.viewResult = false
    $scope.compilation = false
    $scope.compiling = false
    $scope.shareUrl = false
    $scope.data = {}
    $scope.share = function(){
        if($scope.data){
         $scope.shareUrl = true
        }
    }
    $scope.compileAndRun=function(value){
        $scope.source = value
        if($scope.source==''){
            alert('Nothing to run')
            return false
        }
        $scope.compiling = true
        $scope.inputData = {}
        $scope.inputData['async'] = 0
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




