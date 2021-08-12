export interface User {
    username: string;
    password: string;
    email: string;
    avatarUrl: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

declare module "express" {
    export interface Request {
        user: User;
    }
}
