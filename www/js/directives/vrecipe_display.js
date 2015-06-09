angular.module('recipesApp')
  .directive('rfRecipeDisplay', function () {
    return {
      restrict: 'E',
      controller: 'myFavoritesCtrl',
      templateUrl: 'templates/directive_partials/rf-recipe-display.html'
    };
  });
