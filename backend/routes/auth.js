console.log("AUTH ROUTER LOADED");


import { Router } from 'express';
import { getUser, registerUser } from '../services/users.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET_KEY = process.env.JWT_SECRET || 'a1b1c1';

router.get("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.json({
        success: true,
        message: "User logged out successfully",
    });
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userType = req.body.role === 'admin' ? 'admin' : 'user';

    const result = await registerUser({
        userId: `${userType}-${uuid().substring(0, 5)}`,
        name: name,
        email: email,
        password: password,
        role: userType
    });

    if (result) {
        res.status(201).json({
            success: true,
            message: 'New user registered successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Registration unsuccessful'
        });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser(email);

    if (!user || user.password !== password) {
        return res.status(400).json({
            success: false,
            message: "Incorrect email and/or password"
        });
    }

    const role = user.role.toLowerCase().trim();

    const token = jwt.sign(
        {
            id: user.userId,
            role
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    const origin = req.headers.origin || '';
    const isSecure = origin.startsWith('https://');

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: isSecure ? "none" : "lax",
        secure: isSecure,
        path: "/",
        domain: undefined 
    });

    res.json({
        success: true,
        userId: user.userId,
        role,
        message: `User logged in successfully as ${user.name}, ${user.email}, ${role}`
    });
});

router.get("/me", verifyToken, (req, res) => {
    res.json({
        success: true,
        userId: req.user.id,
        role: req.user.role
    });
});


export default router;