function questionCtrl($scope, $rootScope, $http) {
    const api = "https://62128b57f43692c9c6edaa5a.mockapi.io/Asm_Fe/Subjects";
    $scope.data = { selected: "" };
    $scope.currentSubject = null;
    $scope.answer = { selectedOption: "" };

    $scope.change = function () {
        $rootScope.subjects.forEach(sub => {
            if ($scope.data.selected == sub.id) {
                $scope.currentSubject = sub;
            }
        });
    }

    $scope.add = function () {
        if ($scope.currentSubject == null) {
            window.alert("Bạn chưa chọn môn học!!!");
            return;
        }
        if ($scope.answer.selectedOption == "") {
            window.alert("Bạn chưa chọn đáp án đúng!!!");
            return;
        }

        $scope.quiz = {
            Id: $scope.currentSubject.quizs[$scope.currentSubject.quizs.length - 1].Id + 1,
            Text: $scope.questionContent,
            Marks: 1,
            AnswerId: $scope.answer.selectedOption,
            Answers: [
                {
                    Id: 1,
                    Text: $scope.option1
                },
                {
                    Id: 2,
                    Text: $scope.option2
                },
                {
                    Id: 3,
                    Text: $scope.option3
                },
                {
                    Id: 4,
                    Text: $scope.option4
                }
            ]
        }
        $scope.currentSubject.quizs.push($scope.quiz);
        // console.log($scope.currentSubject);
        // console.log($scope.currentSubject.id);
        // console.log($rootScope.subjects[0].quizs);
        $http.put(api + "/" + $scope.currentSubject.id, $scope.currentSubject)
            .then(function (response) {
                // console.log(response);
                // $scope.student.id = response.data.id;
                // $scope.students.push = ($scope.student);
                // console.log($rootScope.subjects[0].quizs);
                window.alert("Thêm thành công!!!");
            });

    }
    $scope.delete = function (id) {
        $scope.quizDel = null;
        var index = 0;
        for (let i = 0; i < $scope.currentSubject.quizs.length; i++) {
            if ($scope.currentSubject.quizs[i].Id == id) {
                $scope.quizDel = $scope.currentSubject.quizs[i];
                index = i;
                break;
            }

        }
        if (confirm("Bạn có chắc chắc muốn xóa không?")) {
            $scope.currentSubject.quizs.splice(index, 1);
            $http.put(api + "/" + $scope.currentSubject.id, $scope.currentSubject)
                .then(function (response) {
                    // console.log(response);
                    // $scope.student.id = response.data.id;
                    // $scope.students.push = ($scope.student);
                    // console.log($rootScope.subjects[0].quizs);
                    window.alert("Xóa thành công.");
                });
        }

    }
    $scope.disable = false;
    $scope.quizEdit = null;
    $scope.index = 0;
    $scope.showData = function (id) {
        $scope.disable = true;
        for (let i = 0; i < $scope.currentSubject.quizs.length; i++) {
            if ($scope.currentSubject.quizs[i].Id == id) {
                $scope.quizEdit = $scope.currentSubject.quizs[i];
                $scope.index = i;
                break;
            }
        }
        $scope.questionContent = $scope.quizEdit.Text;
        $scope.option1 = $scope.quizEdit.Answers[0].Text;
        $scope.option2 = $scope.quizEdit.Answers[1].Text;
        $scope.option3 = $scope.quizEdit.Answers[2].Text;
        $scope.option4 = $scope.quizEdit.Answers[3].Text;
        for (let i = 0; i < $scope.quizEdit.Answers.length; i++) {
            if ($scope.quizEdit.AnswerId == $scope.quizEdit.Answers[i].Id) {
                $scope.answer.selectedOption = (i + 1).toString();
                break;
            }
        }
    }

    $scope.edit = function () {
        $scope.fixIndex = $scope.currentSubject.quizs[$scope.index].Id;

        $scope.quiz = {
            Id: $scope.fixIndex,
            Text: $scope.questionContent,
            Marks: 1,
            AnswerId: $scope.answer.selectedOption,
            Answers: [
                {
                    Id: 1,
                    Text: $scope.option1
                },
                {
                    Id: 2,
                    Text: $scope.option2
                },
                {
                    Id: 3,
                    Text: $scope.option3
                },
                {
                    Id: 4,
                    Text: $scope.option4
                }
            ]
        }
        $scope.currentSubject.quizs.splice($scope.index, 1, $scope.quiz);
        // $scope.currentSubject.quizs.push($scope.quiz);
        // console.log($scope.currentSubject);
        // console.log($scope.currentSubject.id);
        // console.log($rootScope.subjects[0].quizs);
        $http.put(api + "/" + $scope.currentSubject.id, $scope.currentSubject)
            .then(function (response) {
                // console.log(response);
                // $scope.student.id = response.data.id;
                // $scope.students.push = ($scope.student);
                // console.log($rootScope.subjects[0].quizs);
                window.alert("Sửa thành công!!!");
                $scope.disable = false;
            });
    }

    $scope.undisable = function () {
        $scope.disable = false;
    }
}