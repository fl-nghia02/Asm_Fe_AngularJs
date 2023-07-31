function changeInformation($scope, $rootScope, $http) {
    const api = 'https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users';
    $scope.onFormSubmit = function (event) {
        event.preventDefault();
        $http.put(api + "/" + $rootScope.user.id, $rootScope.user)
            .then(function (response) {
                $rootScope.user.id = response.data.id;
                $rootScope.students.push = ($rootScope.user);
                window.alert("Đổi thông tin thành công!!!");
                window.location.href = "#home";
            })
    }
}
