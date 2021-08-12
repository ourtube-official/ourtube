import "dotenv/config";

import Fastify from "fastify";
import mongoose from "mongoose";

import logger from "./utils/logger";
import { upload } from "./utils/constants";

import videoRoutes from "./routes/videoRoutes";
import middie from "middie";

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

app.register(middie);

app.get("/", (_, reply) => {
    reply.send({ msg: "Hello World!" });
});

// Middleware
app.register(upload.contentParser);

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err) => {
        if (err) logger.error(err);
        logger.info("Successfully connected to MongoDB!");
    }
);

app.register(videoRoutes, { prefix: "/api" });

const PORT = process.env.PORT || 4000;
app.listen(PORT);

// Tests
export default app;
