'use strict';

angular.module('students')
    .factory('MainSvc', ['$http', function($http) {
    	return {
    		getStudents: function() {
    			return $http.get('scripts/services/mockdata.json');
    		}
    	};     
    }]);
