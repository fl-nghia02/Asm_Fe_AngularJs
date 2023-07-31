function homeCtrl($http, $rootScope, $scope) {
    $rootScope.students = [];
    const apiUser = 'https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users';
    $http.get(apiUser)
        .then(function (response) {
            $rootScope.students = response.data;
        });


    $rootScope.subjects = [];
    const apiSubject = 'https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Subjects';
    $http.get(apiSubject)
        .then(function (response) {
            $rootScope.subjects = response.data;
            $scope.eBegin = 0;
            $scope.pageSize = 9;
            $scope.pageCount = Math.ceil($rootScope.subjects.length / $scope.pageSize);
            $scope.page = 1;
            $scope.pre = function () {
                console.log($scope.eBegin);
                if ($scope.eBegin > 0) {
                    if ($scope.eBegin > 8) {
                        $scope.eBegin -= 9;
                    } else if ($scope.eBegin = 8) {
                        $scope.eBegin -= 8;
                    }
                    $scope.page -= 1;
                }
            }
            $scope.next = function () {
                if ($scope.eBegin < ($scope.pageCount - 1) * $scope.pageSize - 1) {
                    if ($scope.eBegin == 0) {
                        $scope.eBegin += 8;
                    } else if ($scope.eBegin == 8) {
                        $scope.eBegin += 9;
                    }
                    $scope.page += 1;
                }
            }
        });

    $scope.forwardSubjectId = function (subjectId) {
        if ($rootScope.user == null) {
            window.alert("Bạn chưa đăng nhập vào hệ thống");
            return;
        }
        window.location.href = "#quiz";
        $rootScope.subjectId = subjectId;
    }
}
