(function(){
	angular
		.module('profconn.profile', ['ui.router'])
		.config(profileConfig);

		function profileConfig($stateProvider){
			$stateProvider
				.state('profile', {
					url: '/profile',
					templateUrl: '/components/profile/profile.html',
					controller: ProfileController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}
		profileConfig.$inject = ['$stateProvider'];

		function ProfileController($state, ProfileService, CurrentUser){
			var vm = this;
			ProfileService.fetch().then(function(data){
				vm.username= data.username
				vm.email= data.email
				vm.usertype= data.usertype
				vm.profession= data.profession
				vm.address= data.address
				vm.contact= data.contact
			});
		}

		ProfileController.$inject = ['$state', 'ProfileService', 'CurrentUser'];
})();