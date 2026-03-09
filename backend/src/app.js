const express = require("express");
const { securityMiddleware } = require("../middlewares/security.middleware");
const { errorHandler } = require("../middlewares/error.middleware");
const authRoutes = require("../routes/auth.routes");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");
const websiteRoutes = require("../routes/website.routes");
const failureRoutes = require("../routes/failure.routes");

const app = express();

app.use(express.json());       //parses incoming JSON request bodies
app.use(securityMiddleware);
app.use("/api/auth",authRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api",failureRoutes);

// health check
app.get("/health",(req,res)=>{
    res.status(200).json({status: "ok"});
});
//testing a protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});
//testing RBAC
app.get(
  "/admin-only",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);


app.use(errorHandler);      //error middleware is placed after routes as If you place it BEFORE routes, No error has happened yet and when an error occurs later → Express never reaches it

module.exports = app;