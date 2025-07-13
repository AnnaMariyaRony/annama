const mongoose =require ("mongoose")
const Blogschema = mongoose.Schema({
  title:{type: String},
  content:{type: String},
  img_url:{type: String},
  category:{type: String}
});
const Blog = mongoose.model('Blog',Blogschema);

module.exports =Blog;
