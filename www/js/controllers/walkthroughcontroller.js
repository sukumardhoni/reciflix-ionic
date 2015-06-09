angular.module('recipesApp')


.controller('walkthroughCtrl', function ($scope, $state, User, $ionicModal, $ionicLoading, $rootScope, Authentication, $localStorage) {
  $scope.authentication = Authentication;
  $scope.skip = function () {
    var Id = '1111';
    $state.go('app.allCategories', {
      userId: Id
    });
  };
  $ionicModal.fromTemplateUrl('templates/login.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal1 = modal;
    $rootScope.modal1 = modal;
    $scope.user = {};
    $scope.user.email = "t3@t3.com";
    $scope.Login = function () {
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
          $ionicLoading.hide();
          $state.go('app.allCategories', {
            userId: res._id
          });
        }
      })
    };
    $scope.fbLogin = function () {
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
                  var fbUser = {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    provider: 'fb'
                  };
                  User.Signup.create(fbUser, function (res) {
                    if (res.type === 'error') {
                      $state.go('walkthrough');
                    } else if (res.type === 'exists') {
                      if (res.user) {
                        $scope.authentication.user = res.user;
                        $localStorage.token = res.token;
                        $state.go('app.allCategories', {
                          userId: res.user._id
                        });
                      }
                    } else {
                      $scope.authentication.user = res;
                      $state.go('app.allCategories', {
                        userId: res._id
                      });
                    }
                  })
                } else {
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
          }
        }, {
          scope: 'email,publish_actions'
        });
    }
  });
  $scope.closeModal = function (index) {
    if (index == 2) $scope.oModal2.hide();
    else if (index == 1) $scope.oModal1.hide();
  };
  $scope.login = function () {
    $scope.oModal1.show();
    $scope.oModal2.hide();
  };

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
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
});
