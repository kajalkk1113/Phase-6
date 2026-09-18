import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Contact from "./models/Contact.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`server started on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed:", error);
});

app.post("/submit-contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All Field are required"
            });
        }

        const newContact = await Contact.create({
            name,
            email,
            message
        });

        res.status(200).json({
            success: true,
            message: "Contact submitted successfully",
            contact: newContact
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.json({
            success: true,
            contacts
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "unable to fetch contacts"
        });
    }
});