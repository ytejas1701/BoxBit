import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if(value.length==0){
                throw new Error('usernnames cannot be empty');
            }else if(value[0] != value[0].toLowerCase()){
                throw new Error('usernames must be in Camel Case');
            }
        }

    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        immutable: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('invalid email');
            }
        }
    },
    password: { 
        type: String,
        trim: true,
        required: true,
        immutable: true,
        validate(value) {
            if(value.length<=6){
                throw new Error('length of password must be greater than 6');
            }
        }  
    },
    token: {
        type: String,
        default: '',
    }
});

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id: this._id.toString()}, 'lifesucks');
    this.token = token;
    this.save();
}

const User = mongoose.model('User', userSchema);

export default User;