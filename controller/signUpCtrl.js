function signUpCtrl($http, $scope, $rootScope) {
    $scope.student = {
        username: "",
        password: "",
        fullname: "",
        email: "",
        gender: true,
        birthday: "",
        role: 0,
        active: true
    };
    const api = 'https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users';
    $scope.onFormSubmit = function (event) {
        event.preventDefault();
        $scope.history = [];
        for (let i = 0; i < $rootScope.subjects.length; i++) {
            const element = $rootScope.subjects[i];
            $scope.history.push({
                Id: i + 1,
                SubjectId: element.id,
                MaxScore: 0,
                history: []
            });
        }
        $scope.student.histories = $scope.history;
        $http.post(api, $scope.student)
            .then(function (response) {
                console.log(response);
                $rootScope.user = response.data;
                window.alert("Đăng ký thành công!!!");
                window.location.href = "#home";
            });
    }
}