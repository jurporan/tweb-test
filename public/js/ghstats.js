var tweb = angular.module('ghstats', ["chart.js"]);
var apiBaseURL = "https://api.github.com"

tweb.controller("searchController", function($scope, $http){

    Chart.defaults.global.colours[1] = "#F7464A";
    Chart.defaults.global.colours[2] = "#DCDCDC";

    $scope.showSearchBar = true;
    $scope.showListUsers = false;
    $scope.showStats = false;
    $scope.foundUsers = [];

    $scope.searchUser = function(){
        if($scope.searchString == null || $scope.searchString.length < 1)
        { return; }

        $scope.searchQuery = apiBaseURL + "/search/users?q=" + $scope.searchString;
        $scope.foundUsers = [];

        $http({
          url: $scope.searchQuery,
          method: "GET"
        }).success(function (data, status, headers, config){
            $scope.showListUsers = true;
            for (index in data.items)
            {
                $scope.foundUsers.push({avatar:data.items[index].avatar_url, login:data.items[index].login, page:data.items[index].html_url, score:data.items[index].score})
            }

        }).error(function (data, status, headers, config) {
        });
    };

    $scope.back = function(){
        $scope.showListUsers = true;
        $scope.showSearchBar = true;
        $scope.showStats = false;
    }

    $scope.getUser = function(user){

        $scope.searchQuery = apiBaseURL + "/users/" + user.login + "/repos";

        $http({
          url: $scope.searchQuery,
          method: "GET"
        }).success(function (data, status, headers, config){
            $scope.showListUsers = false;
            $scope.showSearchBar = false;
            $scope.showStats = true;

            $scope.currentUser = user.login;
            $scope.currentPage = user.page;
            $scope.currentAvatar = user.avatar;
            $scope.currentScore = user.score;

            $scope.numberOfRepos = data.length;
            $scope.numberOfReposWithIssues = 0;
            $scope.numberOfReposWithPages = 0;
            $scope.numberOfReposWithWiki = 0;
            $scope.langs = new Object();

            $scope.barChartLabels = [];
            $scope.barChartData = [[]];

            for(i in data){
                if(!$scope.langs[data[i].language]){
                    $scope.langs[data[i].language] = 1;
                }
                else{
                    $scope.langs[data[i].language] += 1;
                }
                if(data[i].has_issues){
                    $scope.numberOfReposWithIssues += 1;
                }
                if(data[i].has_pages){
                    $scope.numberOfReposWithPages += 1;
                }
                if(data[i].has_wiki){
                    $scope.numberOfReposWithWiki += 1;
                }
            }

            for(key in $scope.langs)
            {
                if(key === "null"){
                    $scope.barChartLabels.push("Unknown");
                }
                else{
                    $scope.barChartLabels.push(key);
                }
                $scope.barChartData[0].push($scope.langs[key]);
            }

            $scope.pieChartIssuesData = [$scope.numberOfRepos - $scope.numberOfReposWithIssues, $scope.numberOfReposWithIssues];
            $scope.pieChartIssuesLabels = ["Repo without issues", "Repo with issues"];
            $scope.pieChartPagesData = [$scope.numberOfReposWithPages, $scope.numberOfRepos - $scope.numberOfReposWithPages];
            $scope.pieChartPagesLabels = ["Repo with pages", "Repo without pages"];
            $scope.pieChartWikiData = [$scope.numberOfReposWithWiki, $scope.numberOfRepos - $scope.numberOfReposWithWiki];
            $scope.pieChartWikiLabels = ["Repo with wiki", "Repo without wiki"];

        }).error(function (data, status, headers, config) {
        });

    };
});
