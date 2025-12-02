const express = require("express");
const { addProject, getAllProjects } = require("../controllers");


const router = express.Router();

router.post("/add", addProject)
router.get("/projects" , getAllProjects)

module.exports = router;