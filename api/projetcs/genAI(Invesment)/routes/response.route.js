const express = require("express");
const { getGeminiChatResponse } = require("../controllers/response.controller");
const { upload } = require("../config/multer.config.js");

const router = express.Router();


router.post("/getResponse" , upload.single("file") , getGeminiChatResponse);

module.exports = router;