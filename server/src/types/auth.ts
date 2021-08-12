export interface User {
    username: string;
    password: string;
    email: string;
    avatarUrl: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

declare module "fastify" {
    export interface FastifyRequest {
        user: User;
    }
}
