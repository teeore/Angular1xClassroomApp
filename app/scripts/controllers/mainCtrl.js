'use strict';

angular.module('students')
    .controller('MainCtrl', ['$rootScope', '$scope', 'MainSvc', 'localStorageService', function($rootScope, $scope, MainSvc, localStorageService) {
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

        // check if there are any results
        $scope.gradeChange = function() {
            if ($('.table-results').length) {
                $scope.showTable = true;
                console.log('true')
            } else {
                $scope.showTable = false;
                console.log('false')
            }
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

        //theme switcher

        // list of themes to switch
        $scope.themes = [
            { name: 'K-8', value: 'K8' },
            { name: 'High School', value: 'highschool' }
        ]

        // default theme & header
        $scope.theme = 'K8';
        $scope.themeHeader = 'K8';

        $scope.switchHeader = function() {
            if ($scope.theme == 'highschool') {
                $scope.themeHeader = 'high school';
                // $scope.layout = 'highschool';
            } else {
                $scope.themeHeader = 'k8';
                // $scope.layout = 'K8'

            }
        }

        $scope.selectTheme = function(elem) {
            if ($scope.theme=='K8') {
                return 'k8-' + elem;
            } else {
                return 'highschool-' + elem;
            }
        };

        // filter by grade
        // $scope.gradeLevels = [];
        
        // for (var i = 1;i <=12; i++) {
        //     $scope.gradeLevels.push(i);
        // }
        $scope.gradeLevels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }]);
