import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import Tracker from "./models/tracker.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("server connected");
})
.catch((error)=>{
    console.log(error);
})

app.post("/tracker",async (req,res) => {
    try {
    const {name,course,complete} = req.body

    if(!name || !course || !complete){
      return  res.status(400).json({
            success:false,
            message:"All feild are required"
        })
    }

    const newTracker = await Tracker.create({
        name,
        course,
        complete
    })

    res.status(200).json({
        success:true,
        message:"form submitted succesfully",
        tracker:newTracker
    })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success:false,
            message:"server error"
        })
        
    }
})

app.get("/tracker-sheet",async (req,res) => {
    try {
        const trackers = await Tracker.find()

        res.json({
            success:true,
            trackers
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success:false,
            message:"unable to fetch data"
        })
    }
})

app.listen(3000,()=>{
    console.log("server statrted");
    
})