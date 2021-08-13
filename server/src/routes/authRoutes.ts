import { FastifyInstance, FastifyPluginOptions } from "fastify";
import authController from "../controllers/authController";

const authRoutes = (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    done: () => void
) => {
    fastify.post("/login", authController.login);
    fastify.post("/register", authController.register);
    fastify.get("/refreshToken", authController.refreshToken);
    done();
};

export default authRoutes;
