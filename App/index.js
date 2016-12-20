
 angular.module("coffee-time", ['ui.bootstrap','ui.router', 'mwl.calendar'])

 //Controllers for coffee time app *********************

.factory('CurrencyConvert', function($http, $log){
    var httpGet = function(theUrl){
      var xmlHttp = null;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false );
      xmlHttp.send( null );
      return xmlHttp.responseText;
    }
    return {
      getExchangeRate: function(currency_from,currency_to,currency_input){
        var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
        var yql_query = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("'+currency_from+currency_to+'")';
        var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        var http_response = httpGet(yql_query_url);
        var http_response_json = JSON.parse(http_response);
        return http_response_json.query.results.rate.Rate;
      },
      load : function(){
        var k = document.getElementById('theTable');
        var storedValue =JSON.parse(localStorage.getItem('storedValues'));
        k = storedValue;
      }
    }
})
 
 .controller("HelloController", function ($scope) {
 	$scope.helloTo = {};
 	$scope.helloTo.title = "AngularJS";

 	console.log("im working");
 })

.controller('QConvertController', function(CurrencyConvert) {
      this.currencyObject = {
              from : null,
              to  : null,
              amount : 0,
              exchangeRate : null,
              amountConverted: null
      };
      this.currencyCodes = [{value : 'MXN', display : 'Mexican Peso (MXN)'},
                            {value : 'USD', display : 'US Dollar (USD)'},
                            {value : 'EUR', display : 'Euro'}];
      this.convertCurrency = function(){
        var currency_from = this.currencyObject.from;
        var currency_to = this.currencyObject.to;
        var currency_amount = this.currencyObject.amount;
        this.currencyObject.exchangeRate = CurrencyConvert.getExchangeRate(currency_from, currency_to, 1);
        this.currencyObject.amountConverted = this.currencyObject.exchangeRate * currency_amount;
      }
    })
.filter('toDecimal', function() {
    return function(input, precision) {
        return input.toFixed(precision);
    };
})
.controller('TableController', function(CurrencyConvert){
    this.statement;
    this.load = function(){
      this.statement = JSON.parse(localStorage.getItem('storedValues'));
    }
    this.load();
    this.addRow = function(){
      var newStatement = {'transaction':this.transaction,'amount':this.amount, 'conversion': this.conversion};
      this.statement[this.statement.length] = newStatement;
      localStorage.setItem('storedValues', JSON.stringify(this.statement));
      this.load();
    	this.transaction='';
    	this.amount='';
      this.conversion='';

        };
    this.convert=function(curr){
      for(var i=0; i<this.statement.length; i++){
        if(curr=='USD'){
            this.statement[i].conversion= this.statement[i].amount + ' USD';
          }
        if(curr=='MXN'){
          this.statement[i].conversion= ((this.statement[i].amount) * (CurrencyConvert.getExchangeRate('USD', 'MXN', 1))).toFixed(2) + ' MXN';
          }
        if(curr=='EUR'){
          this.statement[i].conversion= ((this.statement[i].amount) * (CurrencyConvert.getExchangeRate('USD', 'EUR', 1))).toFixed(2) + ' EUR';
          }
      }
    };
    this.edit=function(index){
      this.transaction = this.statement[index].transaction;
      this.amount = this.statement[index].amount;
      this.dialog = true;
      this.saveEdit =()=>{
        this.statement[index].transaction =this.transaction;
        this.statement[index].amount =this.amount;
        localStorage.setItem('storedValues', JSON.stringify(this.statement));
        this.dialog = false;
      }
    };
    this.delete=function(index){
        this.statement.splice(index, 1);
        localStorage.setItem('storedValues', JSON.stringify(this.statement));
    }
})
 
.controller('calendarCtlr', function(moment, calendarConfig) {

this.showAdd = true;
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
          this.showAdd = true;
          // this.applyEvent();

        }
        this.addEvent = function() {

            // this.applyEvent();
            this.showAdd =false;
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
 				templateUrl: 'App/dashviews/calendarV.html',
 				controller: 'calendarCtlr',
				controllerAs: 'vm'
 			}
 		}
 	})

 }])