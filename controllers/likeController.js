// import model 
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// business logic
exports.likePost = async(req,res)=>{
    try{
        //  fetch data from req.body
        const {post,user} = req.body;  

        // create a Comment object
        const like = new Like({
           post,user
        });

        // save in the db
        const savedLike = await like.save();
  
        // find post by id,add the new like in the like array of tha post
        
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{likes:savedLike._id}},{new:true}).populate("likes").exec();

        res.json({ 
            post: updatedPost,
        });
    }
    catch(error)
    {
    return res.status(500).json({
        error:"Error while liking post",
    });
    }
}

exports.unlikePost = async(req,res)=>{
    try{
        //  fetch data from req.body
        const {post,like} = req.body;  

        // find like by id and delete it
        
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull: {likes:deletedLike._id}},{new:true});

        res.json({ 
            post: updatedPost,
        });
    }
    catch(error)
    {
    return res.status(500).json({
        error:"Error while Unliking post",
    });
    }
}