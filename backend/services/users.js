import User from '../models/User.js';

export async function registerUser(user) {
    try {
        const result = await User.create(user);
        return result;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getUser(name) {
    try {
        const user = await User.findOne({ name : name});
        if(user) return user;
        else throw new Error('No user found');
    } catch(error) {
        console.log(error.message);
        return null;
    }
} 