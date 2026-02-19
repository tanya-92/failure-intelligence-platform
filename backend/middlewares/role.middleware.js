module.exports.roleMiddleware = (roles) => {
    if (!Array.isArray(roles)) {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
