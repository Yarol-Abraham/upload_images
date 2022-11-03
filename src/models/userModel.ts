import mongoose from "mongoose";
import { IUser } from '../interface/user';
import bcrypt from 'bcryptjs';

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
        required: [true, 'Please confirm your password'],
        select: false
    },

    passwordChangedAt: {
        type: Date,
        default: Date.now
    }

});

UserSchema.pre('save', function (next) 
{
    let salt = bcrypt.genSaltSync(10);
    this.password =  bcrypt.hashSync(this.password, salt);
    this.passwordConfirm = "undefined";
    next();
})

const user = mongoose.model("User", UserSchema);

export default user;