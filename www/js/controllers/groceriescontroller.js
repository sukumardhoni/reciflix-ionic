angular.module('recipesApp')

.controller('grocerysCtrl', function ($scope, Grocery, $stateParams, $ionicLoading, Authentication, $ionicPopup, singleGrocery, $localStorage, $http, $ionicHistory, $ionicModal, $ionicListDelegate, SingleGroceryItem, GroceryItemSingle, GroceryItemSingleByState, $state) {
  $scope.authentication = Authentication;
  console.log('Authentication' + JSON.stringify($scope.authentication));
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

    console.log('getgrocerylists is calling');

    Grocery.query({}, function (res) {
      $scope.grocerylists = res;
    });
  };

  $scope.getGroceryName = function () {
    if ($stateParams.groceryName) {
      $localStorage.groceryName = $stateParams.groceryName;
    }
    //console.log(' grocery single name' + $stateParams.groceryId);
  };

  $scope.getsinglegrocery = function () {

    $scope.groceryName = $localStorage.groceryName;
    console.log('getsinglegrocery is calling');

    SingleGroceryItem.query({
      glistIditem: $stateParams.groceryId
    }, function (res) {
      $scope.singlegrocerys = res;

      console.log('items from grocerry ' + JSON.stringify(res));

      $ionicHistory.clearCache()

    });




  };



  $scope.gettobuygrocery = function () {

    $scope.groceryName = $localStorage.groceryName;

    console.log('gettobuygrocery is calling ----------');

    GroceryItemSingleByState.query({
      glistIditem: $stateParams.groceryId,
      state: false
    }, function (res) {
      $scope.singlegrocerys = res;

      console.log('items from grocerry ' + JSON.stringify(res));

      $ionicHistory.clearCache()

    });




  };


  $scope.getbuyedgrocery = function () {

    $scope.groceryName = $localStorage.groceryName;

    console.log('getbuyedgrocery is calling ________');

    GroceryItemSingleByState.query({
      glistIditem: $stateParams.groceryId,

      state: true
    }, function (res) {
      $scope.singlegrocerys = res;

      console.log('items from grocerry ' + JSON.stringify(res));

      $ionicHistory.clearCache()

    });




  };





  $scope.grocerydelete = function (index) {

    console.log('grocerydelete is calling');
    console.log('grocerydelete is calling' + this.grocery._id);

    singleGrocery.delete({
      glistId: this.grocery._id
    }, function (result) {
      $scope.grocerylists.splice(index, 1);
      $ionicHistory.clearCache();
    });
  };


  $scope.createItems = function () {

    console.log('creating item-----------' + $stateParams.groceryId);

    var groceryitems = {
      'name': this.item.name,
      'state': false,
      'glistid': $stateParams.groceryId
    };
    this.item.name = " ";
    console.log("before groceryitems:" + JSON.stringify(groceryitems));
    SingleGroceryItem.save({
      glistIditem: $stateParams.groceryId
    }, groceryitems, function (result) {

      $scope.singlegrocerys.push({
        name: result.name,
        state: result.state,

      });

      console.log("grocery items in sucess" + JSON.stringify(result));


    });


  };




  $scope.updateItem = function (index, value) {
    //var updatedItem = this.item;
    //var items = this.singlegrocerys.items;
    //items.splice(index, 1, value);
    var singlegrocerys = {
      'name': this.item.name,
      'glistid': $stateParams.groceryId,
      '_id': this.item._id
    };
    console.log("before groceryitems:" + JSON.stringify(singlegrocerys));
    GroceryItemSingle.update({
      'glistIditem': $stateParams.groceryId,
      'itemId': this.item._id
    }, singlegrocerys, function (result) {});
  };




  $scope.checkboxcheck = function (item, index) {

    console.log('we are in active controller');

    console.log('showing index' + index);


    console.log('cheched---' + this.item.state);

    if (this.item.state) {

      var singleupdategrocerys = {
        'name': item.name,
        'state': true,
        'glistIditem': $stateParams.groceryId,
        '_id': this.item._id
      };

      console.log("before singleupdategrocerys:" + JSON.stringify(singleupdategrocerys));

      GroceryItemSingle.update({
        'glistIditem': $stateParams.groceryId,
        'itemId': this.item._id
      }, singleupdategrocerys, function (result) {
        console.log('active function result true -----------' + JSON.stringify(result));
        $scope.singlegrocerys.splice(index, 1);
        $scope.singlegrocerys.splice(index, 0, result);
        //$ionicHistory.clearCache();

      });

    } else {

      var singleupdategrocerys = {
        'name': item.name,
        'state': false,
        'glistIditem': $stateParams.groceryId,
        '_id': this.item._id
      };

      console.log("before singleupdategrocerys:" + JSON.stringify(singleupdategrocerys));

      GroceryItemSingle.update({
        'glistIditem': $stateParams.groceryId,
        'itemId': this.item._id
      }, singleupdategrocerys, function (result) {
        console.log('active function result false ---------------' + JSON.stringify(result));
        $scope.singlegrocerys.splice(index, 1);
        $scope.singlegrocerys.splice(index, 0, result);
        //$ionicHistory.clearCache();

      });



    }


  }




  $scope.checkboxcheckanother = function (item, index) {

    console.log('we are in active controller');

    console.log('showing index' + index);


    console.log('cheched---' + this.item.state);

    if (this.item.state) {

      var singleupdategrocerys = {
        'name': item.name,
        'state': true,
        'glistIditem': $stateParams.groceryId,
        '_id': this.item._id
      };

      console.log("before singleupdategrocerys:" + JSON.stringify(singleupdategrocerys));

      GroceryItemSingle.update({
        'glistIditem': $stateParams.groceryId,
        'itemId': this.item._id
      }, singleupdategrocerys, function (result) {
        console.log('active function result true -----------' + JSON.stringify(result));
        $scope.singlegrocerys.splice(index, 1);
        //$scope.singlegrocerys.splice(index, 0, result);
        $ionicHistory.clearCache();

      });

    } else {

      var singleupdategrocerys = {
        'name': item.name,
        'state': false,
        'glistIditem': $stateParams.groceryId,
        '_id': this.item._id
      };

      console.log("before singleupdategrocerys:" + JSON.stringify(singleupdategrocerys));

      GroceryItemSingle.update({
        'glistIditem': $stateParams.groceryId,
        'itemId': this.item._id
      }, singleupdategrocerys, function (result) {
        console.log('active function result false ---------------' + JSON.stringify(result));
        $scope.singlegrocerys.splice(index, 1);
        //$scope.singlegrocerys.splice(index, 0, result);
        $ionicHistory.clearCache();

      });



    }


  }






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
      glistId: grocery._id
    }, singlegrocerys, function (result) {
      $scope.grocerylists.splice(index, 1);
      $scope.grocerylists.splice(index, 0, result);
      $scope.oModal2.hide();
    });
  }


  /*$scope.goback = function () {

    console.log('go to back sate');
    $state.go('app.grocery');
    $ionicHistory.clearCache();
  };
*/

});
