const { json } = require("body-parser");
const mongoose = require("mongoose");
const Comment = require("../models/comments")





module.exports.createComment = (req,res) =>{
    console.log("request", req.body)
        var comment = new Comment();
        comment.text = req.body.text;
        comment.user = req.body.userId;
    
        comment.save((err, comment) => {
            if(!err){
                res.json({comment:comment})
            } else{
                console.log(err)
            }
        }) 
};
module.exports.editComment = (req,res) =>{
    console.log(req.body.text)
    Comment.findByIdAndUpdate(req.params.id,{$set:{
        _id: req.params.id,
       text : req.body.text,
   }},{new:true})
   .then(result => {
    console.log('result from edit: ',result);
    res.status(200).json({
        message: 'update was a success!',
        updatedReview: result
});
})
};

module.exports.getComment = (req,res) =>{
    console.log(req.params.id)
    Comment.findById({_id: req.params.id})
    .then(review=>{
        console.log(review)
        res.json({review:review})
    })
    .catch(err=>{
        res.status(404).json({error: err, message:'Review not found, please try again.'})
    })
}

module.exports.getComments = (req,res) =>{
    console.log('hit')
    Comment.find()
    .populate({ 
        path: 'user',
     })
    .then(comments=>{
        console.log(comments)
        res.json({comments:comments})
    })
};

module.exports.deleteComment = (req,res) =>{
    console.log(req.params.id)
    Comment.deleteOne({_id:req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message:"blog deleted successfully!"})
    })
};
