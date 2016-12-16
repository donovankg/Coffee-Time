var classApp = angular.module('weatherApp', []);

classApp.controller('weatherCtrl', function($scope,$http){
   var vm = $scope;
   vm.channelInfo = {
     heading:"Open Weather API Project",
     subheading:"Current weather",
   };

   $http.get("http://ip-api.com/json").success(function(data){
vm.lat = data.lat;
vm.lon = data.lon;
var apikey = "5babe75ca0e2081709ac0eda2202d4f9";
var openWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat="+ vm.lat + "&lon=" +vm.lon+ "&appid=" + apikey;
$http.get(openWeatherUrl).success(function(data){
vm.description = data.list[3].weather[0].description;
// console.log(data.list[0].weather[0].description);
vm.date= data.list[3].dt;
vm.joke = data.city.name;
vm.speed = (2.237*data.list[0].wind.speed).toFixed(1) + " mph";
vm.temp = data.list[3].main.temp;
vm.fTemp= (vm.temp*(9/5)-459.67).toFixed(1) + "F " ;
vm.cTemp= (vm.temp-273).toFixed(1) + "C " ;
vm.icon = "http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png";

switch(vm.description){
case 'mist':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/nature')",

     "background-size" : "cover"
   };
   break;
}
case 'clear sky':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/nature/sepia')",
     "background-size" : "cover"
   };
   break;
}
case 'rain':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/tech')",
     "background-size" : "cover"
   };
   break;
}
case 'broken clouds':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/architecture')",
     "background-size" : "cover"
   };
   break;
}
case 'few clouds':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/architecture')",
     "background-size" : "cover"
   };
   break;
}
case 'scattered clouds':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/architecture')",
     "background-size" : "cover"
   };
   break;
}
case 'thunderstorm':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/architecture')",
     "background-size" : "cover"
   };
   break;
}
case 'shower rain':{
 vm.weatherBackground = {
     "background": "url('http://placeimg.com/640/480/architecture')",

     "background-size" : "cover"
   };
   break;
}
default:
vm.weatherBackground={
  "background": "url('http://placeimg.com/640/480/nature')",
  "background-size" : "cover"
};
break;
}
});
   });
});

// var nextApp = angular.module('tommApp',[]);
// nextApp.controller('tommCtrl', function())
