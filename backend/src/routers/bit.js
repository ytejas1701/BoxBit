import express from "express";
import Bit from "../models/bit.js";

import auth from '../middleware/auth.js';

const bitRouter = new express.Router();

//create Bit
bitRouter.post(
    '/bit',
    auth,
    async ({ body }, res)=>{
        try{
            const bit = new Bit(body);
            await bit.save();
            res.send(bit);
        }catch(error){
            res.status(400).send(error);
        }
    });

//read Bit by id
bitRouter.get(
    '/bit/:id',
    auth,
    async({ params }, res)=>{
        try{    
            const bit = await Bit.findOne({
                _id: params.id,
            });
            if(!bit){throw new Error();}
            res.send(bit);
        }catch(error){
            res.status(400).send(error);
        }
    });

//read all Bits in a Box
bitRouter.get(
    '/box/:id/bit',
    auth,
    async({ params, query }, res)=>{
        var sortFilter={votes:-1,_id:-1};
        if(query.filter!==undefined &&
            query.filter!==null &&
            query.filter.toLowerCase()==="new"){sortFilter={_id:-1,votes:-1,}}

        try{
            const bits = await Bit.find({
                boxId: params.id
            }).sort(sortFilter).limit(12);
            res.send(bits);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

//read all Bits of a user
bitRouter.get(
    '/user/:id/bit',
    auth,
    async({ params, query }, res)=>{
        var sortFilter={votes:-1,_id:-1};
        if(query.filter!==undefined &&
            query.filter!==null &&
            query.filter.toLowerCase()==="new"){sortFilter={_id:-1,votes:-1,}}

        try{
            const bits = await Bit.find({
                userId: params.id
            }).sort(sortFilter).limit(12);
            res.send(bits);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

//edit Bit
bitRouter.patch(
    '/bit/:id',
    auth,
    async ({ params, body }, res)=>{
        try{
            const bit = await Bit.findOneAndUpdate({
                _id:params.id
            },
            body);
            if(!bit){throw new Error();}
            res.send(bit);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });
    

export default bitRouter;