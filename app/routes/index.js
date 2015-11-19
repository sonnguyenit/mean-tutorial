var Post = require('../models/post');
module.exports = function (app) {
	app.get('/api/post/create', function(req, res){
		var newPost = new Post();
		// tạo đối tượng thể hiện lại của model Post và gán giá trị cho các thuộc tính của nó
		newPost.title = 'This is a title';
		newPost.description = 'This is a description for this post';
		newPost.content = 'Short content, just use for demo';
		newPost.creationDate = new Date();
		newPost.save(function(err, post) {
			// sử dụng phương thức save để insert
			// đối tượng xuống database
			if (err) {
				res.send(err); // nếu có lỗi sẽ trả về thông báo lỗi
			}
			else {
				res.json(post);
			}
			// nếu thêm thành công sẽ trả về giá trị mà ta mới chèn vào dưới dạng json
		});
	});
	app.get('/api/post/list', function(req, res){
		Post.find({}).sort({creationDate: -1}).exec(function(err, posts) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(posts);
			}
		});
	});
	app.get('/api/post/detail/:post_id', function(req, res){
		Post.findById(req.params.post_id).exec(function(err, post){
		if (err) {
			res.send(err);
		}
		else {
			res.json(post);
		}
		});
	});
	app.get('/api/post/edit/:post_id', function(req, res){
		Post.findById(req.params.post_id, function(err, data){
			// Tìm record có _id là tham số truyền vào trên đường dẫn trong bảng posts
			if(err) {
				res.send(err); // nếu lỗi thì trả về thông báo lỗi ngược lại ta sẽ sửa các cột của nó
			}
			else {
				data.title = 'Title after edit';
				data.description = 'Description has many changes';
				data.content = 'Content is here';
				data.save(function(err, post) { // Lưu lại đối tượng xuống db
				if (err) {
					res.send(err);
				}
				else {
					res.json(post); // trả về thông tin sau khi chỉnh sửa
				}
				});
			}
		});
	});
	app.get('/api/post/delete/:post_id', function(req, res) {
		Post.remove({_id : req.params.post_id}, function(err) {
			if (err) {
			res.send(err);
			}
			else {
			res.json({message: "Xóa thành công!"});
			}
		});
	});
	// app.get('*', function(req, res){
	// 	res.sendfile('public/index.html');
	// });
};