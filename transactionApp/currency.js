var myApp =angular.module('myApp',[]);
myApp.factory('CurrencyConvert', function($http, $log){
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
      }
    }
})
myApp.controller('QConvertController', function(CurrencyConvert) {
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
    });
myApp.filter('toDecimal', function() {
    return function(input, precision) {
        return input.toFixed(precision);
    };
});
myApp.controller('TableController', function(CurrencyConvert){

    this.statement=[];
    this.load = function(){
			if (JSON.parse(localStorage.getItem('storedValues'))){
				      this.statement = JSON.parse(localStorage.getItem('storedValues'));
			}


    }
    this.addRow = function(){
      var newStatement = {'transaction':this.transaction,'amount':this.amount, 'conversion': this.conversion};
      this.statement.push(newStatement);
      localStorage.setItem('storedValues', JSON.stringify(this.statement));
      this.load();
    	this.transaction='';
    	this.amount='';
      this.conversion='';
        };
    this.load();
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
      this.edit.transaction = this.statement[index].transaction;
      this.edit.amount = this.statement[index].amount;
      this.dialog = true;
      this.cancel = function(){
        this.dialog = false;

      }
      this.saveEdit =()=>{
        this.statement[index].transaction =this.edit.transaction;
        this.statement[index].amount =this.edit.amount;
        localStorage.setItem('storedValues', JSON.stringify(this.statement));

        this.dialog = false;
      }
    };

    this.delete=function(index){

        this.statement.splice(index, 1);
        localStorage.setItem('storedValues', JSON.stringify(this.statement));


    }
});
