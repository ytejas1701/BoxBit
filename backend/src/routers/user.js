import express from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

import auth from '../middleware/auth.js';

const userRouter = new express.Router();

//signup
userRouter.post(
    '/user/register',
    async ({ body }, res)=>{
        try{
            const user = new User(body);
            const salt = await bcrypt.genSalt(8);
            console.log(user.password);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            user.generateToken();
            res.send(user);
        }catch(error){
            res.status(400).send(error);
        }
    });

//login
userRouter.post(
    '/user/login',
    async ({ body }, res)=>{
        try{
            const user = await User.findOne({email: body.email});
            if(!user){
                throw new Error("invalid email");
            }
            const isValid = await bcrypt.compare(body.password, user.password);
            if(isValid){
                await user.generateToken();
                res.send(user);
            }else{
                throw new Error("invalid password");
            }
        }catch(error){
            res.status(404).send({error});
        }
    });

//logout
userRouter.post(
    '/user/logout',
    auth,
    async (req, res)=>{
        try{
            req.user.token = '';
            await req.user.save();
            res.send();
        }catch(error){
            res.status(500).send();
        }
    });

//read user by id
userRouter.get(
    '/user/:id',
    auth,
    async({params}, res)=>{
        try{
            const user = await User.findById(params.id);
            if(!user)throw new Error();
            res.send({_id:user._id, username:user.username, createdAt:user.createdAt, answers:user.answers, upvotes:user.upvotes, stars:user.stars});    
        }catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    });

//read all
userRouter.get(
    '/user/all',
    auth,
    async(req, res)=>{
        try{
            const users = await User.find({});
            res.send(users);    
        }catch(error){
            res.status(500).send(error);
        }
    });

//delete all
userRouter.delete(
    '/user',
    auth,
    async(req, res)=>{
        const user = await User.findByIdAndDelete(req.user.id);
        res.send(user);
    });



export default userRouter;