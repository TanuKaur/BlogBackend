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

    }
    catch(error)
    {

    }
}