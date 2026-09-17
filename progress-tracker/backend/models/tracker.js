import mongoose from "mongoose";

const trackerSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    complete:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    lastUpdate:{
        type:Date,
        default:Date.now
    }
})

const Tracker = mongoose.model("Tracker",trackerSchema)

export default Tracker;