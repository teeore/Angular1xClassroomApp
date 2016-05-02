'use strict';

angular.module('students')
    .controller('MainCtrl', ['$rootScope', '$scope', '$timeout', 'MainSvc', 'localStorageService', function($rootScope, $scope, $timeout, MainSvc, localStorageService) {
        var getLocalStorage = localStorageService.get('students');
        var addContainer = angular.element(document.querySelector('#add-container'))

        // get data from json file or local storage
        if (getLocalStorage == null || getLocalStorage.length == 0) {
            MainSvc.getStudents().then(function(response) {
                $scope.studentInfo = response.data;
                $scope.showButtons = true;
            });
        } else {
            $scope.studentInfo = getLocalStorage;
            $scope.showButtons = true;
        }

        $scope.gradeFilter = function(item) {
            if ($scope.theme == 'K8') {
                return item.grade <= 8;
            } else {
                return item.grade >= 9;
            }
        }

        // default theme

        $scope.theme = 'K8';
        $scope.themeHeader = 'K8';

        // check if there are any results
        $scope.showTable = true;
        $scope.gradeChange = function() {
            if ($scope.gradeLevel.grade == null) {
                $scope.clearFilters();
            }

            $timeout(function() {
                if (angular.element('.table-results').length > 0) {
                    $scope.showTable = true;
                } else {
                    $scope.showTable = false;
                }
            }, 0)

        }

        // array to hold checked students
        $scope.checkedStudents = [];

        // loop through and add to checked students array
        $scope.checked = function(item) {
            if ($scope.checkedStudents.indexOf(item) === -1) {
                $scope.checkedStudents.push(item);
            } else {
                $scope.checkedStudents.splice($scope.checkedStudents.indexOf(item), 1);
            }
        }

        // delete checked items
        $scope.delete = function(index) {
            angular.forEach($scope.checkedStudents, function(value, index) {
                $scope.studentInfo.splice($scope.studentInfo.indexOf(value), 1);
                localStorageService.remove($scope.checkedStudents);
                localStorageService.set('students', $scope.studentInfo);
            });
            $scope.checkedStudents = [];
        };

        // add new student
        $scope.add = function() {
            $scope.addRow = true;
            $scope.displaySave = true;
            addContainer.removeClass('slideUp').addClass('slideDown');
        };

        // save new student to local storage
        $scope.save = function() {
            $scope.addRow = false;
            $scope.displaySave = false;
            if ($scope.item) {
                $scope.studentInfo.push($scope.item);
                $scope.item.id = $scope.getUniqueId(100, 999);
                localStorageService.set('students', $scope.studentInfo);
            }
            $scope.item = '';
            addContainer.removeClass('slideDown').addClass('slideUp');
        };

        // generate unique ID
        $scope.getUniqueId = function(min, max) {
            return Math.floor(Math.random() * 899) + 100
        }

        // cancel button
        $scope.cancel = function() {
            $scope.addRow = false;
            $scope.displaySave = false;
            $scope.item = '';
            addContainer.removeClass('slideDown').addClass('slideUp');
        };

        // list of themes to switch
        $scope.themes = [
            { name: 'K-8', value: 'K8' },
            { name: 'High School', value: 'highschool' }
        ]

        // switch theme
        $scope.switchHeader = function() {
            if ($scope.theme == 'highschool') {
                $scope.themeHeader = 'high school';
            } else {
                $scope.themeHeader = 'k8';
            }
        }

        $scope.selectTheme = function(elem) {
            if ($scope.theme == 'K8') {
                $scope.initKGrades();
                $scope.$emit('themeChanged', 'K8');
                return 'k8-' + elem;
            } else {
                $scope.initHSGrades();
                $scope.gradeLevels = $scope.gradeArr.map(String);
                $scope.$emit('themeChanged', 'highschool');
                return 'highschool-' + elem;
            }
        };


        $scope.initKGrades = function() {
            $scope.gradeArr = [];
            for (var i = 1; i <= 8; i++) {
                $scope.gradeArr.push(i);
            }
            $scope.gradeLevels = $scope.gradeArr.map(String);
        }

        $scope.initHSGrades = function() {
            $scope.gradeArr = [];
            for (var i = 9; i <= 12; i++) {
                $scope.gradeArr.push(i);
            }
            $scope.gradeLevels = $scope.gradeArr.map(String);
        }

        // clear filters
        $scope.clearFilters = function() {
            $scope.showTable = true;
            if ($scope.searchText) {
                $scope.searchText = '';
            } else if ($scope.gradeLevel.grade || $scope.gradeLevel.grade == null) {
                $scope.gradeLevel.grade = function() {
                    return;
                };
            }
        }
    }]);

angular.module('students')
    .controller('HeaderCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.bodyTheme = 'k8-body';
        $scope.$on('themeChanged', function(event, theme) {
            $scope.theme = theme;
            if ($scope.theme == 'K8') {
                $scope.bodyTheme = 'k8-body';
            } else {
                $scope.bodyTheme = 'highschool-body';
            }
        })


    }]);
