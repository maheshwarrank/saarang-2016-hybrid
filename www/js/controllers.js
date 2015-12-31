var api = "http://erp.saarang.org/static/json/";

angular.module('saarang2016App.controllers', ['ionic.ion.imageCacheFactory'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // // With the new view caching in Ionic, Controllers are only called
  // // when they are recreated or on app start, instead of every page change.
  // // To listen for when this page is active (for example, to refresh data),
  // // listen for the $ionicView.enter event:
  // //$scope.$on('$ionicView.enter', function(e) {
  // //});

  // // Form data for the login modal
  // $scope.loginData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
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
.controller('EventsCtrl',function($scope,$http,loadDetails, $ImageCacheFactory){

  loadEvents();


  var versionReq = {
    method: 'GET',
    url: 'http://erp.saarang.org/static/json/manifest.json'
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
    $scope.loadEvents();

  });


  });

  $scope.openEvent = function(event){
    loadDetails.addEvent(event);
  };

  $scope.loadEvents = function(){
    loadEvents();
  }

  function loadEvents() {
    var events = angular.fromJson(window.localStorage['events']);
    if (events == null ){
      loadFromJSON();
    } else {
      $scope.events1 = events.slice(0,50);
      $scope.events2 = events.slice(50,99);
      $scope.proshows = events.slice(0,5);
    }
  }
  
  function loadFromJSON(){
    var eventsReq = {
      method: 'GET',
      url: 'apis/events.json'
    };
    $http(eventsReq).then(function(response){
      $scope.events = response.data.sessions;
      loadDetails.addEventSchedule($scope.events);
      $scope.saarang = $scope.events.shift();
      console.log($scope.saarang);
      console.log($scope.events);
      window.localStorage.setItem('events',angular.toJson( $scope.events));
      var events = angular.fromJson(window.localStorage['events']);
      $scope.loadEvents();
    });
  }

 
})

.controller('EventDetailsCtrl',function($scope,$http,loadDetails){

  $scope.event = loadDetails.getEvent();
  console.log($scope.event);

  var roomsReq = {
    method: 'GET',
    url: 'apis/events.json'
  };

  $http(roomsReq).then(function(response){
    $scope.rooms = response.data.rooms;
    console.log($scope.rooms);
    for (var i = $scope.rooms.length - 1; i >= 0; i--) {
      if ($scope.event.room == $scope.rooms[i].id) {
        $scope.event.room = $scope.rooms[i].name;
        return 1;
      };
    };
  });

})

