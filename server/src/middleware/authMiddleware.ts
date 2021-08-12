import jwt, { JwtPayload } from "jsonwebtoken";
import { DoneFuncWithErrOrRes, FastifyRequest, FastifyReply } from "fastify";

import Users from "../models/userModel";

import { User } from "../types/auth";

const authMiddleware = async (
    req: FastifyRequest,
    res: FastifyReply,
    next: DoneFuncWithErrOrRes
) => {
    try {
        const token = req.headers["Authorization"] as string;

        if (!token)
            return res.status(400).send({ msg: "Invalid authentication" });

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        ) as JwtPayload;
        if (!decoded)
            return res.status(400).send({ msg: "Invalid authentication" });

        const user = (await Users.findOne({ _id: decoded.id })) as User;
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }

    // Typescript's annoying
    return;
};

export default authMiddleware;
