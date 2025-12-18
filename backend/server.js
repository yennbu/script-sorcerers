import dotenv from "dotenv";
dotenv.config();

// ES Modules
import express from "express";
import connectDB from "./config/connect.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import authRouter from './routes/auth.js';
import menuRouter from './routes/menu.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/orders.js';

import { checkApiKey } from "./middlewares/checkApiKey.js";
import { verifyToken } from "./middlewares/verifyToken.js";

/* import errorHandler from './middlewares/errorHandler.js'; */

const app = express();
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:", "http:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        scriptSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "http://localhost:3000",
          "http://localhost:5173",
          "https://script-sorcerers.onrender.com",
          "http://nordic-bites.s3-website.eu-north-1.amazonaws.com",
        ],
      },
    },
  })
);

app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (origin.startsWith("http://")) {
                callback(null, true);
            } else {
                callback(new Error("CORS blocked"));
            }
        },
        credentials: true,
    })
);

// Anslut till MongoDB
connectDB();

app.use(checkApiKey);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);


app.get("/", (req, res) => {
    res.send("API fungerar och är kopplat till MongoDB!");
});

app.listen(3000, () => {
    console.log("Server startad på http://localhost:3000");
});
