(function(){
	angular
		.module('profconn.home', ['ui.router'])
		.config(homeConfig);

		function homeConfig($stateProvider){
			$stateProvider
				.state('home', {
					url:'/home',
					templateUrl: '/components/home/home.html',
					controller: HomeController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}
		homeConfig.$inject = ['$stateProvider'];
		function HomeController($state){
			console.log('home');
		}
		HomeController.$inject = ['$state'];
})();