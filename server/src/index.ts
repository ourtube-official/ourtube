import "dotenv-safe/config";

import Fastify from "fastify";
import mongoose from "mongoose";
import helmet from "fastify-helmet";
import fastifyCookie from "fastify-cookie";

import logger from "./utils/logger";
import { upload } from "./utils/constants";

import videoRoutes from "./routes/videoRoutes";
import authRoutes from "./routes/authRoutes";

const app = Fastify({
    logger: {
        prettyPrint: true,
        serializers: {
            req(request) {
                return {
                    method: request.method,
                    url: request.url
                };
            }
        }
    }
});

app.register(helmet);
app.register(fastifyCookie, { secret: process.env.COOKIE_SECRET });

// Middleware
app.register(upload.contentParser);

mongoose.connect(
    process.env.NODE_ENV === "test"
        ? process.env.MONGODB_URI_TESTING
        : process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) logger.error(err);
        logger.info("Successfully connected to MongoDB!");
    }
);

// Routes
app.register(videoRoutes, { prefix: "/api" });
app.register(authRoutes, { prefix: "/api" });

const PORT = process.env.PORT || 4000;
app.listen(PORT);

// Tests
export default app;
