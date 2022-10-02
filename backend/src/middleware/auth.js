import jwt from 'jsonwebtoken';
import User from "../models/user.js";

const auth = async (req, res, next)=>{
    try{
        const token = req.header('AUthorization').replace('Bearer ', '');
        const {_id} = jwt.verify(token, 'lifesucks');
        const user = await User.findOne({_id, token});
        if(!user){throw new Error();}
        req.token = token;
        req.user = user;
        next();
    }catch(error){
        res.status(401).send({error:"Authorization failed"});
    }
}

export default auth;