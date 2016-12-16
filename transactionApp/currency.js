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
            console.log(yql_query_url );
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
      this.save = function() {
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
        //  input2.setAttribute('type', 'number');
         td3.appendChild(input2);
         var td2 = document.createElement('td');
         td2.setAttribute('class', "text-center");
         var button = document.createElement('input');
         button.type ="button";
         button.className ="btn btn-xs btn-primary";
         button.value ="Delete";
         button.addEventListener('click', function(event){
           if(event.target.parentNode.parentNode.className=='clickable-row'){
             var row = event.target.parentNode.parentNode;
             row.parentNode.removeChild(row);
           }
         });
        td2.appendChild(button);
        var button1 = document.createElement('input');
        button1.type ="button";
        button1.className ="btn btn-xs btn-primary";
        button1.value ="Edit";
        button1.addEventListener('click', function(event){
          if(event.target.parentNode.parentNode.className=='clickable-row'){
            var row = event.target.parentNode.parentNode;
            
          }
        });
       td2.appendChild(button1);
       row.appendChild(td);
       row.appendChild(td1);
       row.appendChild(td3);
       row.appendChild(td2);
       t.appendChild(row);

       var section = document.getElementsByClassName("container-fluid");
       var storeLocal = section.innerHTML;
       localStorage.setItem('storedValues', storeLocal);

     }

      this.convert=function(curr){
        var cu= curr;
        var array=[]
        var k=document.getElementsByClassName("form-control control");
        for(var i=0; i<k.length; i++){
          var p = document.getElementsByClassName("form-control control")[i].value;
          array.push(p);
        }
        conv(cu,array)
        function conv(cu, array){
          if(cu=='USD'){
            var k = document.getElementsByClassName("cont");
            for(var i=0; i<k.length; i++){
             document.getElementsByClassName("cont")[i].value = array[i] + ' USD';
            }
          }
          if(cu=='MXN'){
            var k = document.getElementsByClassName("cont");
            for(var i=0; i<k.length; i++){
             document.getElementsByClassName("cont")[i].value = (array[i]*20.33).toFixed(2) + ' MXN';
            }
          }
          if(cu=='EUR'){
            var k = document.getElementsByClassName("cont");
            for(var i=0; i<k.length; i++){
             document.getElementsByClassName("cont")[i].value = (array[i]*0.96).toFixed(2) + ' EUR';
            }
          }
        }
      }
    });
