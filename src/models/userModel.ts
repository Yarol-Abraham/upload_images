import mongoose from "mongoose";
import { IUser } from '../interface/user';

const UserSchema = new mongoose.Schema<IUser>({
    
    name:{
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please tell us your name']
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a password']
    },

    passwordConfirm: {
        type: String,
        trim: true,
        required: [true, 'Please confirm your password']
    },

    passwordChangedAt: Date

});

const user = mongoose.model("User", UserSchema);

export default user;