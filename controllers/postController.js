// import model 
const Post = require("../models/postModel");

// business logic
exports.createPost = async(req,res)=>{
    try{
        //  fetch data from req.body
        const {title,body} = req.body;

        // create a Comment object
        const post = new Post({
           title,body 
        });

        // save in the db
        const savedPost = await post.save();
  
        res.json({
            post: savedPost,
        });
    }
    catch(error)
    {
    return res.status(400).json({
        error:"Error while creating post",
    });
    }
}


exports.getAllPosts = async(req,res) =>{
 try{
     const posts = await Post.find();
     res.json({
        posts,
     })
 }
 catch(error)
 {
 return res.status(400).json({
     error:"Error while creating post",
 });
 }
}