angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseArray, $rootScope) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/");
  $scope.userInfo = $rootScope.userInfo;

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function() {

    var userId = $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;

    var communities = $firebaseArray(ref.child('UsersDB').child(userId).child('usersCommunities'));
    console.log("Retrieved ", $scope.userInfo.name, "'s communities: ", communities);
    $scope.communities = communities;

  }

  $scope.usersGroups = function(userId) {
    //Check all Group children for all communities
    var groups = $firebaseArray(ref.child('UsersDB').child(userId).child('usersGroups'));
    $scope.groups = groups;

  }



  $scope.cacheCommunities = function(userId) {
    //AngularFire query to DB
    //Store in $rootscope array


  };
  $scope.cacheGroups = function(userId) {
    //AngularFire query to DB
    //Store in $rootscope array
  };
  $scope.displayUsersCommunities= function(){
    //Use $rootscope array of communties

  };
  $scope.displayUsersGroups= function(){
    //Use $rootscope array of communties
  };


  // Seach and display results
  $scope.searchCommunities = function(searchTerm) {
  };
  $scope.searchGroups = function(searchTerm) {
  };
  $scope.displayResults = function(searchTerm) {
  };

  // Selecting groups or communities after search results to request permission

  $scope.selectCommunities = function(){
  };
  $scope.selectGroups = function(){
  };



});
