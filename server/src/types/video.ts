import { User } from "./auth";

export interface Video {
    videoUrl: string;
    description: string;
    creator: User;
    likes: User[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    content: string;
    creator: User;
    createdAt: Date;
    updatedAt: Date;
    likes: User[];
    replies: Comment[];
}
