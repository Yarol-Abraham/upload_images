import mongoose from "mongoose";

export interface IUser {
    name: string;
    password: string;
    passwordConfirm: string;
    passwordChangedAt: Date;
  }

  export interface  _IUser extends IUser {
      _id: mongoose.Types.ObjectId
  }