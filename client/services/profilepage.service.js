(function(){
	angular.module('profconn')
		.service('ProfileService', ProfileService);

		ProfileService.$inject = ['$http', 'API_BASE'];
		function ProfileService($http, API_BASE){
			var profileService = this;
			profileService.currentProfile = [];

			profileService.save = function(updates){
				return $http.post(API_BASE, 'update', {
					// User update stuff goes here
				}).then(function(response){
					console.log(response);
				})
			};

			profileService.fetch = function(profile){
				return $http.get(API_BASE + 'currentProfile')
					.then(function(response){
						return response.data;
					});
			};

			profileService.getProfile = function(){
				return profileService.currentProfile;
			};

			profileService.update = function(user){
				return $http.put(API_BASE + 'currentProfile', {user: user})
					.then(function(response){
						return response.data;
					});
			};
		}
})();