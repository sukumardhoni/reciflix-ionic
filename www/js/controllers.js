angular.module('recipesApp')

.controller('showRecipesCtrl', function ($scope, $stateParams, HardwareBackButtonManager) {
  $scope.videoId = $stateParams.videoId;
  HardwareBackButtonManager.enable();
});
