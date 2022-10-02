import express from "express";
import Comment from "../models/comment.js";

import auth from '../middleware/auth.js';

const commentRouter = new express.Router();

//create comment
commentRouter.post(
    '/comment',
    auth,
    async ({ body }, res)=>{
        try{
            const comment = new Comment(body);
            await comment.save();
            res.send(comment);
        }catch(error){
            res.status(400).send(error);
        }
    });

//read comment
commentRouter.get(
    '/comment/:id',
    auth,
    async({ params }, res)=>{
        try{    
            const comment = Comment.findOne({
                _id: params.id,
            });
            if(!comment){throw new Error();}
            res.status(200).send(comment);
        }catch(error){
            res.send(400).send(error);
        }
    });

//read all comments in a bit
commentRouter.get(
    '/bit/:id/comment',
    auth,
    async({ params, query }, res)=>{
        var sortFilter={votes:-1,_id:-1};
        if(query.filter!==undefined &&
            query.filter!==null &&
            query.filter.toLowerCase()==="new"){sortFilter={_id:-1,votes:-1,}}

        try{    
            const comments = await Comment.find({
                bitId: params.id
            }).sort(sortFilter);
            res.send(comments);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

//vote Bit
commentRouter.patch(
    '/comment/:id',
    auth,
    async ({ params, body }, res)=>{
        try{
            const comment = await Comment.findOneAndUpdate({
                _id:params.id
            },
            body);
            if(!comment){throw new Error();}
            res.send(comment);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

export default commentRouter;