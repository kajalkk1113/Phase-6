import mongoose from "mongoose";

const notesShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const note = mongoose.model("note",notesShema);
export default note;