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
    }),
    Signout: $resource(API_HOST + '/users/signout', {}, {
      clear: {
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

.factory('Grocery', function ($resource, API_HOST) {
  return $resource(API_HOST + '/groceries', {}, {
    'query': {
      method: 'GET',
      isArray: true
    },
    'save': {
      method: 'POST'
    }
  });
})

.factory('singleGrocery', function ($resource, API_HOST) {
  return $resource(API_HOST + '/groceries/:groceryId', {
    groceryId: '@groceryId'
  }, {
    'query': {
      method: 'GET'

    },
    'delete': {
      method: 'DELETE'
    },
    'update': {
      method: 'PUT'
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
    //console.log('############ initializing the Env details, runningInCordova ');
    runningInCordova1 = true;
  }, function (err) {
    //console.log('############ initializing the Env details, runningInCordovaErrror happened:  ' + err);
    runningInCordova1 = false;
  });
  return runningInCordova1;

})





.factory('AuthService', function ($rootScope, $localStorage) {
  return {
    checkLogin: function () {
      var loggedIn = $localStorage.token;
      //console.log('############ Token value :  ' + $localStorage.token);
      $rootScope.$broadcast('loggedIn', {
        'loggedIn': loggedIn
      });
      return loggedIn;
    }
  }
})
