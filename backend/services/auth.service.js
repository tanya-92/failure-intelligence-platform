const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

const registerUser = async(email, password, role) => {
    const existing = await User.findOne({ email });
    if(existing){
        throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashed,
        role,
    });

    return user;
};

const loginUser = async(email, password) => {
    const user = await User.findOne({ email });
    if(!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect Password");
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );

    return { token, user: {
        id: user._id,
        email: user.email,
        role: user.role
    } };
};

module.exports = { registerUser, loginUser };