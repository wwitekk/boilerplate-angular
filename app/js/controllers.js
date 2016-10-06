app.controller('ListCtrl', ['ItemsService', function(itemsService){
	var self = this;
	var settings = {
		startYear : 2005,
		endYear : 2015
	};
	self.recentChampions = [];
	self.sortby = 'season';
	self.reverse = true;
	self.sort = function(sortby){
		if(self.sortby == sortby) {
			self.reverse = (!self.reverse);
		}
		self.sortby = sortby;
	};
	self.loading = true;

	championsPromise = itemsService.getAllChampions();
	championsPromise.then(function(result){
		var standingLists = result.data.MRData.StandingsTable.StandingsLists;
		self.recentChampions = itemsService.getChampionsByYears(settings.startYear, settings.endYear, standingLists);
		self.loading = false;
	})
}]);

app.controller('DetailsCtrl', ['ItemsService', '$routeParams', function(itemsService, $routeParams){
	var self = this;
	self.season = {};
	self.winner = $routeParams.w;
	self.year = $routeParams.year;

	seasonPromise = itemsService.getRacesBySeason(self.year);
	seasonPromise.then(function(details){
		var allDetails = details.data.MRData.RaceTable.Races;
		self.season = itemsService.getRacesWithWiners(allDetails);
	})
}]);