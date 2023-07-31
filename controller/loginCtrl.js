function loginCtrl($scope, $rootScope) {
    $scope.login = function () {
        for (let index = 0; index < $rootScope.students.length; index++) {
            if ($scope.username == $rootScope.students[index].username &&
                $scope.password == $rootScope.students[index].password &&
                $rootScope.students[index].active == true
            ) {
                window.location.href = "#home";
                $rootScope.user = $rootScope.students[index];
                window.alert("Đăng nhập thành công!!!");
                return;
            }
            if ($scope.username == $rootScope.students[index].username &&
                $scope.password == $rootScope.students[index].password &&
                $rootScope.students[index].active == false
            ) {
                window.alert("Tài khoản bạn đã bị khóa!!!");
                return;
            }
        }
        window.alert("Thông tin tài khoản hoặc mật khẩu sai!!!");
    }
};