(function(){
	angular
		.module('profconn.usermap', ['ui.router'])
		.config(userMapConfig);
		function userMapConfig($stateProvider){
			$stateProvider
				.state('usermap', {
					url: '/userMap',
					templateUrl: '/components/usermap/usermap.html',
					controller: UserMapController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}
		userMapConfig.$inject = ['$stateProvider'];

		function UserMapController($state, UsermapService){
			var vm = this;
			UsermapService.fetchAll().then(
				function(response){
					vm.users = response;
					return vm.users;
				}
			)
		}

		UserMapController.$inject = ['$state', 'UsermapService']
})();