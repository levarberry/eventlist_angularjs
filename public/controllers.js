var myApp = angular.module('eventApp',['angularMoment','ngRoute','ngResource']);
  

myApp.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "view-listing.html",
      controller: "EventCtrl"
      
    }
  ).when("/view/:eventId/", 
    {
      templateUrl: "view-detail.html",
      controller: "EventMgrCtrl"
      
    }
  ).when("/edit/:eventId",
   {
     templateUrl: "view-edit.html",
     controller: "EventMgrCtrl"
   }
   ).when("/manage/",
    {
      templateUrl:"view-manage.html",
      controller:"EventCtrl"

    }


  ).when("/add/",
  {
    templateUrl:"view-edit.html",
    controller: "EventMgrCtrl"
  });
  
});

myApp.controller('EventCtrl', ['$scope', '$http','$location', function($scope, $http,$location) {

        var refresh = function() {
              $http.get('/eventlist').success(function(response) {
              $scope.eventlist = response;
            
            });
        };
$scope.remove = function(id) {
  //console.log(id);
    $http.delete('/eventlist/' + id).success(function(response) {
       refresh();
      });
    };
$scope.showAdd = function(){
    $location.path('/add');
};
        
        refresh();
}]);

myApp.controller('EventMgrCtrl', ['$scope', '$http','$location','$routeParams', function($scope, $http, $location,$routeParams) {
 $scope.isEdit = $location.path().substring(0,5) === '/edit';
 $scope.isView = $location.path().substring(0,5) === '/view';
 
var getEvent = function(id) {
      $http.get('/eventlist/' + id).success(function(response) {
      $scope.evnt = response;
    
  });
};


 if ($scope.isEdit){
    $scope.formAction ="Update";
    var eventid = $routeParams.eventId;
    getEvent(eventid);

 }
 else if ($scope.isView) {
   var eventid = $routeParams.eventId;
    getEvent(eventid);
 }
 else {
  $scope.formAction ="Create";

}
  
var refresh2 = function() {
      $http.get('/eventlist').success(function(response) {
      $scope.eventlist = response;
    
  });
};


 


$scope.addEvent = function() {
   $http.post('/eventlist', $scope.evnt).success(function(response) {
    
    $scope.evnt = "";
    $location.path("/manage");
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/eventlist/' + id).success(function(response) {
    
  });
};

$scope.edit = function(id) {
  //console.log(id);
  $http.get('/eventlist/' + id).success(function(response) {
    $scope.evnt = response;
  });
};  

$scope.update = function() {
  //console.log($scope.evnt._id);
  $http.put('/eventlist/' + $scope.evnt._id, $scope.evnt).success(function(response) {
    //refresh();
    $location.path ("/manage");
  })
};

$scope.deselect = function() {
  $scope.evnt = "";
}

}]);﻿