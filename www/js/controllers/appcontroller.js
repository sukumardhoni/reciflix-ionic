angular.module('recipesApp')

.controller('AppCtrl', function ($scope, SearchedRecipes, $stateParams, $ionicLoading, $timeout, Authentication, $state) {
  $scope.authentication = Authentication.user;
  $scope.currentStateName = $stateParams.name;
  $scope.signout = function () {
    $scope.authentication = '';
    Authentication.user = '';
    openFB.logout(
      function (response) {
        console.log('Successfully logout fb user');
        $state.go('walkthrough');
      })
  }
  if ($stateParams.searchQuery) {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    var pageId = 0;
    SearchedRecipes.query({
      pageId: pageId,
      searchQuery: $stateParams.searchQuery
    }, function (res) {
      $ionicLoading.hide();
      $scope.recipes = res;
      pageId++;
    })
  }
  $scope.changeClass = function (recipe) {
    if ($scope.selectedIndex === recipe._id) {
      $scope.selectedIndex = true;
    } else {
      $scope.selectedIndex = recipe._id;
    }
  };
  Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j])
          a.splice(j--, 1);
      }
    }
    return a;
  }
  $scope.searchQueryLoadMore = function () {
    $timeout(function () {
      var onScroll = {};
      SearchedRecipes.query({
        pageId: pageId,
        searchQuery: $stateParams.searchQuery
      }, function (res) {
        onScroll = res;
        pageId++;
        if (res.length == 0) {
          $scope.noMoreItemsAvailable = true;
        }
        var oldRecipes = $scope.recipes;
        $scope.recipes = oldRecipes.concat(onScroll).unique();
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, 100);
  };
  $scope.sendMail = function () {
    cordova.plugins.email.isAvailable(
      function (isAvailable) {
        cordova.plugins.email.open({
          to: 'vinodhko@globaltechminds.com',
          cc: '',
          // bcc:     ['john@doe.com', 'jane@doe.com'],
          subject: 'ReciFlixApp Testing',
          body: 'How are you? Nice greetings from ReciFlixApp'
        });
      }
    );
  };
  $scope.sharePost = function () {
    window.plugins.socialsharing.share('Check this post here: ', null, null, null);
    //window.plugins.socialsharing.share('Message and image', null, 'https://www.google.nl/images/srpr/logo4w.png', null);
    //Message,Subject,Image,Link these are the four arguments in share
  };
});
