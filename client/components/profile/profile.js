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
			vm.user={};
			vm.message ="Update your profile by filling in the fields."
			vm.submit = function(){
				console.log(vm.user)
				ProfileService.update(vm.user).then(
					function(response){
						console.log('updated!');
						$state.go('profile', {}, {reload: "profile"});
					}
				)
			}
			ProfileService.fetch().then(function(data){
				vm.username= data.username
				vm.email= data.email
				vm.usertype= data.usertype
				vm.profession= data.profession
				vm.address= data.address
				vm.description=data.description
				vm.contact= data.contact
			});
		}

		ProfileController.$inject = ['$state', 'ProfileService', 'CurrentUser'];
})();