import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        immutable: true,
        validate(value) {
            if(value.length==0){
                throw new Error('box names cannot be empty');
            }else if(value[0] != value[0].toUpperCase()){
                throw new Error('box names must be in Pascal Case');
            }
        }
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    admins: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            username: {
                type: String,
                required: true,
            }
        }
    ]
},{timestamps:true});

const Box = new mongoose.model('Box', boxSchema);

export default Box;