angular.module('recipesApp')

.controller('walkthroughCtrl', function ($scope, $state, User, $ionicModal, $ionicLoading, $rootScope, Authentication, $localStorage, $http, AuthService, $timeout, $ionicHistory, $cordovaOauth) {
  $ionicHistory.clearCache();
  $timeout(function () {
    AuthService.checkLogin();
  }, 500);
  $scope.$on('loggedIn', function (event, message) {
    if (message.loggedIn) {
      $scope.authentication.user = $localStorage.user;
      $state.go('app.allCategories')
    } else {
      $state.go('walkthrough')
    }
  });
  $scope.authentication = Authentication;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.skip = function () {
    if ($rootScope.networkState === 'none') {
      alert('This App needs internet, Please try after you connect to internet');
    } else {
      $scope.authentication = "";
      $state.go('app.allCategories')
    }
  };
  $ionicModal.fromTemplateUrl('templates/login.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    focusFirstInput: true,
    animation: 'mh-slide'
  }).then(function (modal) {
    $scope.oModal1 = modal;
    $rootScope.modal1 = modal;
    $scope.user = {};
    $scope.Login = function () {
      if ($rootScope.networkState === 'none') {
        alert('This App needs internet, Please try after you connect to internet');
      } else {
        $ionicLoading.show({
          templateUrl: "templates/loading.html",
        });
        User.Signin.create(this.user, function (res) {
          if (res.type === false) {
            $scope.errMsg = res.data;
            $ionicLoading.hide();
          } else {
            $scope.authentication.user = res;
            $localStorage.token = res.token;
            $localStorage.user = res;
            $ionicLoading.hide();
            $state.go('app.allCategories', {
              userId: res._id
            });
          }
        })
      }
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
                fields: 'id,name,email,first_name,last_name'
              },
              success: function (user) {
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
                        $ionicLoading.hide();
                        $scope.authentication.user = res.user;
                        $localStorage.user = res.user;
                        $localStorage.token = res.user.token;
                        $state.go('app.allCategories', {
                          userId: res.user._id
                        });
                      }
                    } else {
                      $ionicLoading.hide();
                      $scope.authentication.user = res;
                      $localStorage.token = res.token;
                      $localStorage.user = res;
                      $state.go('app.allCategories', {
                        userId: res._id
                      });
                    }
                  })
                } else {
                  $scope.errMsg = 'This seems to be Facebook login error. We willl look into it and let you know';
                  $ionicLoading.hide();
                  openFB.logout(
                    function (response) {
                      $state.go('walkthrough');
                    })
                }
              },
              error: function (error) {
                alert('Facebook error: ' + error.error_description);
              }
            });
          } else {
            alert('Facebook login failed');
            $ionicLoading.hide();
          }
        }, {
          scope: 'email,publish_actions'
        });
    }
  });
  $scope.closeModal = function (index) {
    if (index == 2) $scope.oModal2.hide();
    else if (index == 1) $scope.oModal1.hide();
    else if (index == 3) $scope.oModal3.hide();
  };
  $scope.login = function () {
    $scope.oModal1.show();
    $scope.oModal2.hide();
  };
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    focusFirstInput: true,
    animation: 'mh-slide'
  }).then(function (modal) {
    $scope.oModal2 = modal;
    $rootScope.modal2 = modal;
    $scope.doSignUp = function () {
      $ionicLoading.show({
        templateUrl: "templates/loading.html",
      });
      User.Signup.create(this.user, function (res) {
        if (res.type === false) {
          $scope.errMsg = res.data;
        } else {
          $scope.authentication.user = res;
          $localStorage.token = res.token;
          $localStorage.user = res;
          $ionicLoading.hide();
          $state.go('app.allCategories', {
            userId: res._id
          });
        }
      })
    };
  });
  $scope.signup = function () {
    $scope.oModal2.show();
    $scope.oModal1.hide();
  };
  $ionicModal.fromTemplateUrl('templates/forgot-password.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    focusFirstInput: true,
    animation: 'mh-slide'
  }).then(function (modal) {
    $scope.oModal3 = modal;
    $rootScope.modal3 = modal;
  });
  $scope.googleLogin = function () {
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    $cordovaOauth.google("951951324496-fdusfp1vved02vvicdg0vet1pk50hc0f.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", 'https://www.googleapis.com/auth/userinfo.profile', "https://www.googleapis.com/auth/userinfo.email"]).then(function (result) {
      $scope.accessToken = result.access_token;
      $scope.getDataProfile();
    }, function (error) {
      console.log(error);
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
              $ionicLoading.hide();
              $scope.authentication.user = res.user;
              $localStorage.user = res.user;
              $localStorage.token = res.user.token;
              $state.go('app.allCategories', {
                userId: res.user._id
              });
            }
          } else {
            $ionicLoading.hide();
            $scope.authentication.user = res;
            $localStorage.token = res.token;
            $localStorage.user = res;
            $state.go('app.allCategories', {
              userId: res._id
            });
          }
        })
      })
      .error(function (data, status) {
        $scope.errMsg = 'This seems to be Google login error. We willl look into it and let you know';
      });
  };
});
