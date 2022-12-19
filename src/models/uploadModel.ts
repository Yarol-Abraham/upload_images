import mongoose from 'mongoose';
import slugify from 'slugify';
import { Iupload } from '../interface/upload';

const UploadSchema = new mongoose.Schema<Iupload>({

        name:{
            type: String,
            required: [true, 'Please, upload image']
        },

        slug: String,

        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
});

UploadSchema.pre('save', function () {
    this.slug = slugify(this.name, { lower: true });
});

const upload = mongoose.model("Upload", UploadSchema);

export default upload;
