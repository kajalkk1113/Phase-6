import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import Feedback from "./models/feedback.js"
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MONGODB connect")
})
.catch((error)=>{
    console.log(error)
});

app.post("/form",async(req,res)=>{
    const {name,rating,comment}=req.body;
    try {
        if(!name || !rating || !comment){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    const newFeedback = await Feedback.create({
        name,
        rating,
        comment
    })

    res.status(201).json({
        success:true,
        message:"form submitted successfully",
        feedback:newFeedback

    })
 
    } catch (error) {
     console.log(error);
        
     res.status(500).json({
        success:false,
        message:"something went wrong"
     })
    }
    
})


app.get("/feedback-detail",async(req,res)=>{
    try {
        const feedbacks =await Feedback.find()

        res.json({
            success:true,
            feedbacks
        })
    } catch (error) {
        console.log(error);
    
        res.status(500).json({
            success:false,
            message:"Unable to fetch data"
        })
    }
})

app.listen(3000,()=>{
    console.log("server start");
})