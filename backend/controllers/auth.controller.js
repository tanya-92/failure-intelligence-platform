const { registerUser, loginUser } = require("../services/auth.service");

exports.register = async(req, res, next) => {
    try{
        const {email, password, role} = req.body;
        const user = await registerUser(email, password, role);

        res.status(201).json({ message: "User registered", user });
    } catch(err) {
        next(err);
    }
};

exports.login = async(req,res,next)=> {
    try{
        const {email, password} = req.body;
        const {user, token} = await loginUser(email, password);

        res.status(200).json({ message: "Login successful", token });
    } catch(err){
        next(err);
    }
};