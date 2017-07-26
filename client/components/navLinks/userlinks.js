(function(){
	angular.module('profconn')
	.directive('userlinks', 
		function(){
			UserLinksController.$inject = ['$state', 'CurrentUser', 'SessionToken'];
			function UserLinksController($state, CurrentUser, SessionToken) {
				var vm = this;
				vm.user = function(){
					return CurrentUser.get();
				};

				vm.signedIn = function() {
					// if (vm.user() === {}){
					// 	return false;
					// }else{
					// 	return true;
					// }
					return !!(vm.user());
				};

				vm.logout = function() {
					CurrentUser.clear();
					SessionToken.clear();
					$state.go('home');
				};
			}
			return {
				scope: {},
				controller: UserLinksController,
				controllerAs: 'ctrl',
				bindToController: true,
				templateUrl: '/components/navLinks/userlinks.html'
			};
		});
})();