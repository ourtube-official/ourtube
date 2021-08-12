import { model, Schema } from "mongoose";
import { Video } from "../types/video";

const videoModel = new Schema(
    {
        videoUrl: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        creator: { type: Schema.Types.ObjectId, ref: "users" },
        likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "comments" }]
    },
    { timestamps: true }
);

export default model<Video>("videos", videoModel);
