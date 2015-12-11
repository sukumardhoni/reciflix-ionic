angular.module('recipesApp')

.controller('AppCtrl', function ($scope, SearchedRecipes, $stateParams, $ionicLoading, $timeout, Authentication, $state, $ionicPopup, User, $localStorage, $http, $rootScope, $ionicHistory, $ionicDeploy, $ionicPlatform) {
  $scope.authentication = Authentication.user;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  if ($scope.authentication) {
    if ($localStorage.picture) {
      $scope.userProfileImageUrl = $localStorage.picture;
    } else {
      $scope.userProfileImageUrl = "../img/user.png";
    }
  }

  $scope.appVersion = $rootScope.appVersion;

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
        delete $localStorage.picture;
        $rootScope.$broadcast('loggedIn', {
          'loggedIn': ''
        });
        $ionicLoading.hide();
        openFB.logout(
          function (response) {
            $state.go('landing');
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
  /*  Array.prototype.unique = function () {
      var a = this.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j])
            a.splice(j--, 1);
        }
      }
      return a;
    }*/
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
  $scope.playVideo = function (videoItem) {
    if (window.cordova) {
      YoutubeVideoPlayer.openVideo(videoItem.videoId);
    } else {
      var alertPopup = $ionicPopup.alert({
        title: videoItem.title,
        template: '<div class="rf-video-container"><iframe src="https://www.youtube.com/embed/' + videoItem.videoId + '" frameborder="0" height="400px" width="100%"></iframe></div>'
      });
      alertPopup.then(function (res) {});
    }
  };
  $scope.sharePost = function () {
    window.plugins.socialsharing.share('Check this post here: ', null, null, null);
  };
  $scope.playRecipeVideo = function (videoItem) {
    if (window.cordova) {
      if ($rootScope.networkState !== 'wifi') {
        navigator.notification.confirm("This Video will consume data, do you want to proceed?", function (cbIndex) {
            if (cbIndex == 1) {} else if (cbIndex == 2) {
              $scope.playVideo(videoItem);
            }
          },
          'Confirmation', ['Cancel', 'OK']);
      } else {
        $scope.playVideo(videoItem);
      }
    } else {
      $scope.playVideo(videoItem);
    }
  };
  $scope.shareFb = function () {
    if (ionic.Platform.isAndroid()) {
      window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */ , 'http://www.reciflix.com' /* url */ , 'ReciFlix App allows convenient way to search and watch a recipe video online. Users can add recipes to favorites to watch them later from anywhere.', function () {}, function (errormsg) {
        alert(errormsg)
      });
    } else if (ionic.Platform.isIOS()) {
      window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('ReciFlix App allows convenient way to search and watch a recipe video online. Users can add recipes to favorites to watch them later from anywhere.', 'http://www.reciflix.com/modules/core/img/brand/reciflix_500.png' /* img */ , 'http://www.reciflix.com' /* url */ , 'Use paste in the content area to get the prewritten message', function () {}, function (errormsg) {
        alert(errormsg)
      });
    }
  }
  $scope.shareWhatsApp = function () {
    window.plugins.socialsharing.shareViaWhatsApp('ReciFlix App allows convenient way to search and watch a recipe video online. Users can add recipes to favorites to watch them later from anywhere.', null /* img */ , 'http://www.reciflix.com');
  }
  $scope.shareGPlus = function () {
    window.plugins.socialsharing.share('ReciFlix App allows convenient way to search and watch a recipe video online. Users can add recipes to favorites to watch them later from anywhere.', null, 'http://www.reciflix.com');
  }
  $scope.shareTw = function () {
    window.plugins.socialsharing.shareViaTwitter('ReciFlix App allows convenient way to search and watch a recipe video online. Users can add recipes to favorites to watch them later from anywhere.', null /* img */ , 'http://www.reciflix.com');
  }
  $scope.shareEmail = function () {
    window.plugins.socialsharing.shareViaEmail('ReciFlix App allows convenient way to search and watch a recipe video online. Users can add recipes to favorites to watch them later from anywhere.', 'Browse and watch the best recipes online from any device', null, null, null, null);
  }

  $scope.sucessfullyUpdatedMsg = "";

  $scope.updateProfile = function (updatedUser) {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    User.UpdatedProfile.update(updatedUser, function (res) {
      $ionicLoading.hide();
      $scope.sucessfullyUpdatedMsg = 'Successfully Updated Your Profile, you will be now taken to Home screen';
      $scope.authentication = res;
      $localStorage.user = res;
      $localStorage.token = res.token;
      $timeout(function () {
        $state.go('app.allCategories', {
          userId: res._id
        });
      }, 5000);
    });
  };

  $scope.updatePassword = function (updatedPwd) {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    User.ChangePassword.update(updatedPwd, function (res) {
      $ionicLoading.hide();
      $scope.sucessfullyUpdatedMsg = 'Successfully Updated Your Password, you will be now taken to Home screen';
      $timeout(function () {
        $state.go('app.allCategories', {
          userId: res._id
        });
      }, 5000);
    }, function (err) {
      $ionicLoading.hide();
      $scope.errUpdatedMsg = err.data.message;
    });
  };

  $scope.editableForm = function () {
    $scope.showForm = true;
  };


  $scope.reuseAlert = function (aMessage, aTitle, aBtnName, aCallBackFn) {
    if (window.cordova) {
      navigator.notification.alert(
        aMessage, // message
        aCallBackFn, // callback
        aTitle, // title
        aBtnName // buttonName
      );
    } else {
      alert(aMessage);
    }
  };


  //TODO this code is duplicated in both landingctrl nd appctrl.js to be migrated to a service for re-use purpose
  /*  $scope.getAppUpdates = function () {
      $ionicDeploy.check().then(function (hasUpdate) {
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        if (hasUpdate) {
          navigator.notification.confirm('There are updates available to your app, Do you want to proceed?', function (cbIndex) {
              if (cbIndex == 1) {
                console.log('Confirmation is cancelled');
              } else if (cbIndex == 2) {
                $ionicDeploy.update().then(function (res) {
                  console.log('Ionic Deploy: Update Success! ', res);
                  $ionicLoading.hide();
                }, function (err) {
                  console.log('Ionic Deploy: Update error! ', err);
                }, function (prog) {
                  console.log('Ionic Deploy: Progress... ', prog);
                  $scope.updateProg = prog;
                  $ionicLoading.show({
                    templateUrl: "templates/appUpdating.html",
                    scope: $scope
                  });
                });
              }
            },
            'Confirmation', ['Cancel', 'OK']);
        } else {
          navigator.notification.alert(
            'Your app is already upto date!', // message
            function () {
              console.log('Done callback in alert');
              $scope.updateDoneFlg = hasUpdate;
            }, // callback
            'Already Latest', // title
            'Done' // buttonName
          );
        }
      }, function (err) {
        console.log('Ionic Deploy: Unable to check for updates', err);
      });
    }

    $scope.checkForNewUpdates = function () {
      $ionicPlatform.ready(function () {
        $ionicDeploy.check().then(function (hasUpdate) {
          console.log('checkForNewUpdates: Update available: ' + hasUpdate);
          $scope.updateDoneFlg = hasUpdate;
        }, function (err) {
          console.log('checkForNewUpdates :', err);
        });
      })
    }*/


});
