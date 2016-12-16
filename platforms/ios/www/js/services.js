//angular.module('starter.services', [])
//	.factory('fetch', function ($http) {
//		return {
//			getAll: function (searchValue) {
//				return $http({
//					method: 'GET',
//					url: 'http://localhost:8100/search/index.xml?key=kcMk3OzhDbhUSbkov4cbw' + '&q=' + searchValue,
//					transformResponse: function (value) {
//						var x2js = new X2JS({});
//						var test = value.toString();
//						var response = angular.bind(x2js, x2js.xml_str2json, value)();
//						return response;
//					}
//				})
//			}
//		};
//	});
