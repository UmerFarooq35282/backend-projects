const express = require("express");
const { addProject } = require("../controllers");


const router = express.Router();

router.post("/add", addProject)

module.exports = router;