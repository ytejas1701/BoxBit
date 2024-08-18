import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

console.log(JSON.stringify(process.env.MONGO_URI))

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('connected with mongodb successfully'))
    .catch((error)=>console.log(error))

export { mongoose };