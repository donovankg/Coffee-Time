angular.module('coffee-time', [])

.controller("newsCtrl", function($http) {

  this.title;
  this.image;
  this.url;
  this.description;
    $http.get('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=bc809cc81f7346dbb2ee942407c79879')
      .then((response) => {
        //this.data = response.data;
        this.headlines = response.data.articles;
        this.title = this.headlines[0].title;
        this.image = this.headlines[0].urlToImage;
        this.url = this.headlines[0].url;
        this.description = this.headlines[0].description;
      })

       this.clickTitle = function(clicked) {
      this.title = clicked.title;
      this.image = clicked.urlToImage;
      this.description = clicked.description;
      this.url = clicked.url;
      }

      this.clickArticle = function(clicked) {
          this.title = clicked.url;
      }
    });
