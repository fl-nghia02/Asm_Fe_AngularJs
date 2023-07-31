function quizCtrl($scope, $rootScope, $interval, $http) {
    const apiUser = "https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Users";
    $scope.subject = {};
    $rootScope.subjects.forEach(sub => {
        if ($rootScope.subjectId == sub.id) {
            $scope.subject = sub;
            return;
        }
    });

    $scope.isStart = false;
    var time = "";
    $scope.countDown = 0;
    $scope.startQuiz = function () {
        var today = new Date();
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $scope.isStart = true;
        $scope.countDown = $scope.subject.quizs.length * 60;
        $interval(function () {
            $scope.countDown -= 1
        }, 1000, 0);
    }

    $scope.showResult = true;
    $scope.indexNext = 0;
    $scope.question = $scope.subject.quizs[$scope.indexNext].Text;
    $scope.quiz = $scope.subject.quizs[$scope.indexNext];
    $scope.mark = 0;
    $scope.data = { selectedOption: "" };
    $scope.rightAnswer = 0;
    $scope.completed = 0;
    $scope.next = function () {
        if ($scope.data.selectedOption == "") {
            window.alert("Bạn chưa chọn đáp án!!!");
            return;
        }
        $scope.indexNext += 1;
        if ($scope.indexNext < $scope.subject.quizs.length) {
            $scope.question = $scope.subject.quizs[$scope.indexNext].Text;
            $scope.quiz = $scope.subject.quizs[$scope.indexNext];
        }

        if ($scope.data.selectedOption == $scope.subject.quizs[$scope.indexNext - 1].AnswerId) {
            $scope.mark += 10 / $scope.subject.quizs.length;
            $scope.rightAnswer += 1;
        }
        if ($scope.rightAnswer == $scope.subject.quizs.length) {
            $scope.mark = 10;
        }

        if ($scope.indexNext == $scope.subject.quizs.length) {
            $scope.showResult = false;

            let history = {
                score: $scope.mark,
                examTime: $scope.countDown,
                startTime: time
            };
            for (let i = 0; i < $rootScope.user.histories.length; i++) {
                const e = $rootScope.user.histories[i];
                if (e.SubjectId == $rootScope.subjectId) {
                    e.history.push(history);
                    if (history.score > e.MaxScore) {
                        e.MaxScore = history.score;
                    }
                    $http.put(apiUser + "/" + $rootScope.user.id, $rootScope.user)
                        .then(function (response) {
                            console.log(response);
                        });
                }
            }
        }
        $scope.data.selectedOption = "";
        $scope.completed += 1;
    }


    $scope.endQuiz = function () {
        if ($scope.completed < $scope.subject.quizs.length) {
            if (confirm("Bạn chưa hoàn thành bài thi, bạn có chắc chắc muốn thoát không?")) {
                $scope.isStart = false;
                window.location.href = "#home";
            }
        }
    }

    $scope.endResult = function () {
        window.location.href = "#home";

    }
}