 angular.module("coffee-time", ['ui.router','mwl.calendar' ])
 
 .controller("HelloController", function ($scope) {
 	$scope.helloTo = {};
 	$scope.helloTo.title = "AngularJS";

 	console.log("im working");
 })
 
 .controller('calendarCtlr', function(moment, calendarConfig) {

        this.events;

        this.loadData = function() {
            var retrievedData = localStorage.getItem('events');
            this.events = JSON.parse(retrievedData);
        }
        this.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };
        this.loadData();
        console.log(this.events);


        this.deleteEntry = function(index) {

            this.events.splice(index, 1)
            localStorage.setItem('events', JSON.stringify(this.events));

        }
        this.calendarView = 'month';
        this.viewDate = new Date();
        this.title;
        this.closeWindow= function(){
          localStorage.setItem('events', JSON.stringify(this.events));
        }
        this.addEvent = function() {

            this.applyEvent();
        }

        this.applyEvent = function() {
            var newEvent = {
                title: 'newTitle',
                startsAt: new Date(2016, 11, 15, 1),
                endsAt: new Date(2016, 11, 16, 15),
                color: calendarConfig.colorTypes.info
            }

            this.events[this.events.length] = newEvent;
            console.log('- this.events-->', this.events);
            localStorage.setItem('events', JSON.stringify(this.events));

            this.loadData();
        }
    })


 .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
 	$urlRouterProvider.otherwise('/');

 	$stateProvider
 		
		.state('root', {
			url: '',
			views: {
				'trending':{
					url: '/',
 					templateUrl: 'App/trendingV.html',
					controller: 'HelloController'
				},
				'transaction': {
					url: '/',
 					templateUrl: 'App/transactionV.html'
				},
				'calendar':{
					url: '/',
 					templateUrl: '/calendar/calendar.html',
					controller: 'calendarCtlr'
				}
			}
	})

 }]);

 
 
 