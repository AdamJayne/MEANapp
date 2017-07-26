(function(){
	angular.module('profconn')
		.service('CurrentUser', ['$window', function($window){
			function CurrentUser(){
				var currUser = $window.localStorage.getItem('currentUser');
				// if(currUser){
				// 	console.log("true");
				// }else{
				// 	console.log("false")
				// };
				if (currUser && currUser !==  "undefined") {
					console.log("annoying");
					this.currentUser= JSON.parse($window.localStorage.getItem('currentUser'));
				}

			}
			CurrentUser.prototype.set = function(user){
				this.currentUser = user;
				$window.localStorage.setItem('currentUser', JSON.stringify(user));
			};
			CurrentUser.prototype.get = function(){
				// console.log(this.currentUser);
				return this.currentUser || false;
			};
			CurrentUser.prototype.clear = function(){
				this.currentUser = undefined;
				$window.localStorage.removeItem('currentUser');
			};
			CurrentUser.prototype.isSignedIn = function(){
				return !!this.get();
			};
			return new CurrentUser();
		}]);
})();