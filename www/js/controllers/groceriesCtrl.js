angular.module('recipesApp')

.controller('groceryCtrl', function ($scope, $stateParams, $ionicLoading, Authentication, $ionicPopup, Grocery, $localStorage, $http, $ionicHistory, $ionicModal, $ionicListDelegate, GroceryItem, GroceryItemSingle, $state) {
  $scope.authentication = Authentication;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.copyGName = {};
  $ionicModal.fromTemplateUrl('templates/groceryform.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    focusFirstInput: true,
    animation: 'mh-slide'
  }).then(function (modal) {
    $scope.oModal2 = modal;
  });
  $scope.addGroceryList = function (grocery) {
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
  $scope.closeModal = function () {
    $scope.oModal2.hide();
  };
  $scope.showAddGroceryForm = function () {
    $ionicHistory.clearCache();
    this.grocery = '';
    $scope.formName = 'Create Grocery List';
    $scope.oModal2.show();
  };
  $scope.getGroceryLists = function () {
    Grocery.query({}, function (res) {
      $scope.grocerylists = res;
    });
  };

  $scope.createItem = function () {
    var groceryItem = {
      'name': this.item.name,
      'state': false,
      'glistid': $stateParams.groceryId
    };
    this.item.name = " ";
    GroceryItem.save({
      gListId: $stateParams.groceryId
    }, groceryItem, function (result) {
      $ionicListDelegate.closeOptionButtons();
      $scope.singlegrocerys.unshift({
        _id: result._id,
        name: result.name,
        state: result.state,
      });
    });
  };

  $scope.updateItem = function (index, value) {
    var updatedItem = {
      'name': this.item.name,
      'glistid': $stateParams.groceryId,
      '_id': this.item._id
    };
    GroceryItemSingle.update({
      'gListId': $stateParams.groceryId,
      'itemId': this.item._id
    }, updatedItem, function (result) {});
  };

  $scope.checkBoxUpdateItemState = function (item, index) {
    if (item.state) {
      var updatedItem = {
        'name': item.name,
        'state': item.state,
        'glistIditem': $stateParams.groceryId
      };
      GroceryItemSingle.update({
        'gListId': $stateParams.groceryId,
        'itemId': item._id
      }, updatedItem, function (result) {
        $scope.singlegrocerys.splice(index, 1);
        $scope.singlegrocerys.splice(index, 0, result);
      });
    } else {
      var updatedItem = {
        'name': item.name,
        'state': item.state,
        'glistIditem': $stateParams.groceryId
      };
      GroceryItemSingle.update({
        'gListId': $stateParams.groceryId,
        'itemId': item._id
      }, updatedItem, function (result) {
        $scope.singlegrocerys.splice(index, 1);
        $scope.singlegrocerys.splice(index, 0, result);
      });
    }
  };

  $scope.editGrocery = function (grocery) {
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
    var updatedGrocery = {
      'name': grocery.name,
      'items': grocery.items
    };
    Grocery.update({
      gListId: this.grocery._id
    }, updatedGrocery, function (result) {});
  };

  $scope.deleteGrocery = function (grocery, index) {
    Grocery.delete({
      gListId: grocery._id
    }, function (result) {
      $scope.grocerylists.splice(index, 1);
    });
  };

  $scope.allgrocery = function () {
    $scope.$emit('itemState', '');
  };

  $scope.activegrocery = function () {
    $scope.$emit('itemState', false);
  };

  $scope.donegrocery = function () {
    $scope.$emit('itemState', true);
  };


  $scope.$on('itemState', function (events, data) {
    $scope.statusFilter = {
      state: data
    };
  });

  $scope.getGroceryItems = function () {
    $ionicHistory.clearCache();
    $scope.groceryName = $stateParams.groceryName;
    GroceryItem.query({
      gListId: $stateParams.groceryId
    }, function (res) {
      $scope.singlegrocerys = res;
      $ionicHistory.clearCache()
    });
    $scope.$emit('itemState', '');
  };

  $scope.deleteGItem = function (itemVal, index) {
    GroceryItemSingle.delete({
      'gListId': $stateParams.groceryId,
      'itemId': itemVal._id
    }, function (result) {
      $scope.singlegrocerys.splice(index, 1);
    });
  };



});
