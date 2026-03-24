module.exports.roleMiddleware = (roles) => {
    if (!Array.isArray(roles)) {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {    //req.user comes from auth middleware; Checks if the user role exists in allowed roles
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
