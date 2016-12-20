var classApp = angular.module('weatherApp', []);

classApp.controller('weatherCtrl', function($scope, $http) {
    var vm = $scope;
    vm.channelInfo = {
        heading: "Open Weather API Project",
        subheading: "Current weather",
    };

    $http.get("http://ip-api.com/json").success(function(data) {
        vm.lat = data.lat;
        vm.lon = data.lon;
        var apikey = "5babe75ca0e2081709ac0eda2202d4f9";
        var openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + vm.lat + "&lon=" + vm.lon + "&appid=" + apikey;
        $http.get(openWeatherUrl).success(function(data) {
            vm.description = data.weather[0].description;
            vm.speed = (2.237 * data.wind.speed).toFixed(1) + " mph";
            vm.name = data.name;
            vm.temp = data.main.temp;
            vm.fTemp = (vm.temp * (9 / 5) - 459.67).toFixed(1) + "F ";
            vm.cTemp = (vm.temp - 273).toFixed(1) + "C ";

            vm.date = data.dt;
            vm.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

            switch (vm.description) {
                case 'mist':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/mist.jpg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'clear sky':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/clearsky.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'rain':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/rain.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'broken clouds':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/broken.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'few clouds':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/few.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'scattered clouds':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/scattered.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'thunderstorm':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/thunderstorm.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'shower rain':
                    {
                        vm.weatherBackground = {
                            "background": "url('./image/shower.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                default:
                    vm.weatherBackground = {
                        "background": "url('./image/default.jpeg')",

                        "background-size": "cover"
                    };
                    break;
            }
        });
    });
});
$(document).ready(function() {
    $('#submit').click(function() {

        var cityName = $('#input').val();
        var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=5babe75ca0e2081709ac0eda2202d4f9";
        console.log(weatherURL);

        $.ajax({
            url: weatherURL,
            success: function(result) {
                console.log(result);

                var html;
                var type = $('#select').val();
                var label = $('#select option:selected').text();

                switch (type) {
                    case 'main':

                        var main = result.main;
                        html =
                            ' <ul>' +
                            ' <li><b>Temperature:</b> ' + main.temp + ' <em>(min: ' + main.temp_min + ', max: ' + main.temp_max + ')</em></li>' +
                            ' <li><b>Pressure:</b> ' + main.pressure + ' <em>(sea: ' + main.sea_level + ')</em></li>' +
                            ' </ul>';
                        break;
                    case 'weather':
                        html = " <ul>";
                        $.each(result.weather, function(key, weather) {
                            html +=
                                ' <li><img   class="weather-icon" src="http://openweathermap.org/img/w/' + weather.icon + '.png" /><b>' + weather.main + '</b></li>' + '<li><b>Description:</b> ' + weather.description + '</li>';
                        });
                        html += " </ul>";
                        break;

                    case 'wind':
                        var wind = result.wind;
                        html =
                            ' <ul>' +
                            ' <li><b>Degrees:</b> ' + wind.deg + '</li>' +
                            ' <li><b>Speed:</b> ' + wind.speed + '</li>' +
                            ' </ul>';
                        break;

                    case 'sys':
                        var sys = result.sys;
                        html =
                            ' <ul>' +
                            ' <li><b>Country:</b> ' + sys.country + '</li>' +
                            ' <li><b>Sunset:</b> ' + sys.sunset + '</li>' +
                            ' <li><b>Sunrise:</b> ' + sys.sunrise + '</li>' +
                            ' </ul>';
                        break;

                    case 'coord':
                        var coord = result.coord;
                        html =
                            ' <ul>' +
                            ' <li><b>Longitude:</b> ' + coord.lon + '</li>' +
                            ' <li><b>Latitude:</b> ' + coord.lat + '</li>' +

                            ' </ul>';
                        break;

                    default:
                    alert('Please select an valid option');
                }
                $('#content').prepend(
                    '<article class="weather">' +
                    ' <h2>' + result.name + ' <em></em></h2>' +
                    ' <article class="weather-main">' +
                    html +
                    ' </article>' +
                    '</article>'
                );
            }
        })

    })
});
