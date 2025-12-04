import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId : {
        type : String,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },  
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
    }
});

const User = mongoose.model('User', userSchema);

export default User;