angular.module('recipesApp')

.controller('showRecipesCtrl', function ($scope, $stateParams) {
  $scope.videoId = $stateParams.videoId;
});
