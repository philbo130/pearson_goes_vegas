 var app = angular.module('PearsonVegas', []);

 app.controller('AttendeesListController', ['$http', function($http){

 	this.attendees = []; //or can say "null"

 	var controller = this; //redefine what the controller is
	//'$http' to get the angular service. as soon as get instantiated, we get back below:

	$http.get('/attendees').then( //AJAX request
		//success
		function(response){
			controller.attendees = response.data;
			console.log(controller.attendees);
		}, 
		//error
		function(){
			console.log(err);
		}
	)
 }]);

 app.controller('CreateAttendeeController', ['$scope', '$http', function($scope, $http){
 	var controller = this;
 	this.create = function(){
 		$http({
 			method: 'POST',
 			url: '/attendees',
 			data: this
 		}).then(
 		//success
 		function(response){
 			console.log(response);
 			$scope.$$nextSibling.attendeesCtrl.attendees.push(response.data);
 			controller.name = ' ';
 			controller.comment = ' ';
 		},
 		//fail
 		function(){
 			console.log(err)
 		})
 	}
 }]);
