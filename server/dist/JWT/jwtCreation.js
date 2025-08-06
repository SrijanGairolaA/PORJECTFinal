import jwt from "jsonwebtoken";
// namespace NodeJS{
//     interface ProcessEnv{
//         ACCESS_TOKEN_SECRET: string
//     }
// }
const genrateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};
// process.env.ACCESS_TOKEN_EXPIRY as any
const genrateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};
export { genrateAccessToken, genrateRefreshToken };
