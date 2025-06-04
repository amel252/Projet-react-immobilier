import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv on l'appelle avec ca
dotenv.config();

const app = express();
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to BD");
    })
    .catch((err) => {
        console.log(err);
    });
app.listen(3000, () => {
    console.log("le serveur est écouté sur le port 3000 ? ");
});
