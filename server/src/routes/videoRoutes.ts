import { FastifyInstance, FastifyPluginOptions } from "fastify";
import videoController from "../controllers/videoController";

const videoRoutes = (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    done: () => void
) => {
    fastify.post("/upload", videoController.uploadVideo);
    done();
};

export default videoRoutes;
