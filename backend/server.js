import dotenv from "dotenv";
dotenv.config();

// ES Modules
import express from "express";
import connectDB from "./config/connect.js";

import authRouter from './routes/auth.js';
import menuRouter from './routes/menu.js';
import cartRouter from './routes/cart.js';

const app = express();
app.use(express.json());

// Anslut till MongoDB
connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/cart', cartRouter);


app.get("/", (req, res) => {
    res.send("API fungerar och är kopplat till MongoDB!");
});

app.listen(3000, () => {
    console.log("Server startad på http://localhost:3000");
});
