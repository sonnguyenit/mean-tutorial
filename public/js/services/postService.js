angular.module('postService', [])
.factory('Post',['$http', function($http) {
return {
	get: function () {
		return $http.get('/api/post/list');
	},
	detail: function(id){
		return $http.get('/api/post/detail/' + id);
	},
	delete: function(id){
		return $http.delete('/api/post/delete/'+ id);
	},
	create:function(formData){
		return $http.post('/api/post/create', formData);
	},
	edit : function(formData) {
		return $http.put('/api/post/edit', formData);
	}
};
}]);