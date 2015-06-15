angular.module('recipesApp')

//.constant('API_HOST', 'http://localhost:3000')
.constant('API_HOST', 'http://qa.api.reciflix.com')

.factory('Categories', function ($resource, API_HOST) {
  return $resource(API_HOST + '/categories/page/:pageId', {
    pageId: '@pageId'
  }, {
    'query': {
      method: 'GET',
      isArray: true
    }
  });
})

.factory('RecipesByCategory', function ($resource, API_HOST) {
  return $resource(API_HOST + '/VRecipesByCategories/:CategoryName/:pageId', {
    CategoryName: '@CategoryName',
    pageId: '@pageId'
  }, {
    'query': {
      method: 'GET',
      isArray: true
    }
  });
})

.factory('SingleRecipe', function ($resource, API_HOST) {
  return $resource(API_HOST + '/vRecipes/:recipeId', {
    recipeId: '@_id',
  }, {
    'update': {
      method: 'PUT'
    },
    'remove': {
      method: 'DELETE'
    }
  });
})

.factory('User', function ($resource, API_HOST) {
  return {
    Signup: $resource(API_HOST + '/users/signup', {}, {
      create: {
        method: 'POST'
      }
    }),
    Signin: $resource(API_HOST + '/users/signin', {}, {
      create: {
        method: 'POST'
      }
    })
  }
})

.factory('UserFavorites', function ($resource, API_HOST) {
  return $resource(API_HOST + '/userFavorites/:userId', {
    userId: '@_id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
})

.factory('MyFavRecipes', function ($resource, API_HOST) {
  return $resource(API_HOST + '/myFavorites/:userId/:pageId', {
    userId: '@userId',
    pageId: '@pageId'
  }, {
    'query': {
      method: 'GET',
      isArray: true
    }
  });
})

.factory('SearchedRecipes', function ($resource, API_HOST) {
  return $resource(API_HOST + '/searchedVRecipes/:searchQuery/:pageId', {
    searchQuery: '@searchQuery',
    pageId: '@pageId'
  }, {
    'query': {
      method: 'GET',
      isArray: true
    }
  });
})

.factory('RecipesFavCount', function ($resource, API_HOST) {
  return $resource(API_HOST + '/recipesFavCount/:recipeId', {
    recipeId: '@_id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
})

.factory('Authentication', [
 function () {
    var _this = this;
    _this._data = {
      user: window.user
    };
    return _this._data;
 }
])

.factory('EnvDetails', function () {

  var runningInCordova1;
  document.addEventListener("deviceready", function () {
    console.log('############ initializing the Env details, runningInCordova ');
    runningInCordova1 = true;
  }, function (err) {
    console.log('############ initializing the Env details, runningInCordovaErrror happened:  ' + err);
    runningInCordova1 = false;
  });
  return runningInCordova1;

})


.service('HardwareBackButtonManager', function ($ionicPlatform, $state, $ionicPopup) {
  this.deregister = undefined;

  this.disable = function () {
    console.log('registerBackButtonAction is disable');
    this.deregister = $ionicPlatform.registerBackButtonAction(function (e) {
      //e.preventDefault();
      if ($state.includes('app.allCategories')) {
        console.log('Console at HardwareBackButtonManager service is disable is trigger');
        $ionicPopup.confirm({
          title: 'System warning',
          template: 'Are you sure you want to exit ReciFlix?'
        }).then(function (res) {
          if (res) {
            navigator.app.exitApp();
          }
        })
      } else {
        console.log('Back button is triggred')
      }
      return false;
    }, 101);
  }

  this.enable = function () {
    console.log('registerBackButtonAction is enable');
    if (this.deregister !== undefined) {
      this.deregister();
      this.deregister = undefined;
    }
  }
  return this;
})
