var mongoose = require ('mongoose');
 
var blogSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    imageUrl: {type: String},   
})

var Blog = mongoose.model('Blog', blogSchema)   
module.exports = Blog;