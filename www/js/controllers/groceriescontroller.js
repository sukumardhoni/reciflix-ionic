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
  });



  $scope.closeModal = function (index) {
    if (index == 2) $scope.oModal2.hide();
    else if (index == 1) $scope.oModal1.hide();
    else if (index == 3) $scope.oModal3.hide();
  };

  $scope.addgrocery = function () {
    $scope.grocery = '';
    $scope.oModal2.show();
  };
  $scope.addgroceryitem = function () {
    $scope.oModal1.show();
  };

  $scope.addgrocerylist = function () {

    $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;

    var grocerylist = {
      'name': this.grocery.name,
      'submitted': {
        'by': 't3@user'
      },
      'items': []

    };

    console.log("add grocerylist before:" + JSON.stringify(grocerylist));

    Grocery.save(grocerylist, function (result) {
      console.log("add grocerylist after:" + JSON.stringify(result));

      $scope.grocerylists.push(result);

      $scope.grocerylist = '';

      $scope.oModal2.hide();

    });
  };



  $scope.getgrocerylists = function () {

    console.log('we are in getgrocery  function-----------');
    Grocery.query({}, function (res) {
      $scope.grocerylists = res;
      console.log('list of grocerylists' + JSON.stringify(res));
    });
  };

  $scope.getsinglegrocery = function () {
    console.log('we are in getsinglegrocery  function-----------');
    singleGrocery.query({
      groceryId: $stateParams.groceryId
    }, function (res) {
      $scope.singlegrocerys = res;
      console.log('list of categories' + JSON.stringify(res));
    });
  };

  $scope.grocerydelete = function (index) {
    console.log("###  delete singlegrocerys_idvvvvvvvvvvvvvvvvvvvvvvvvvv " + this.grocery._id);
    singleGrocery.delete({
      groceryId: this.grocery._id
    }, function (result) {
      console.log("########### Successfully Deleted....!");
      $scope.grocerylists.splice(index, 1);
      $ionicHistory.clearCache();
    });
  };

  $scope.updateGroceryItems = function () {
    console.log("update updateGroceryItems function is called");
    console.log(" seleted in updateQuestion function: " + this.singlegrocerys._id);


    var items = this.singlegrocerys.items;
    var updatedItems = items.concat(this.item).unique();

    var singlegrocerys = {
      'name': this.singlegrocerys.name,
      'items': updatedItems
    };

    console.log("update singlegrocerys function is called" + JSON.stringify(singlegrocerys));
    console.log("update Item" + JSON.stringify(updatedItems));
    singleGrocery.update({
      groceryId: this.singlegrocerys._id
    }, singlegrocerys, function (result) {
      console.log("updatedperson details Successfully  " + JSON.stringify(result));
      $scope.singlegrocerys.items = updatedItems;
      $scope.oModal1.hide();
    });
  };




  $scope.updateItem = function (index, value) {
    console.log("update updateItem function is called");
    console.log(" seleted in updateQuestion function: " + value + " , index value : " + index);

    var updatedItem = this.item;
    var items = this.singlegrocerys.items;

    console.log("Before update Item" + JSON.stringify(items));
    items.splice(index, 1, value);
    console.log(" After update Item" + JSON.stringify(items));

    var singlegrocerys = {
      'name': this.singlegrocerys.name,
      'items': items
    };

    console.log("update singlegrocerys function is called" + JSON.stringify(singlegrocerys));
    singleGrocery.update({
      groceryId: this.singlegrocerys._id
    }, singlegrocerys, function (result) {
      console.log("updatedperson details Successfully  " + JSON.stringify(result));

    });



  };



  $scope.editgrocery = function (grocery) {
    console.log("editgrocery : " + JSON.stringify(grocery));

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

    console.log("updateGrocery : " + JSON.stringify(grocery));

    var singlegrocerys = {
      'name': grocery.name,
      'items': grocery.items
    };

    console.log("update singlegrocerys function is called" + JSON.stringify(singlegrocerys));
    singleGrocery.update({
      groceryId: grocery._id
    }, singlegrocerys, function (result) {
      console.log("updatedperson details Successfully  " + JSON.stringify(result));

      $scope.oModal3.hide();
    });
  }


});
