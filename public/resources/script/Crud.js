const app = angular.module('caretipsApp', []);

app.controller('CaretipsController', function($scope, $http) {
  $scope.caretips = [];
  $scope.newCaretip = {};
  $scope.selectedCaretip = null;

  $http.get('/caretips').then(response => {
    $scope.caretips = response.data;
  });

  $scope.addCaretip = function() {
    $http.post('/caretips', $scope.newCaretip).then(response => {
      $scope.caretips.push(response.data);
      $scope.newCaretip = {};
    });
  };

  $scope.deleteCaretip = function(id) {
    $http.delete(`/caretips/${id}`).then(() => {
      $scope.caretips = $scope.caretips.filter(caretip => caretip._id !== id);
    });
  };

  $scope.selectCaretip = function(caretip) {
    $scope.selectedCaretip = angular.copy(caretip);
  };

  $scope.updateCaretip = function() {
    $http.patch(`/caretips/${$scope.selectedCaretip._id}`, $scope.selectedCaretip).then(response => {
      const index = $scope.caretips.findIndex(caretip => caretip._id === response.data._id);
      $scope.caretips[index] = response.data;
      $scope.selectedCaretip = null;
    });
  };
});
