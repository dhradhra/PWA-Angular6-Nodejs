var mongoose = require ('mongoose');
 
var postSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    imageUrl: {type: String},   
    blogId:  {type: String}
})

var Post = mongoose.model('Post', postSchema)
module.exports = Post;