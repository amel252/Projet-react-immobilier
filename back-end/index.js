import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv on l'appelle avec ca

import userRouter from "./routes/user.route.js";
dotenv.config();

import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
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

// import des routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
