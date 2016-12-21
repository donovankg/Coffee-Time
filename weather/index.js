var classApp = angular.module('coffee-time', []);

classApp.controller('weatherCtrl', function($http) {

    this.channelInfo = {
        heading: "Open Weather API Project",
        subheading: "Current weather",
    };
    $http.get("http://ip-api.com/json").then((data)=> {
        this.lat = data.data.lat;
        this.lon = data.data.lon;
        var apikey = "5babe75ca0e2081709ac0eda2202d4f9";

        var openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lon + "&appid=" + apikey;

        $http.get(openWeatherUrl).success((data)=> {
            this.description = data.weather[0].description;
            this.speed = (2.237 * data.wind.speed).toFixed(1) + " mph";
            this.name = data.name;
            this.temp = data.main.temp;
            this.fTemp = (this.temp * (9 / 5) - 459.67).toFixed(1) + "F ";
            this.cTemp = (this.temp - 273).toFixed(1) + "C ";

            this.date = (data.dt * 1000);

            this.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";



            switch (this.description) {
                case 'mist':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/mist.jpg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'clear sky':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/clearsky.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'rain':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/rain.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'broken clouds':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/broken.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'few clouds':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/few.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'scattered clouds':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/scattered.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'thunderstorm':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/thunderstorm.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                case 'shower rain':
                    {
                        this.weatherBackground = {
                            "background": "url('./image/shower.jpeg')",
                            "background-size": "cover"
                        };
                        break;
                    }
                default:
                    this.weatherBackground = {
                        "background": "url('./image/default.jpeg')",

                        "background-size": "cover"
                    };
                    break;
            }

        });
    });
});
