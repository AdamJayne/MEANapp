(function(){
	angular
		.module('profconn.delete', ['ui.router'])
		.config(deleteConfig);

		function deleteConfig($stateProvider){
			$stateProvider
				.state('delete', {
					url: '/delete',
					templateUrl: '/components/profile/deleteprofile.html',
					controller: DeleteController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}
		deleteConfig.$inject = ['$stateProvider'];

		function DeleteController($state,  UsersService, CurrentUser){
			var config = CurrentUser.get();
			var vm=this;
			vm.user = {};
			vm.user.id = config;
			vm.submit = function(){
				UsersService.delete(vm.user).then(function(response){
					console.log('delete Worked');
					$state.go('home');
				}) ;
			};
		}

		DeleteController.$inject = ['$state', 'UsersService', 'CurrentUser'];
})();