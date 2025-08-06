import bcrypt from "bcrypt";
const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
const isPasswordCorrect = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};
export { encryptPassword, isPasswordCorrect };
