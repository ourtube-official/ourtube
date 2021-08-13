import jwt from "jsonwebtoken";

export const createAccessToken = (data: unknown) => {
    return jwt.sign(
        data as Record<string, unknown>,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

export const createRefreshToken = (data: unknown) => {
    return jwt.sign(
        data as Record<string, unknown>,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "30d"
        }
    );
};
