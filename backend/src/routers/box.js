import express from "express";
import Box from "../models/box.js";
import Bit from "../models/bit.js";
import auth from '../middleware/auth.js';

const boxRouter = new express.Router();

//create Box
boxRouter.post(
    '/box',
    auth,
    async ({ body }, res)=>{
        try{
            const box = new Box(body);
            await box.save();
            res.send(box);
        }catch(error){
            res.status(400).send(error);
        }
    });

//read Box
boxRouter.get(
    '/box/:name',
    auth,
    async({ params }, res)=>{
        try{    
            const box = await Box.findOne({
                name: params.name,
            });
            if(!box){throw new Error();}
            res.status(200).send(box);
        }catch(error){
            res.status(400).send(error);
        }
    });

//delete Box
boxRouter.delete(
    '/box/:name',
    async({ params }, res)=>{
        try{
            const bits = await Bit.deleteMany({
                boxName: params.name,
            });    
            const box = await Box.findOneAndDelete({
                name: params.name,
            });
            if(!box){throw new Error();}
            res.status(200).send(box);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

export default boxRouter;