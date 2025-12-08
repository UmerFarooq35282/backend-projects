import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ErrorResponse, SuccessResponse } from "../../../utils/sendingResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import { CSVReader } from "../utils/csvReader.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiChatResponse = asyncHandler(async (req, res, next) => {
  const { userPrompt } = req.body;
  const userFile = req.file;

  if (!userPrompt) throw new ErrorResponse("User prompt is required", 400);

  let csvFileData;
  if (userFile) {
    csvFileData = await CSVReader(userFile.buffer).catch((err) => {
      throw new ErrorResponse("Error reading uploaded CSV file", 500, [err.message]);
    });
  }

  try {
    const aiResponse = await generateAIResponse(userPrompt, csvFileData);

    throw new SuccessResponse(
      "AI response generated successfully",
      { ai: aiResponse, fileData: csvFileData || null },
      200
    );
  } catch (error) {
    throw new ErrorResponse(error.message || "AI model failed", 500);
  }
});
