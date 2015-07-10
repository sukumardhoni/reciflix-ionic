angular.module('recipesApp')

.controller('AppCtrl', function ($scope, SearchedRecipes, $stateParams, $ionicLoading, $timeout, Authentication, $state, $ionicPopup, User, $localStorage, $http, $rootScope, $ionicHistory) {
  $scope.authentication = Authentication.user;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  if ($scope.authentication) {
    $scope.fbUserProfileImageUrl = $localStorage.picture;
  } else {
    $scope.fbUserProfileImageUrl = "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png";
  }
  $scope.currentStateName = $stateParams.name;
  $scope.signout = function () {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
    User.Signout.clear(function (res) {
      if (res.type === false) {
        $scope.errMsg = res.data;
        $ionicLoading.hide();
      } else {
        Authentication.user = '';
        delete $localStorage.token;
        delete $localStorage.user;
        $rootScope.$broadcast('loggedIn', {
          'loggedIn': ''
        });
        $ionicLoading.hide();
        openFB.logout(
          function (response) {
            $state.go('walkthrough');
          })
      }
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
      $ionicHistory.clearCache();
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
          to: '',
          cc: '',
          subject: 'ReciFlixApp Testing',
          body: 'How are you? Nice greetings from ReciFlixApp'
        });
      }
    );
  };
  $scope.sharePost = function () {
    window.plugins.socialsharing.share('Check this post here: ', null, null, null);
  };
  $scope.playRecipeVideo = function (videoItem) {
    if ($rootScope.networkState !== 'wifi') {
      alert('This Video will consume data your network carrier may charge you for mobile data');
    }
    if (window.cordova) {
      YoutubeVideoPlayer.openVideo(videoItem.videoId);
      if (ionic.Platform.isAndroid()) {} else if (ionic.Platform.isIos()) {}
      var version = ionic.Platform.version();
    } else {
      var alertPopup = $ionicPopup.alert({
        title: videoItem.title,
        template: '<div class="rf-video-container"><iframe src="https://www.youtube.com/embed/' + videoItem.videoId + '" frameborder="0" height="400px" width="100%"></iframe></div>'
      });
      alertPopup.then(function (res) {});
    }
  };
  $scope.shareFb = function () {
    window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */ , 'http://www.reciflix.com' /* url */ , 'ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', function () {
      console.log('share ok')
    }, function (errormsg) {
      alert(errormsg)
    });
  }
  $scope.shareWhatsApp = function () {
    window.plugins.socialsharing.shareViaWhatsApp('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', null /* img */ , 'http://www.reciflix.com');
  }
  $scope.shareGPlus = function () {
    window.plugins.socialsharing.share('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', null, 'http://www.reciflix.com');
  }
  $scope.shareTw = function () {
    window.plugins.socialsharing.shareViaTwitter('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', null /* img */ , 'http://www.reciflix.com');
  }
  $scope.shareEmail = function () {
    window.plugins.socialsharing.shareViaEmail('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', 'Browse and watch the best recipes online from any device', null, null, null, null);
  }

});
