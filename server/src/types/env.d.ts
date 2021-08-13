declare namespace NodeJS {
    interface ProcessEnv {
        CLOUDINARY_URL: string;
        MONGODB_URI: string;
        MONGODB_URI_TESTING: string;
        ACCESS_TOKEN_SECRET: string;
        COOKIE_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
    }
}
