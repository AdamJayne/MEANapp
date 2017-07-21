(function(){
	angular
		.module('profconn.auth.signin', ['ui.router'])
		.config(signinConfig);
		function signinConfig($stateProvider){
			$stateProvider
				.state('signin', {
					url: '/signin',
					templateUrl: '/components/auth/signin.html',
					controller: SignInController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}
		signinConfig.$inject = ['$stateProvider'];

		function SignInController($state, UsersService){
			var vm = this;
			vm.user = {};
			vm.submit = function(){
				UsersService.login(vm.user).then(function(response){
					console.log('signinworked');
					$state.go('usermap');
				}, function(err){
					console.log(err);
				});
			};
		}

		SignInController.$inject = ['$state', 'UsersService'];
})();