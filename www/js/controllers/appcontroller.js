angular.module('recipesApp')

.controller('AppCtrl', function ($scope, SearchedRecipes, $stateParams, $ionicLoading, $timeout, Authentication, $state, $ionicPopup, User, $localStorage, $http) {
  $scope.authentication = Authentication.user;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  if ($scope.authentication && ($scope.authentication.provider === 'fb')) {
    $scope.fbUserProfileImageUrl = "http://graph.facebook.com/" + $scope.authentication.fb_id + "/picture?width=270&height=270";
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
        console.log('Signout msgs ; ' + JSON.stringify(res));
        Authentication.user = '';
        delete $localStorage.token;
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
      $ionicLoading.hide();
      $scope.recipes = res;
      console.log('Recipes found on search query is : ' + JSON.stringify(res));
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

  // A popup dialog
  $scope.playRecipeVideo = function (videoItem) {
    if (window.cordova) {
      YoutubeVideoPlayer.openVideo(videoItem.videoId);

      if (ionic.Platform.isAndroid()) {
        console.log('Android PLatform Mobile');
      } else if (ionic.Platform.isIos()) {
        console.log('Ios PLatform Mobile');
      }
      var version = ionic.Platform.version();
      console.log('PLatform of the current Version is : ' + version);

    } else {
      console.log('Cordova not present suppose to play videoId : ' + videoItem.videoId);
      var alertPopup = $ionicPopup.alert({
        title: videoItem.title,
        template: '<div class="rf-video-container"><iframe src="https://www.youtube.com/embed/' + videoItem.videoId + '" frameborder="0" height="400px" width="100%"></iframe></div>'
      });
      alertPopup.then(function (res) {
        console.log('Vidoe display popup window is now closed: ' + videoItem.videoId);
      });
    }
  };


  $scope.shareFb = function () {
    console.log('Share ReciFlix on Fb');
    window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */ , 'http://www.reciflix.com' /* url */ , 'ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', function () {
      console.log('share ok')
    }, function (errormsg) {
      alert(errormsg)
    });
  }
  $scope.shareWhatsApp = function () {
    console.log('Share ReciFlix on WhatsApp');
    window.plugins.socialsharing.shareViaWhatsApp('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', null /* img */ , 'http://www.reciflix.com');
  }
  $scope.shareGPlus = function () {
    console.log('Share ReciFlix on Google+');
    window.plugins.socialsharing.share('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', null, 'http://www.reciflix.com');
  }
  $scope.shareTw = function () {
    console.log('Share ReciFlix on Twitter');
    window.plugins.socialsharing.shareViaTwitter('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', null /* img */ , 'http://www.reciflix.com');
  }
  $scope.shareEmail = function () {
    console.log('Share ReciFlix on Email');
    window.plugins.socialsharing.shareViaEmail('ReciFlix is a quick, convenient and easy way to search a recipe online and watch it with a click of a button and add it to your favourites to be able to access the same recipe anytime from any device conveniently.', 'Browse and watch the best recipes online from any device', null, null, null, null);
  }

});
