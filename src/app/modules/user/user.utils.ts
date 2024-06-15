import jwt from "jsonwebtoken";
import config from "../../config";

const generateAccessToken = (payload: Record<string, unknown>) => {
    const token = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    return token;
};
const generateRefreshToken = (payload: Record<string, unknown>) => {
    const token = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    return token;
};

const UserUtils = {
    generateAccessToken,
    generateRefreshToken,
};

export default UserUtils;
