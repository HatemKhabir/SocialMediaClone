import Post from "../mongodb//models/post.js"
import User from "../mongodb/models/User.js";

//Create

export const createPost=async(req,res)=>{
    try {
        const{userId,description,picturePath}=req.body;
        const user=await User.findbyId(userId);
        const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();
        const post=await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({message:error.message});
        
    }
}

//read

export const getFeedPosts=async(req,res)=>{
    try {
        const post=await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message});
        
    }
}

export const getUserPosts=async(req,res)=>{
    try {
        const {userId}=req.params;
        const posts=await Post.find({userId});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message});
        
    }
}

//update

export const likePost=async(req,res)=>{
    try {
       const {id}=req.params
       const{userId}=req.body;
       const post=await Post.findbyId(id);
       //this one , likes in post is a map , so it returns the value if userId exist in likes map , true or false since it's type of boolean
       const isLiked=post.likes.get(userId);

       if (isLiked){
        post.likes.delete(userId);
       }else{
        post.likes.set(userId,true);
       }

       const updatedPost=await Post.findbyIdAndUpdate(
        id,{likes:post.likes},{new:true}
       );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({message:error.message});
        
    }
}