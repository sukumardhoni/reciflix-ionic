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
]);
