import mongoose from "mongoose"
import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import note from "./models/notes.js";

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MONGODB connected");
})
.catch((error)=>{
    console.log(error);
    
})

app.post("/note",async(req,res)=>{
    try {
        const {title,content} = req.body

        if(!title || !content){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        } 

        const newNote = await note.create({
            title,
            content
        })
        
        res.status(200).json({
            success:true,
            message:"note created!",
            note:newNote
        })

    
    } catch (error) {
        console.log(error);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    }
})


app.get("/notes-detail", async (req, res) => {
    try {
        const notes = await note.find();

        res.json({
            success: true,
            notes
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch data"
        });
    }
});

app.listen(3000,()=>{
    console.log("server connected");
    
})