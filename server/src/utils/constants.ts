import multer from "fastify-multer";
import os from "os";

export const TESTING = process.env.NODE_ENV === "test";
export const upload = multer({ dest: os.tmpdir() });
