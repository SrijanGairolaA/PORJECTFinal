import jwt from "jsonwebtoken";
// interface CoustomRequest extends Request {
//     cookies: {
//         accessToken?: string;
//     };
//     user?:{
//         id: string
//     }
// }
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return next(new Error("Unauthorized : NO access token provided"));
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new Error("Unauthorized: Invalid or expired token"));
    }
};
