var api = "http://erp.saarang.org/static/json/";

angular.module('saarang2016App.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.service('loadDetails',function(){
  
  var event = {name:'event not defined'};
  var addEvent = function(newEvent) {
    event = newEvent;
  };
  var getEvent = function(){
    return event;
  };
  
  var events = {name:'events not defined'};

  var addEventSchedule = function(newEvents) {
    events = newEvents;
  };

  var getEventSchedule = function(){
    return events;
  };
  
  return {
    addEvent: addEvent,
    getEvent: getEvent,
    addEventSchedule: addEventSchedule,
    getEventSchedule: getEventSchedule,
  };

})
.controller('EventsCtrl',function($scope,$http,loadDetails){

  var versionReq = {
    method: 'GET',
    url: 'apis/data_file.json'
  };

  $http(versionReq).then(function(response){
    $scope.ver = response.data.data_files;
    console.log($scope.ver);

    var eventsReq = {
    method: 'GET',
    url: api + $scope.ver
  };
    console.log(eventsReq.url);

  $http(eventsReq).then(function(response){

    $scope.events = response.data.sessions;
    loadDetails.addEventSchedule($scope.events);
    $scope.saarang = $scope.events.shift();
    console.log($scope.saarang);
    console.log($scope.events);
    window.localStorage.setItem('events',angular.toJson( $scope.events));
    var events = angular.fromJson(window.localStorage['events']);
    console.log(events);
    $scope.events1 = $scope.events.slice(0,50);
    console.log($scope.events1);
    $scope.events2 = $scope.events.slice(50,99);
    console.log($scope.events2);

  });

  $scope.openEvent = function(event){
      loadDetails.addEvent(event);
    };

  });



  // var eventsReq = {
  //   method: 'GET',
  //   url: 'apis/events.json'
  // };


  // $http(eventsReq).then(function(response){

  //   $scope.events = response.data.sessions;
  //   loadDetails.addEventSchedule($scope.events);
  //   $scope.saarang = $scope.events.shift();
  //   console.log($scope.saarang);
  //   console.log($scope.events);
  //   window.localStorage.setItem('events',angular.toJson( $scope.events));
  //   var events = angular.fromJson(window.localStorage['events']);
  //   console.log(events);
  //   $scope.events1 = $scope.events.slice(0,50);
  //   console.log($scope.events1);
  //   $scope.events2 = $scope.events.slice(50,99);
  //   console.log($scope.events2);

  // });

  // $scope.openEvent = function(event){
  //     loadDetails.addEvent(event);
  //   };

})

.controller('EventDetailsCtrl',function($scope,$http,loadDetails){

  $scope.event = loadDetails.getEvent();

})

.controller('SponsorsCtrl', function($scope,loadDetails){
})
