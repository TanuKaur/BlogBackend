// import model 
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");


// business logic
exports.createComment = async(req,res)=>{
    try{
        //  fetch data from req.body
        const {post,user,body} = req.body;

        // create a Comment object
        const comment = new Comment({
           post,user,body 
        });

        // save in the db
        const savedComment = await comment.save();
  
        // find post by id,add the new comment in the comment array of tha post
        
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}},{new:true}).populate("comments").exec();

        res.json({
            post: updatedPost,
        });
       }
    catch(error)
    {
    return res.status(500).json({
        error:"Error while creating comment",
    });
    }
}