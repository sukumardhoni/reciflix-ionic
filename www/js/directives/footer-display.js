angular.module('recipesApp')
  .directive('rfFooterDisplay', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/directive_partials/rf-footer-display.html'
    };
  });
