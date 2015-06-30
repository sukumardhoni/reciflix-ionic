angular.module('recipesApp')

.controller('grocerysCtrl', function ($scope, Grocery, $stateParams, $ionicLoading, $timeout, Authentication, $state, $ionicPopup, singleGrocery, $localStorage, $http, $ionicHistory, $ionicModal, $rootScope, $ionicListDelegate) {
  $scope.authentication = Authentication;
  $ionicModal.fromTemplateUrl('templates/groceryitemform.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/groceryform.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.oModal2 = modal;

    $scope.addgrocerylist = function () {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
      var grocerylist = {
        'name': this.grocery.name,
        'submitted': {
          'by': 't3@user'
        },
        'items': []
      };
      Grocery.save(grocerylist, function (result) {
        $scope.grocerylists.push(result);
        this.grocery = '';
        $scope.oModal2.hide();
      });
    };
  });

  $scope.closeModal = function (index) {
    if (index == 2) $scope.oModal2.hide();
    else if (index == 1) $scope.oModal1.hide();
    else if (index == 3) $scope.oModal3.hide();
    $scope.grocery = '';
  };

  $scope.addgrocery = function () {
    $scope.grocery = '';
    $ionicHistory.clearCache();
    $scope.oModal2.show();
  };
  $scope.addgroceryitem = function () {
    $scope.oModal1.show();
  };

  $scope.getgrocerylists = function () {
    Grocery.query({}, function (res) {
      $scope.grocerylists = res;
    });
  };

  $scope.getsinglegrocery = function () {
    singleGrocery.query({
      groceryId: $stateParams.groceryId
    }, function (res) {
      $scope.singlegrocerys = res;
    });
  };

  $scope.grocerydelete = function (index) {
    singleGrocery.delete({
      groceryId: this.grocery._id
    }, function (result) {
      $scope.grocerylists.splice(index, 1);
      $ionicHistory.clearCache();
    });
  };

  $scope.createItems = function () {
    var items = this.singlegrocerys.items;
    var updatedItems = items.concat(this.item).unique();
    var singlegrocerys = {
      'name': this.singlegrocerys.name,
      'items': updatedItems
    };
    singleGrocery.update({
      groceryId: this.singlegrocerys._id
    }, singlegrocerys, function (result) {
      $scope.singlegrocerys.items = updatedItems;
      $scope.oModal1.hide();
    });
  };

  $scope.updateItem = function (index, value) {
    var updatedItem = this.item;
    var items = this.singlegrocerys.items;
    items.splice(index, 1, value);
    var singlegrocerys = {
      'name': this.singlegrocerys.name,
      'items': items
    };
    singleGrocery.update({
      groceryId: this.singlegrocerys._id
    }, singlegrocerys, function (result) {});
  };

  $scope.editgrocery = function (grocery) {
    $ionicListDelegate.closeOptionButtons();
    $ionicModal.fromTemplateUrl('templates/groceryupdate.html', {
      id: '1',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.oModal3 = modal;
      $scope.grocery = grocery;
      $scope.oModal3.show();
    });
  };

  $scope.updateGrocery = function (grocery) {
    var singlegrocerys = {
      'name': grocery.name,
      'items': grocery.items
    };
    singleGrocery.update({
      groceryId: grocery._id
    }, singlegrocerys, function (result) {
      $scope.grocery = '';
      $scope.oModal3.hide();
    });
  }
});
