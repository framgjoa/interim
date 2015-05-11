angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $rootScope, $firebaseObject) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/");

  // Adding Object.keys() to $rootScope, otherwise not accessible within Angular Scope
  // http://stackoverflow.com/questions/25299436/unable-to-call-object-keys-in-angularjs
  $scope.Utils = {
     keys : Object.keys
  }

  $scope.userInfo = $rootScope.userInfo;  //Need $apply() or init?

  //console.log("User info from $rootScope: ", $rootScope.userInfo, $rootScope.userInfo.name);
  console.log("User info:", $scope.userInfo, $scope.userInfo.name);

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function(){

    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;

    var commObj = $firebaseObject(ref.child('UsersDB').child(userId).child('usersCommunities'));
    //var commObj = $firebaseObject(ref.child('UsersDB').child(userId)); //Contains communities & groups
    //$scope.communities = $firebaseArray(ref.child('UsersDB').child(userId).child('usersCommunities'));
    console.log("commObj: ", commObj);

    //var communities = $scope.Utils.keys(commObj);
    // for (var key in commObj){
    //   if(commObj[key]){
    //     communities.push(key);
    //   }
    // }
    $scope.communities = commObj;


    //console.log("Retrieved ", $scope.userInfo.name, "'s community object: ", $scope.communities);
    //var $scope.commKeys = $rootScope.Utils.keys(commObj);
    console.log($scope.userInfo.name, "'s communities ", $scope.communities);


  };

  $scope.usersCommunities();

  $scope.usersGroups = function(){
    //Check all Group children for all communities
    $scope.groups = $firebaseArray(ref.child('UsersDB').child(userId).child('usersGroups'));

  };


  $scope.displayUsersCommunities= function(){
    //Use $rootScope array of communties

  };
  $scope.displayUsersGroups= function(){
    //Use $rootScope array of communties
  };


  // Seach and display results

  $scope.sendSearch = function(community) {
    console.log("entered sendSearch");
    searchName = community.toLowerCase();

    commObj.$loaded().then(function() {
      var keepGoing = true;
      $scope.communitiesObj = commObj;
      angular.forEach($scope.communitiesObj, function(value, key) {
        if(keepGoing) {
          if(value.name === searchName) {
            //TODO - APPEND THE REQUESTED COMMUNITY TO THE PAGE
            //REFACTOR TO MAKE ALL COMMUNITY NAMES .toLowerCase() WHEN
            //ADDING THEM TO THE DB
            $scope.requestedCommunity = value; //THIS IS THE OBJECT OF THE REQUESTED COMMUNITY
            keepGoing = false;
          }
        }
      });
    });

  }


  $scope.displayResults = function(searchTerm) {
  };

});
