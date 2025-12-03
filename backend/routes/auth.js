console.log("AUTH ROUTER LOADED");


import { Router } from 'express';
import { getUser, registerUser } from '../services/users.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/logout', (req, res, next) => {
    if(global.user) {
        global.user = null;
        res.json({
            success: true,
            message: 'User logged out successfully'
        });
    } else {
        next({
            status: 400,
            message: 'No user is currently logged in'
        });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userType = req.body.role === 'admin' ? 'admin' : 'user';
    const result = await registerUser({
        userId : `${userType}-${uuid().substring(0, 5)}`,
        name: name,
        email : email,
        password : password,
        role : userType
    }); 
    if(result) {
        res.status(201).json({
            success : true,
            message : 'New user registered successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message : 'Registration unsuccessful'
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser(email);
    if(user) {
        if(user.email === email && user.password === password) {
            global.user = user;

            const isAdmin = user.role && user.role === 'admin'; 

            res.json({
                success : true,
                message : `User logged in successfully as ${user.name}, ${user.email}, ${user.role}`,
                isAdmin: isAdmin
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'Incorrect username and/or password'
            });
        }
    } else {
        res.status(400).json({
            success : false,
            message : 'No user found'
        });
    }
});

export default router;