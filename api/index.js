const express = require("express");
const authRouter = require("./routes/auth.route.js");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.config.js");
const { projectRoutes } = require("./portfolio/routes");
dotenv.config();

const app = express();

app.use("/api/auth", authRouter)
app.use("/api/portfolio/project" , projectRoutes)

app.get("/", (req, res) => {
  res.send("Express backend Vercel par successfully chal raha hai!");
});


module.exports = app;
