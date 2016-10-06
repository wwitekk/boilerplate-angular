app.factory('ItemsService', ['$http', function($http){
		var apiRoot = 'http://ergast.com/api/f1/',
			post = '.json?limit=300';
		return {
			getAllChampions: function(){
				var url = apiRoot + 'driverStandings/1' + post;
				return $http.get(url);
			},
			getChampionsByYears: function(startYear, endYear, champions){
				var result = champions.filter(function(champion){
					return champion.season >= startYear && champion.season <= endYear;
				}).map(function(champion){
					return {'season':champion.season, 'driver': champion.DriverStandings[0].Driver};
				});
				return result;
			},
			getRacesBySeason: function(season){
				url = apiRoot + season + '/results/1' + post;
				return $http.get(url);
			},
			getRacesWithWiners: function(races){
				return races.map(function(race){
					return {'raceName': race.raceName, 'driver' : race.Results[0].Driver};
				});
			}


		}
}]);