.controller('ContactCtrl',function($scope,$ionicLoading) {
  
  $scope.contacts2016 = [
            {
            "name": "Secretary, Cultural Affairs (Arts)",
            "members": [
              {
                "name": "Aditya U",
                "email": "adi@saarang.org",
                "phone": "+919962971662",
                "img"  :"http://saarang.org/2016/deploy/img/core_pics/adi.png"
              }
            ]
            },
            {
            "name": "Secretary, Cultural Affairs (Literary)",
            "members": [
              {
                "name": "Krishna Koushik",
                "email": "krishnakoushik@saarang.org",
                "phone": "+917418789160",
                "img"  :"http://saarang.org/2016/deploy/img/core_pics/krishnakoushik.png"
              }
            ]
            },
            {
            "name": "Sponsorship & PR",
            "members": [
              {
                "name": "Anish Rathi",
                "email": "anish.rathi@saarang.org",
                "phone": "+919884685016",
                "img"  :"http://saarang.org/2016/deploy/img/core_pics/anish.png"
              },
              {
                "name": "Anirvan Bordoloi",
                "email": "anirvan.bordoloi@saarang.org",
                "phone": "+919962609617",
                "img"  :"http://saarang.org/2016/deploy/img/core_pics/anirvan.png"
              },
              {
                "name": "Ashish Jha",
                "email": "ashish.jha@saarang.org",
                "phone": "+918695851252",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/aashish.png"
              }
            ]
            },
            {
            "name": "Events",
            "members": [
              {
                "name": "Rushabh Menon",
                "email": "menon@saarang.org",
                "phone": "+919791057815",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/rushabh.png"
              },
              {
                "name": "Srijith R",
                "email": "srijith@saarang.org",
                "phone": "+919176467000",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/srijith.png"
              }
            ]
            },
            {
            "name": "Professional Shows",
            "members": [
              {
                "name": "Ashwin S Pothen",
                "email": "ashwin@saarang.org",
                "phone": "+919884300360",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/pothen.png"
              },
              {
                "name": "Harshith Guntha",
                "email": "harshith.guntha@saarang.org",
                "phone": "+918056218712",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/harshith.png"
              }
            ]
            },
            {
            "name": "Marketing & Sales",
            "members": [
              {
                "name": "Sai Krishna Koushik",
                "email": "koushik.esk@saarang.org",
                "phone": "+918124343670",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/saikrishnakoushik.png"
              },
              {
                "name": "Sai Akhil Matha",
                "email": "akhil@saarang.org",
                "phone": "+918056128354",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/akhil.png"
              }
            ]
            },
            {
            "name": "Publicity",
            "members": [
              {
                "name": "Rinkesh Virani",
                "email": "rinkeshvirani@saarang.org",
                "phone": "+919884299313",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/rinkesh.png"
              }
            ]
            },
            {
            "name": "Hospitality",
            "members": [
              {
                "name": "Sreeharsha Gunda",
                "email": "sreeharsha@saarang.org",
                "phone": "+919962663576",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/sreeharsha.png"
              }
            ]
            },
            {
            "name": "Web & Mobile Operations",
            "members": [
              {
                "name": "Deepak Padamata",
                "email": "deepak@saarang.org",
                "phone": "+919789107938",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/deepak.png"
              },
              {
                "name": "Aqel Ahammed",
                "email": "aqel@saarang.org",
                "phone": "+919633229144",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/aqel.png"
              }
            ]
            },
            {
              "name":"Design and Media",
              "members":[
              {
                "name":"Manavala Thambi",
                "email":"ktmanav@saarang.org",
                "phone" :"+919962605305",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/thambi.png"
              },
              {
                "name":"Rathees P",
                "email":"ratiz@saarang.org",
                "phone":"+919789575877",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/rathees.png"
              },
              {
                "name": "Rahul K",
                "email": "rahul@saarang.org",
                "phone": "+919884299695",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/rahul.png"
              }
              ]
            },
            {
              "name":"Finance",
               "members":[
               {
               "name":"Favas M P",
               "email":"favas@saarang.org", 
               "phone":"+917418304010",
               "img"  : "http://saarang.org/2016/deploy/img/core_pics/favas.png"
               },
               {
                "name":"Srinivas Ramanand",
                "email":"ramanand@saarang.org", 
                "phone":"+918807488931",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/ramanand.png"
               }
             ]  
            },
            {
              "name":"Facilities",
              "members" :[
              {
                "name":"Hari M",
                "email":"hari@saarang.org", 
                "phone":"+917708948827",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/hari.png"
              },
              {
                "name":"Amar",
                "email":"amar@saarang.org", 
                "phone":"+919952912020",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/amar.png"
              }
              ]
            },
            {
              "name":"Safety & Security",
              "members":[
              {
                "name":"Bharadwaj M",
                "email":"bharadwaj@saarang.org",
                "phone": "+918056102507",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/bharadwaj.png"  
              },
              {
                "name":"Ruth Babu Marpu",
                "email":"ruth.marpu@saarang.org",
                "phone": "+919043812280",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/ruthbabu.png"
              }
              ]
            },
            {
              "name":"QMS",
              "members":[
              {
                "name":"Vidyadhar Mudium",
                "email":"vidyadhar@saarang.org",
                "phone":"+919952044531",
                "img"  : "http://saarang.org/2016/deploy/img/core_pics/vidyadhar.png"
              }
              ]
            }];


})


.controller('SponsorsCtrl', function($scope,$http){
  $scope.sponsors = angular.fromJson(window.localStorage['sponsors']);
  var sponsReq = {
    method : 'GET',
    url: 'http://erp.saarang.org/api/mobile/display_spons/'
  };
  $http(sponsReq).then(function(response){
    $scope.spons = response.data.data;
    $scope.spons.sort(function(a,b){
      if (a.priority > b.priority) {
        return -1;
      }
      if (a.priority < b.priority) {
        return 1;
      }
  // a must be equal to b
        return 0;
    });
    console.log($scope.spons);
    for (var i = 0; i < $scope.spons.length; i++) {
        console.log($scope.spons[i].logo);
        $scope.spons[i].logo =  "http://erp.saarang.org/media/" + $scope.spons[i].logo;
        console.log($scope.spons[i].logo);
    };
    window.localStorage.setItem('sponsors',angular.toJson($scope.spons));
    var sponsors = angular.fromJson(window.localStorage['sponsors']);
    console.log(sponsors);
    $scope.sponsors = sponsors;
    console.log($scope.sponsors);
  });
    
})


.controller('MapCtrl', function($scope, $ionicLoading) {
//   $scope.mapCreated = function(map) {
//     $scope.map = map;
//   };

//   $scope.centerOnMe = function () {
//     console.log("Centering");
//     if (!$scope.map) {
//       return;
//     }

//     $scope.loading = $ionicLoading.show({
//       content: 'Getting current location...',
//       showBackdrop: false
//     });

//     navigator.geolocation.getCurrentPosition(function (pos) {
//       console.log('Got pos', pos);
//       $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//       $scope.loading.hide();
//     }, function (error) {
//       alert('Unable to get location: ' + error.message);
//     });
//   };
});