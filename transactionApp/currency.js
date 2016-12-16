var myApp =angular.module('myApp',[]);


myApp.controller('QConvertController', function($http, $log, $interval) {


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

          this.currencyObject.exchangeRate = currencyConverter(currency_from, currency_to, 1);
          this.currencyObject.amountConverted = this.currencyObject.exchangeRate * currency_amount;

          function currencyConverter(currency_from,currency_to,currency_input)
          {
            var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
            var yql_query = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("'+currency_from+currency_to+'")';
            var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            var http_response = httpGet(yql_query_url);
            var http_response_json = JSON.parse(http_response);
            console.log(yql_query_url )


            return http_response_json.query.results.rate.Rate;
          }

          function httpGet(theUrl){
            var xmlHttp = null;
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false );
            xmlHttp.send( null );
            console.log(xmlHttp.responseText)
            return xmlHttp.responseText;
          }
        }
    });
    myApp.filter('toDecimal', function() {
        return function(input, precision) {
            return input.toFixed(precision);
        };
    });
    myApp.controller('TableController', function(){

      this.addRow = function() {
          var t = document.getElementById("theTable");
          var rows = t.getElementsByTagName("tr");
          var r = rows[rows.length - 1];
          r.parentNode.insertBefore(getTemplateRow(), r);
        }

      var maxID = 0;
      function getTemplateRow() {
          var x = document.getElementById("templateRow").cloneNode(true);
          x.id = "";
          x.style.display = "";
          x.innerHTML = x.innerHTML.replace(/{id}/, ++maxID);
          return x;
      }



    });
