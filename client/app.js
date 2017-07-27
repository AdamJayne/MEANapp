(function(){
	var app = angular.module('profconn', [
		'ui.router',
		'profconn.home',
		'profconn.auth.signup',
		'profconn.auth.signin',
		'profconn.profile',
		'profconn.usermap',
		'profconn.delete'
	]);
	function config($urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
	}
	config.$inject = ['$urlRouterProvider']
	app.config(config);
	app.constant('API_BASE', '//localhost:3000/');
})();