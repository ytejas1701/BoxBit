import mongoose from "mongoose";

const bitSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        immutable: true,
    },
    body: {
        type: String,
        trim: true,
        required: true,
    },
    boxId: {
        type: mongoose.Types.ObjectId,
        ref: "Box",
        required: true,
    },
    boxName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    upVotes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    downVotes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: {
        type: Number,
        default: 0,
    },
    isSolved: {
        type: Boolean,
        default: false, 
    }
}, {timestamps:true});

const bit = new mongoose.model('Bit', bitSchema);

export default bit;