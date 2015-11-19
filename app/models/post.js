'use strict';
 
// require thư viện tương tác với mongo
 
var mongoose = require('mongoose');
 
// tạo cấu trúc bảng posts dùng hàm Schema&amp;nbsp;
 
var schema = mongoose.Schema({
 title:        {type: 'String', required: true, index:true},
 description:  {type: 'String', required: true},
 content:      {type: 'String', required: true},
 creationDate: {type: 'Date', required: true}
 
});
 
// export vào app với tên model là Post
 
module.exports = mongoose.model('Post', schema);