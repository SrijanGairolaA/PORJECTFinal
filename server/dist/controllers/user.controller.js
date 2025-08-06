import prisma from "../config/database.js";
import { encryptPassword, isPasswordCorrect } from "../validation/checkPassword.js";
import { genrateAccessToken, genrateRefreshToken } from "../JWT/jwtCreation.js";
import { userDataSchema } from "../validation/userDemoData.js";
const registerUser = async (req, res) => {
    try {
        const user = userDataSchema.safeParse(req.body);
        if (!user.success) {
            return res.status(400).json({
                message: user.error.format()
            });
        }
        const { name, email, password } = user.data;
        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (findUser) {
            return res.status(400).json({
                message: "User with email aready exists!!"
            });
        }
        const hashedPassword = await encryptPassword(password);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        if (!newUser) {
            return res.status(400).json({
                message: "user creation unsuccessfull"
            });
        }
        return res.status(200).json({
            data: newUser,
            message: "User created successfully"
        });
    }
    catch (error) {
        console.log("Register error", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!findUser) {
            return res.status(400).json({
                message: " Email not found || write correct email"
            });
        }
        const result = await isPasswordCorrect(findUser, password);
        if (!result) {
            return res.status(401).json({
                message: "Password is incorrect || please upload right password"
            });
        }
        const refreshToken = await genrateRefreshToken(findUser);
        const accessToken = await genrateAccessToken(findUser);
        const response = await prisma.user.update({
            where: {
                id: findUser.id
            },
            data: {
                refreshToken: refreshToken,
                refresh_created_at: new Date()
            }
        });
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
            data: response,
            message: "Login successful"
        });
    }
    catch (error) {
        console.error("Login errro: ", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
const logOutUser = async (req, res) => {
    try {
        const { id } = req.user;
        const userId = Number(id);
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: null
            }
        });
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
            message: "User logged out successfully"
        });
    }
    catch (error) {
        console.error("server error || error while logging out", error);
        return res.status(502).json({
            message: " Internal server error | error while loggin out",
            error: error
        });
    }
};
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = Number(id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found || invalid user"
            });
        }
        return res.status(200).json({
            data: user,
            message: "User found successfully"
        });
    }
    catch (error) {
        console.error("server errror", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
const setUserDemographicDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { gender, age, religion, state, nationality } = req.body;
        const userId = Number(id);
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!existingUser) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        const newData = await prisma.userDemographic.create({
            data: {
                userId: userId,
                gender,
                age,
                religion,
                nationality,
                state
            }
        });
        if (!newData) {
            return res.status(400).json({
                message: "error cant upload userdata"
            });
        }
        return res.status(201).json({
            data: newData,
            message: "User data uploaded successfully"
        });
    }
    catch (error) {
        console.error("server error ", error);
        return res.status(500).json({
            message: "oops!! there is some issue in server",
            // error: error.message || "Unknown error"
        });
    }
};
export { registerUser, loginUser, getUser, setUserDemographicDetails, logOutUser };
