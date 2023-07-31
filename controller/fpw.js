function fpw($scope, $rootScope) {
    $scope.fpw = function () {
        for (let index = 0; index < $rootScope.students.length; index++) {
            if ($scope.email == $rootScope.students[index].email) {
                window.alert("Mật khẩu của bạn là: " + $rootScope.students[index].password)
                return;
            }
        }
    }
}