import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import logger from "./utils/logger";

const app = express();
app.get("/", (_, res) => res.send("Hello World!"));

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

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    logger.info(`Server successfully listening on port ${PORT}`);
});

// Tests
export default server;
