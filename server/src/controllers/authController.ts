import { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
// import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";

import Users from "../models/userModel";

import { validateRegister } from "../utils/validators";
import { createAccessToken, createRefreshToken } from "../utils/generateToken";

const authController = {
    register: async (req: FastifyRequest, res: FastifyReply) => {
        const { username, email, password, confirmPassword } = req.body as {
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        const emailUser = await Users.findOne({ email });
        if (emailUser)
            return res.status(400).send({ email: "Email already in use" });

        const usernameUser = await Users.findOne({ username });
        if (usernameUser)
            return res
                .status(400)
                .send({ username: "Username already in use" });

        const errors = validateRegister(
            username,
            email,
            password,
            confirmPassword
        );
        if (Object.keys(errors).length > 0) return res.status(400).send(errors);

        const hashedPassword = await argon2.hash(password, { hashLength: 512 });

        const user = await Users.create({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        return res
            .setCookie("refreshToken", createRefreshToken({ id: user._id }), {
                httpOnly: true,
                secure: true,
                path: "/api/refreshToken",
                signed: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
            })
            .send({
                msg: "Successfully registered",
                accessToken: createAccessToken({ id: user._id })
            });
    },
    login: async (req: FastifyRequest, res: FastifyReply) => {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const user = await Users.findOne({ email });

        if (!user)
            return res.status(400).send({ error: "Incorrect credentials" });

        const decryptedPassword = await argon2.verify(user.password, password);

        if (!decryptedPassword)
            return res.status(400).send({ error: "Incorrect credentials" });

        return res
            .setCookie("refreshToken", createRefreshToken({ id: user._id }), {
                httpOnly: true,
                secure: true,
                path: "/",
                signed: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
            })
            .send({
                msg: "Successfully logged in",
                accessToken: createAccessToken({ id: user._id })
            });
    },
    refreshToken: async (_req: FastifyRequest, res: FastifyReply) => {
        // TODO: Fix this

        // const refreshToken = req.cookies.refreshToken;
        // if (!refreshToken)
        //     return res.status(400).send({ error: "Unauthenticated" });

        // jwt.verify(
        //     refreshToken,
        //     process.env.REFRESH_TOKEN_SECRET,
        //     async (
        //         err: VerifyErrors | null,
        //         result: JwtPayload | undefined
        //     ) => {
        //         if (err) {
        //             res.log.error(err);
        //             return res.status(400).send({ err: "Unauthenticated" });
        //         }

        //         const user = await Users.findById(result?.id)
        //             .select("-password")
        //             .populate("followers following", "-password");

        //         if (!user)
        //             return res.status(400).send({ err: "User does not exist" });

        //         const accessToken = createAccessToken({ id: result?.id });
        //         return res.send({ accessToken, user });
        //     }
        // );

        // Typescript being annoying
        return res.send({ msg: "WIP" });
    }
};

export default authController;
