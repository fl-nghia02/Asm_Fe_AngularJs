function historyCtrl($scope, $rootScope) {
    const api = "https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users";
    $scope.select = "";
    $scope.maxScore = 0;
    $scope.change = function () {
        for (let i = 0; i < $rootScope.user.histories.length; i++) {
            const e = $rootScope.user.histories[i];
            if (e.SubjectId == $scope.select) {
                $scope.showMaxScore = true;
                $scope.maxScore = e.MaxScore;
                $scope.currentSubjectResult = e.history;
            }
        }
    }
}