function accountCtrl($scope, $rootScope, $http) {
    const api = 'https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users';

    $scope.update = function (id) {
        $scope.student = {};
        $scope.index = 0;
        for (let index = 0; index < $rootScope.students.length; index++) {
            if (id == $rootScope.students[index].id && $rootScope.students[index].role != 1) {
                $scope.student = $rootScope.students[index];
                $scope.index = index;
            }
        }
        if ($scope.student == null) { return; }
        if ($scope.student.active == true) {
            $scope.student.active = false;
            console.log("khóa");
        } else {
            $scope.student.active = true;
            console.log("mở khóa");
        }
        $http.put(api + "/" + id, $scope.student)
            .then(function (response) {
                $scope.students.splice($scope.index, 1, response.data);
            })
    }
    $scope.onDelete = function (id) {
        const deleteApi = 'https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users' + '/'+ id;
        $http.delete(deleteApi)
          .then(function (response) {
          });
      }
}