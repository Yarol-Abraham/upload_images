import mongoose from "mongoose";

export interface Iupload {
    name: string;
    slug: string;
    user: any;
}

export interface ICaptureUpload extends Iupload {
    _id: mongoose.Types.ObjectId,
    __v: number
}