angular.module('recipesApp')

//.constant('API_HOST', 'http://192.168.0.100:3000')
.constant('API_HOST', 'http://www.reciflix.com')

.factory('Categories', function ($resource, API_HOST) {
  return $resource(API_HOST + '/categories/page/:pageId', {
    pageId: '@pageId'
  }, {
    'query': {
      method: 'GET',
      isArray: true,
      timeout: 20000
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
        method: 'POST',
        timeout: 30000
      }
    }),
    Signin: $resource(API_HOST + '/users/signin', {}, {
      create: {
        method: 'POST',
        timeout: 20000
      }
    }),
    Signout: $resource(API_HOST + '/users/signout', {}, {
      clear: {
        method: 'POST'
      }
    }),
    ForgotPassword: $resource(API_HOST + '/users/forgotPassword', {}, {
      fetch: {
        method: 'POST'
      }
    }),
    ResetPassword: $resource(API_HOST + '/users/reset/:token', {
      token: '@token'
    }, {
      set: {
        method: 'POST'
      }
    }),
    UpdatedProfile: $resource(API_HOST + '/users/updateProfile', {}, {
      update: {
        method: 'PUT'
      }
    }),
    ChangePassword: $resource(API_HOST + '/users/changePassword', {}, {
      update: {
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
  return $resource(API_HOST + '/myFavorites/:uId/:pageId', {
    uId: '@uId',
    pageId: '@pageId'
  }, {
    'query': {
      method: 'GET',
      isArray: true
    }
  });
})

.factory('Grocery', function ($resource, API_HOST) {
  return $resource(API_HOST + '/gList/:gListId/:userConfirm', {
    gListId: '@gListId',
    userConfirm: '@userConfirm'
  }, {
    'save': {
      method: 'POST'
    },
    'query': {
      method: 'GET',
      isArray: true
    },
    'delete': {
      method: 'DELETE'
    },
    'update': {
      method: 'PUT'
    }
  });
})


.factory('GroceryItem', function ($resource, API_HOST) {
  return $resource(API_HOST + '/gListItems/:gListId/item', {
    gListId: '@gListId'
  }, {
    'query': {
      method: 'GET',
      isArray: true
    },
    'save': {
      method: 'POST'
    }
  });
})

.factory('GroceryItemSingle', function ($resource, API_HOST) {
  return $resource(API_HOST + '/singleGListItem/:gListId/item/:itemId', {
    gListId: '@gListId',
    itemId: '@itemId'
  }, {
    'query': {
      method: 'GET'
    },
    'update': {
      method: 'PUT'
    },
    'delete': {
      method: 'DELETE'
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

.factory('AuthService', function ($rootScope, $localStorage) {
  return {
    checkLogin: function () {
      var loggedIn = $localStorage.token;
      $rootScope.$broadcast('loggedIn', {
        'loggedIn': loggedIn
      });
      return loggedIn;
    }
  }
})
