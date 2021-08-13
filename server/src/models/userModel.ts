import mongoose from "mongoose";

import { User } from "../types/auth";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/beatzoid/image/upload/v1627181060/ourtube/avatars/default_profile_picture_pq4rfz.png"
        },
        role: {
            type: String,
            default: "user"
        },
        subscribers: [
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model<User>("users", userSchema);
