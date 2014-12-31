(function () {
    'use strict';

    angular.module('G', ['ui.router'])

        .value('config', {
            apiUrl: '/api'
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "partials/home.html",
                    controller: 'HomeController'
                })
                .state('listen', {
                    url: "/listen/:url",
                    templateUrl: "partials/listen.html",
                    controller: 'ListenController'
                })
                .state('about', {
                    url: "/about",
                    templateUrl: "partials/about.html"
                });
        })

        .controller('HomeController', function ($scope, $state) {
            $scope.listen = function (form) {
                if (form.url.$valid) {
                    $state.go('listen', {url: $scope.url});
                } else {
                    sweetAlert("Oops...", "Check the mp3 url! It seems that it's not a valid one", "error");
                }
            };
        })

        .controller('ListenController', function ($scope, $stateParams, $sce, $http, config) {
            var handleError = function () {
                    $scope.id3 = {title: "There's a problem fetching ID3v2 tags. Nobody is perfect :)"};
                },
                vid = document.getElementById("player");

            $scope.url = $stateParams.url;

            $scope.id3 = {title: 'Fetching ID3v2 tags ...'};

            $http.get(config.apiUrl + '/mp3info?mp3=' + $scope.url).success(function (data) {
                try {
                    var title = data.hasOwnProperty('title') ?
                        data.title[0] :
                        data.album[0];

                    $scope.id3.title = title;
                    $scope.id3.album = data.album[0];
                    $scope.id3.artist = data.artist[0];
                } catch (err) {
                    handleError();
                }
            }).error(handleError);

            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            };

            $scope.podslow = function (percent) {
                vid.playbackRate = percent / 100;
            };
        })
    ;
}());