(function(){
	angular.module('profconn')
		.service('UsermapService', UsermapService);

		UsermapService.$inject = ['$http', 'API_BASE'];
		function UsermapService($http, API_BASE){
			var usermapService = this;

			usermapService.fetchAll = function(){
				return $http.get(API_BASE + 'profiles')
					.then(function(response){
						return response.data;
					});
			}
		}
})();