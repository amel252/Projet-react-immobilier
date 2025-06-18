import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

// dotenv on l'appelle avec ca

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

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
app.use("/api/listing", listingRouter);

// creation de middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
    // return res.status(statusCode);
    // success: false, statusCode;
    // message;
});
