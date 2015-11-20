angular.module('postCtrl',[])
.controller('ListPostController',['$scope', '$state','Post', function($scope, $state, Post) {
	Post.get().success(function(data){
     $scope.posts = data;
   });
   $scope.deletePost = function(post_id){
	   Post.delete(post_id).success(function(){
		   $scope.success = 'Xóa bài viết thành công';
		   Post.get().success(function(data){
				$scope.posts = data;
			});
	   }).error(function(){
		   $scope.error = 'Có lỗi trong quá trình xóa bài viết';
	   });
   }
}])
.controller('CreatePostController',['$scope', '$state','Post', function($scope, $state, Post) {
	$scope.formData = {};
   $scope.createPost= function()
   {
     $scope.Proccess = true;
     if (!$.isEmptyObject($scope.formData)) {
       Post.create($scope.formData)
       .success(function(data)
       {
          $scope.formData = {};
          $scope.form.$setPristine();
          $scope.Proccess = false;
          $scope.success = 'Thêm bài viết mới thành công!';
          $state.go('post', {postId: data._id});
       })
       .error(function(data)
       {
          console.log(data);
          $scope.error = 'Có lỗi trong quá trình thêm bài viết.';
       });
    }
    else{
       $scope.error = 'Bạn cần điền đầy đủ các mục.';
       $scope.Proccess = false;
    }
  };
}])
.controller('DetailPostController',['$scope', '$state', '$http', '$stateParams', 'Post',
 function($scope, $state, $http,$stateParams, Post)
 {
 	Post.detail($stateParams.postId).success(function(data){
		 if(data != null){
           $scope.post = data;
        }else{
			$state.go('404');
		}
	 }).error(function(){
		 console.log('error');
	 });
   $scope.editPost = function()
  {
    $scope.Proccess = true;
    if (!$.isEmptyObject($scope.post)) {
      Post.edit($scope.post)
      .success(function(data)
      {
        $scope.Proccess = false;
        $scope.success = 'Sửa bài viết thành công!';
      })
      .error(function()
      {
        $scope.error = 'Có lỗi trong quá trình sửa bài viết.';
      });
    } else {
      $scope.error = 'Bạn cần điền đầy đủ các mục.';
      $scope.Proccess= false;
    }
  };
 }
]);