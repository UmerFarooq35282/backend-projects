const express = require("express");
const authRouter = require("./routes/auth.route.js");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.config.js");
const { projectRoutes } = require("./projetcs/portfolio/routes");
const { responseRouter } = require("./projetcs/genAI(Invesment)/routes/index.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// connectDB();

app.use("/api/auth", authRouter)
app.use("/api/portfolio/project", projectRoutes)
app.use("/api/genAI/investmentAgent", responseRouter)

app.get("/", (req, res) => {
  res.send("Express backend Vercel par successfully chal raha hai!");
});

app.listen(PORT, () => {
  console.log("App is running on port ", PORT)
})

module.exports = app;
