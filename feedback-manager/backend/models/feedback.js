import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        enum:[
            "Poor",
            "Average",
            "Good",
            "Very Good",
            "Excellent"
        ],
        requires:true
    },

    comment:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Feedback = mongoose.model("feedback",feedbackSchema)
export default Feedback;