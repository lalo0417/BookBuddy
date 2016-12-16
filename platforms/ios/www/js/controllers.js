angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http, $ionicLoading) {

	$scope.search = function () {
		$scope.value = document.getElementById("search").value;
		console.log($scope.value);

		$http({
			method: "GET",
			url: 'https://www.goodreads.com/search/index.xml?key=jVmi22hdBIcSb1ZmqwNhPg' + '&q=' + $scope.value
		}).then(function (res) {
			$scope.booksToShow = res.data.GoodreadsResponse.search.results.work;
		}, function (err) {})
	}

	$scope.doRefresh = function () {
		$scope.value = document.getElementById("search").value;
		$http({
			method: "GET",
			url: 'https://www.goodreads.com/search/index.xml?key=jVmi22hdBIcSb1ZmqwNhPg' + '&q=' + $scope.value
		}).then(function (res) {
			$scope.booksToShow = res.data.GoodreadsResponse.search.results.work;
			$scope.$broadcast('scroll.refreshComplete');
		}, function (err) {})
	}
	$scope.onSwipeLeft = function () {
		console.log("Swiped Left");
	};
}])

.controller('LoadingCtrl', function ($scope, $ionicLoading) {
	$scope.show = function () {
		$ionicLoading.show({
			template: 'Loading...',
			duration: 3000
		}).then(function () {
			console.log("The loading indicator is now displayed");
		});
	};
	$scope.hide = function () {
		$ionicLoading.hide().then(function () {
			console.log("The loading indicator is now hidden");
		});
	};
})

.controller('DetailsCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function ($scope, $http, $stateParams, $ionicLoading) {
	$scope.value = document.getElementById("search").value;
	$scope.bookID = $stateParams.bookID;
	$ionicLoading.show();
	$http({
		method: "GET",
		url: 'https://www.goodreads.com/book/show/' + $scope.bookID + '.xml?key=jVmi22hdBIcSb1ZmqwNhPg'
	}).then(function (res) {
			$ionicLoading.hide();
			$scope.thisBook = res.data.GoodreadsResponse.book;
			if ($scope.thisBook.title.__cdata == null) {
				$scope.showBookName = $scope.thisBook.title;
			} else {
				$scope.showBookName = $scope.thisBook.title.__cdata;
			}
			$scope.showBookImage = $scope.thisBook.image_url;

			//certain books have multiple authors. This prevents that from hiding the author name
			$scope.showBookAuthor = $scope.thisBook.authors.author.name;
			if ($scope.showBookAuthor == null) {
				$scope.showBookAuthor = $scope.thisBook.authors.author[0].name;
			}
			$scope.showBookDescription = $scope.thisBook.description.__cdata.replace(/<br\s*\/?>/mg, "\n");
			$scope.showBookPublication = $scope.thisBook.publication_day + "/" + $scope.thisBook.publication_month + "/" + $scope.thisBook.publication_year
		},
		function (err) {})
}])


.controller('EventsCtrl', ['$scope', '$http', '$ionicLoading', function ($scope, $http, $ionicLoading) {
	$scope.eventsWithinDates = [];
	$scope.searchEvents = function () {
		$scope.eventsWithinDates = [];
		$scope.eventsWithinDates.length = 0;
		var self = this;
		$ionicLoading.show();
		$http({
			method: "GET",
			url: 'https://www.goodreads.com/event/index.xml?search[country_code]=CA&key=jVmi22hdBIcSb1ZmqwNhPg'
		}).then(function (res) {
				$ionicLoading.hide();
				$scope.events = res.data.GoodreadsResponse.events.event;
				$scope.userDateOne = new Date(self.dateString_one);
				$scope.userDateTwo = new Date(self.dateString_two);
				console.log("Dates: ", self.dateString_one);
				console.log("Dates: ", self.dateString_two);

				for (var x = 0; x < $scope.events.length; x++) {
					if ((new Date($scope.events[x].start_at.__text)) > $scope.userDateOne && (new Date($scope.events[x].start_at.__text)) < $scope.userDateTwo) {
						self.eventsWithinDates.push($scope.events[x]);
					}
					//					if (new Date($scope.events[x].start_at.__text) > $scope.date_one && $scope.events[x].start_at.__text < $scope.date_two) {
					//						$scope.eventsWithinDates.push($scope.events[x]);
					//						console.log($scope.eventsWithinDates);
					//					}
				}
				console.log($scope.eventsWithinDates);
			},
			function (err) {})
	}
			}])
