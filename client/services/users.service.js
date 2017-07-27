(function(){
	angular.module('profconn')
		.service('UsersService', [
			'$http', 'API_BASE', 'SessionToken', 'CurrentUser',
			function($http, API_BASE, SessionToken, CurrentUser){
				function UsersService(){

				}
				UsersService.prototype.create = function(user) {
					var userPromise = $http.post(API_BASE + 'signup', {
						username: user.username,
						email: user.email,
						password: user.password
					});
					userPromise.then(function(response) {
						SessionToken.set(response.data.token);
						CurrentUser.set(response.data.id);
					});
					return userPromise;
				};
				UsersService.prototype.login = function(user){
					var loginPromise = $http.post(API_BASE +'signin', {
						email: user.email,
						password: user.password
					});
					loginPromise.then(function(response){
						SessionToken.set(response.data.token);
						CurrentUser.set(response.data.id)
					});
					return loginPromise;
				};
				UsersService.prototype.delete = function(user){
					var deletePromise = $http.delete(API_BASE + 'delete', {id: user.id});
					deletePromise.then(function(response){
						SessionToken.clear();
						CurrentUser.clear();
					});
					return deletePromise;
				}
				return new UsersService();
			}]);
})();