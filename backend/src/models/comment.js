import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        trim: true,
        required: true,
    },
    bitId: {
        type: mongoose.Types.ObjectId,
        ref: "Bit",
        required: true,
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    level: {
        type: Number,
        default: 0,
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
    isSolution: {
        type: Boolean,
        default: false, 
    }
}, {timestamps:true});

const comment = new mongoose.model('Comment', commentSchema);

export default comment;