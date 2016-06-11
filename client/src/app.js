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
    $scope.compileAndRun=function(value){
        $scope.source = value
        $scope.inputData = {}
        $scope.inputData['source'] = $scope.source
        $scope.inputData['lang'] = $scope.selectLanguage
        $scope.inputData['input'] = $scope.testInputText
        $scope.inputData['client_secret'] = 'ef01eee83b0251ca94f8012763b15273ba4705b3'
        $scope.inputData['time_limit'] = 5
        $scope.inputData['memory_limit'] = 262144
        $scope.inputData['async'] = 0
        // calling the api
        $http({
            method: 'POST',
            url: codetable.base_url+'/result',
            data: $scope.inputData,
        }).then(
            function (result) {
                $scope.data = result.data
                console.log($scope.data)
                $scope.viewResult = true
            },
            function (err) {
                console.log(err)
            });
    }

}]);



