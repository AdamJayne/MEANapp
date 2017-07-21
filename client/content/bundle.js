(function(){
	var app = angular.module('profconn', [
		'ui.router',
		'profconn.home',
		'profconn.auth.signup',
		'profconn.auth.signin',
		'profconn.profile',
		'profconn.usermap'
	]);
	function config($urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
	}
	config.$inject = ['$urlRouterProvider']
	app.config(config);
	app.constant('API_BASE', '//localhost:3000/');
})();
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
(function(){
	angular
		.module('profconn.auth.signup', ['ui.router'])
		.config(signupConfig);

		function signupConfig($stateProvider){
			$stateProvider
				.state('signup', {
					url: '/signup',
					templateUrl: '/components/auth/signup.html',
					controller: SignUpController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}
		signupConfig.$inject = ['$stateProvider'];

		function SignUpController($state, UsersService){
			var vm = this;
			vm.user = {};
			vm.message = "Sign up for an account!"
			vm.submit = function(){
				UsersService.create(vm.user).then(function(response){
					console.log('Worked here');
					$state.go('usermap');
				},function(err) {
					console.log(err);
				});
			};
		}

		SignUpController.$inject = ['$state', 'UsersService'];
})();
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

		function UserMapController(){

		}
		UserMapController.$inject = ['$state']
})();
(function(){
	angular.module('profconn')
		.factory('AuthInterceptor', ['SessionToken', 'API_BASE',
			function(SessionToken, API_BASE){
				return {
					request: function(config){
						var token = SessionToken.get();
						if (token && config.url.indexOf(API_BASE) > -1) {
							config.headers['Authorization'] = token;
						}
						return config;
					}
				};
			}]);
	angular.module('profconn')
		.config(['$httpProvider', function($httpProvider) {
			return $httpProvider.interceptors.push('AuthInterceptor');
		}]);
})();
(function(){
	angular.module('profconn')
		.service('CurrentUser', ['$window', function($window){
			function CurrentUser(){
				var currUser = $window.localStorage.getItem('currentUser');
				if (currUser && currUser !== "undefined") {
					this.currentUser= JSON.parse($window.localStorage.getItem('currentUser'));
				}
			}
			CurrentUser.prototype.set = function(user){
				this.currentUser = user;
				$window.localStorage.setItem('currentUser', JSON.stringify(user));
			};
			CurrentUser.prototype.get = function(){
				return this.currentUser || {};
			};
			CurrentUser.prototype.clear = function(){
				this.currentUser = undefined;
				$window.localStorage.removeItem('currentUser');
			};
			CurrentUser.prototype.isSignedIn = function(){
				return !!this.get()._id;
			};
			return new CurrentUser();
		}]);
})();
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
						return response;
					});
			};

			profileService.getProfile = function(){
				return profileService.currentProfile;
			};
		}
})();
(function(){
	angular.module('profconn')
		.service('SessionToken', ['$window', function($window) {
			function SessionToken(){
				this.sessionToken = $window.localStorage.getItem('sessionToken');
			}
			SessionToken.prototype.set = function(token) {
				this.sessionToken = token;
				$window.localStorage.setItem('sessionToken', token);
			};
			SessionToken.prototype.get = function(){
				return this.sessionToken;
			};
			SessionToken.prototype.clear = function(){
				this.sessionToken = undefined;
				$window.localStorage.removeItem('sessionToken');
			};
			return new SessionToken();
		}]);
})();

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
				return new UsersService();
			}]);
})();
//# sourceMappingURL=bundle.js.map
