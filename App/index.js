 angular.module("coffee-time", ['ui.router','mwl.calendar' ])

 .controller("HelloController", function ($scope) {
 	$scope.helloTo = {};
 	$scope.helloTo.title = "AngularJS";

 	console.log("im working");
 })


 .controller('QConvertController', function ($http, $log) {
 		this.currencyObject = {
 			from: null,
 			to: null,
 			amount: 0,
 			exchangeRate: null,
 			amountConverted: null
 		};
 		this.currencyCodes = [{
 				value: 'MXN',
 				display: 'Mexican Peso (MXN)'
 		},
 			{
 				value: 'USD',
 				display: 'US Dollar (USD)'
 		},
 			{
 				value: 'EUR',
 				display: 'Euro'
 		}];

 		this.convertCurrency = function () {
 			var currency_from = this.currencyObject.from;
 			var currency_to = this.currencyObject.to;
 			var currency_amount = this.currencyObject.amount;
 			this.currencyObject.exchangeRate = currencyConverter(currency_from, currency_to, 1);
 			this.currencyObject.amountConverted = this.currencyObject.exchangeRate * currency_amount;

 			function currencyConverter(currency_from, currency_to, currency_input) {
 				var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
 				var yql_query = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("' + currency_from + currency_to + '")';
 				var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
 				var http_response = httpGet(yql_query_url);
 				var http_response_json = JSON.parse(http_response);
 				console.log(yql_query_url);
 				return http_response_json.query.results.rate.Rate;
 			}

 			function httpGet(theUrl) {
 				var xmlHttp = null;
 				xmlHttp = new XMLHttpRequest();
 				xmlHttp.open("GET", theUrl, false);
 				xmlHttp.send(null);
 				console.log(xmlHttp.responseText)
 				return xmlHttp.responseText;
 			}
 		}
 	})
 	.filter('toDecimal', function () {
 		return function (input, precision) {
 			return input.toFixed(precision);
 		};
 	})

 .controller('TableController', function () {
 	this.save = function () {
 		var t = document.getElementById("theTable");
 		var row = document.createElement('tr');
 		row.setAttribute('class', 'clickable-row')
 		var td = document.createElement('td');
 		var input = document.createElement('input');
 		input.setAttribute('class', 'form-control');
 		input.setAttribute('type', 'text');
 		td.appendChild(input);
 		var td1 = document.createElement('td');
 		var input1 = document.createElement('input');
 		input1.setAttribute('class', 'form-control control');
 		input1.setAttribute('type', 'number');
 		input1.setAttribute('pattern', '0+\.[0-9]*[1-9][0-9]*$')
 		td1.appendChild(input1);
 		var td3 = document.createElement('td');
 		var input2 = document.createElement('input');
 		input2.setAttribute('class', 'cont');
 		td3.appendChild(input2);
 		var td2 = document.createElement('td');
 		td2.setAttribute('class', "text-center");
 		var button = document.createElement('input');
 		button.type = "button";
 		button.className = "btn btn-xs btn-primary";
 		button.value = "Delete";
 		button.addEventListener('click', function (event) {
 			if (event.target.parentNode.parentNode.className == 'clickable-row') {
 				var row = event.target.parentNode.parentNode;
 				row.parentNode.removeChild(row);
 			}
 		});
 		td2.appendChild(button);
 		var button1 = document.createElement('input');
 		button1.type = "button";
 		button1.className = "btn btn-xs btn-primary";
 		button1.value = "Edit";
 		button1.addEventListener('click', function (event) {
 			if (event.target.parentNode.parentNode.className == 'clickable-row') {
 				var row = event.target.parentNode.parentNode;
 			}
 		});
 		td2.appendChild(button1);
 		row.appendChild(td);
 		row.appendChild(td1);
 		row.appendChild(td3);
 		row.appendChild(td2);
 		t.appendChild(row);
 		window.addEventListener('onload', load);
 		var k = document.getElementById("theTable");
 		var storeLocal = k.innerHTML;
 		localStorage.setItem('storedValues', JSON.stringify(storeLocal));

 		function load() {
 			console.log('ko');
 			var storedValue = $.parseJSON(localStorage.getItem('storedValues'));
 			k.innerHTML = storedValue;
 			console.log(k);
 		}
 	}
 	this.convert = function (curr) {
 		var cu = curr;
 		var array = []
 		var k = document.getElementsByClassName("form-control control");
 		for (var i = 0; i < k.length; i++) {
 			var p = document.getElementsByClassName("form-control control")[i].value;
 			array.push(p);
 		}
 		conv(cu, array)

 		function conv(cu, array) {
 			if (cu == 'USD') {
 				var k = document.getElementsByClassName("cont");
 				for (var i = 0; i < k.length; i++) {
 					document.getElementsByClassName("cont")[i].value = array[i] + ' USD';
 				}
 			}
 			if (cu == 'MXN') {
 				var k = document.getElementsByClassName("cont");
 				for (var i = 0; i < k.length; i++) {
 					document.getElementsByClassName("cont")[i].value = (array[i] * 20.33).toFixed(2) + ' MXN';
 				}
 			}
 			if (cu == 'EUR') {
 				var k = document.getElementsByClassName("cont");
 				for (var i = 0; i < k.length; i++) {
 					document.getElementsByClassName("cont")[i].value = (array[i] * 0.96).toFixed(2) + ' EUR';
 				}
 			}
 		}
 	}
 })
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
 			'trending': {
 				url: '/',
 				templateUrl: 'App/dashviews/trendingV.html',
 				controller: 'HelloController'
 			},
 			'transaction': {
 				url: '/',
 				templateUrl: 'App/dashviews/calendarV.html',
 				controller: 'HelloController'
 			},
 			'transaction2': {
 				url: '/',
 				templateUrl: 'App/dashviews/transaction2.html',
 				controller: 'TableController',
 				controller: 'QConvertController',
 				controllerAs: 'vm'
 			},
 			'calendar': {
 				url: '/',
 				templateUrl: 'App/dashviews/transactionV.html',
 				controller: 'HelloController'
 			}
 		}
 	})

 }]);
