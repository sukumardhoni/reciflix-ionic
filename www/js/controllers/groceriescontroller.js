angular.module('recipesApp')

.controller('grocerysCtrl', function ($scope, Grocery, $stateParams, $ionicLoading, $timeout, Authentication, $state, $ionicPopup, singleGrocery, $localStorage, $http, $ionicHistory, $ionicModal, $rootScope, $ionicListDelegate) {
  $scope.authentication = Authentication;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.copyGName = {};

  $ionicModal.fromTemplateUrl('templates/groceryitemform.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    focusFirstInput: true,
    animation: 'mh-slide'
  }).then(function (modal) {
    $scope.oModal1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/groceryform.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    focusFirstInput: true,
    animation: 'mh-slide'
  }).then(function (modal) {
    $scope.oModal2 = modal;
  });

  $scope.addgrocerylist = function (grocery) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
    var grocerylist = {
      'name': this.grocery.name
    };
    this.grocery.name = '';
    Grocery.save(grocerylist, function (result) {
      $scope.grocerylists.unshift(result);
      $scope.oModal2.hide();
    });
  };

  $scope.closeModal = function (index) {
    if (index == 2) $scope.oModal2.hide();
    else if (index == 1) $scope.oModal1.hide();
  };

  $scope.addgrocery = function () {
    $ionicHistory.clearCache();
    this.grocery = '';
    $scope.formName = 'Create Grocery List';
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
    $scope.formName = 'Update Grocery List';
    $scope.copyGName = angular.copy(grocery);
    $ionicModal.fromTemplateUrl('templates/groceryform.html', {
      id: '1',
      scope: $scope,
      backdropClickToClose: false,
      focusFirstInput: true,
      animation: 'mh-slide'
    }).then(function (modal) {
      $scope.oModal2 = modal;
      $scope.grocery = grocery;
      $scope.oModal2.show();
    });
  };

  $scope.$on('modal.hidden', function () {
    angular.copy($scope.copyGName, $scope.grocery);
  });

  $scope.updateGrocery = function (grocery, index) {
    var singlegrocerys = {
      'name': grocery.name,
      'items': grocery.items
    };
    singleGrocery.update({
      groceryId: grocery._id
    }, singlegrocerys, function (result) {
      $scope.grocerylists.splice(index, 1);
      $scope.grocerylists.splice(index, 0, result);
      $scope.oModal2.hide();
    });
  }
});
