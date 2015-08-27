angular.module('recipesApp')

.controller('landingCtrl', function ($scope, $state, User, $ionicLoading, $rootScope, Authentication, $localStorage, $http, $timeout, $ionicHistory, $cordovaOauth, $stateParams, $ionicDeploy, $ionicPlatform) {

  $scope.authentication = Authentication;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;

  $scope.goBack = function () {
    if ($state.current.name === 'login') {
      $state.go('landing');
    } else
      $ionicHistory.goBack();
  };
  $ionicHistory.clearCache();

  /*  $scope.guestUser = function () {
      if ($rootScope.networkState === 'none') {
        alert('This App needs internet, Please try after you connect to internet');
      } else {
        $scope.authentication = "";
        $state.go('app.allCategories')
      }
    };*/
  $scope.user = {};

  $scope.signIn = function () {
    if ($rootScope.networkState === 'none') {
      $scope.reuseAlert('This App needs internet, Please try after you connect to internet!', 'Internet Not Available', 'Done', null);
    } else {
      $ionicLoading.show({
        templateUrl: "templates/loading.html",
      });
      User.Signin.create(this.user).$promise.then(function (res) {
        if (res.type === false) {
          $scope.errMsg = res.data;
          $ionicLoading.hide();
        } else {
          $scope.populateUserLocally(res);
        }
      }).catch(function (err) {
        console.log('Error happened: ' + JSON.stringify(err));
        $ionicLoading.hide();
        $scope.reuseAlert('Looks like there is an issue with your connectivity, Please try after sometime!', 'Connectivity Issue', 'Done', null);
      });
    }
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

  $scope.populateUserLocally = function (respUser) {
    $ionicLoading.hide();
    $scope.authentication.user = respUser;
    $localStorage.user = respUser;
    $localStorage.token = respUser.token;
    $state.go('app.allCategories', {
      userId: respUser._id
    });
  };

  $scope.doSignUp = function () {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    User.Signup.create(this.user, function (res) {
      if (res.type === false) {
        $scope.errMsg = res.data;
        $ionicLoading.hide();
      } else {
        $scope.populateUserLocally(res);
      }
    })
  };

  $scope.fbLogin = function () {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    openFB.login(
      function (response) {
        if (response.status === 'connected') {
          openFB.api({
            path: '/me',
            params: {
              fields: 'id,name,email,first_name,last_name,age_range,gender,cover'
            },
            success: function (user) {
              //console.log('Fb user details : ' + JSON.stringify(user));
              if (user.email) {
                $scope.fbUser = {
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  provider: 'fb',
                  fb_id: user.id
                };
                $localStorage.picture = "http://graph.facebook.com/" + user.id + "/picture?width=270&height=270";
                User.Signup.create($scope.fbUser, function (res) {
                  if (res.type === false) {
                    if (res.user) {
                      $scope.populateUserLocally(res.user);
                    }
                  } else {
                    $scope.populateUserLocally(res);
                  }
                })
              } else {
                $scope.errMsg = 'This seems to be Facebook login error. We willl look into it and let you know';
                $ionicLoading.hide();
                openFB.logout(
                  function (response) {
                    $state.go('landingCtrl');
                  })
              }
            },
            error: function (error) {
              alert('Facebook error: ' + error.error_description);
            }
          });
        } else {
          $ionicLoading.hide();
        }
      }, {
        scope: 'email,read_stream,publish_actions'
      });
  };

  $scope.googleLogin = function () {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    $cordovaOauth.google("951951324496-fdusfp1vved02vvicdg0vet1pk50hc0f.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", 'https://www.googleapis.com/auth/userinfo.profile', "https://www.googleapis.com/auth/userinfo.email"]).then(function (result) {
      $scope.accessToken = result.access_token;
      $scope.getDataProfile();
    }, function (error) {
      $ionicLoading.hide();
    });
  };
  $scope.getDataProfile = function () {
    var term = null;
    $http({
        method: "GET",
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + $scope.accessToken,
        data: term,
        dataType: 'json',
      })
      .success(function (data) {
        $scope.gUser = {
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          provider: 'gmail'
        };
        $localStorage.picture = data.picture;
        User.Signup.create($scope.gUser, function (res) {
          if (res.type === false) {
            if (res.user) {
              $scope.populateUserLocally(res.user);
            }
          } else {
            $scope.populateUserLocally(res);
          }
        })
      })
      .error(function (data, status) {
        $scope.errMsg = 'This seems to be Google login error. We willl look into it and let you know';
      });
  };


  $scope.recoverPassword = function (respUser) {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    var useremail = {
      email: this.user.email
    }
    this.user.email = '';
    User.ForgotPassword.fetch(useremail, function (res) {
      if (res.type === false) {
        $scope.errMsg = res.data;
        $ionicLoading.hide();
      } else {
        $ionicLoading.hide();
        $scope.sucessfullMsg = res.message;
      }
    })
  };

  //TODO this code is duplicated in both landingctrl nd appctrl.js to be migrated to a service for re-use purpose
  $scope.getAppUpdates = function () {
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
  }

});
