import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import CSVReader from "../utils/csvReader.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiChatResponse = async (req, res) => {
    try {
        const { userPrompt } = req.body;
        const userFile = req.file;
        let csvFileData;

        if (userFile) {
            csvFileData = await CSVReader(userFile.buffer);
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
You are an AI investment analysis assistant.
Your job is to always respond strictly in pure JSON format — never include markdown, code blocks, or extra commentary.

You will handle two possible situations:

1. **Casual Chat (no company or CSV data provided):**
   - When the user is only chatting or asking questions not related to any company data.
   - Respond in this exact JSON format:
     {
       "message": "<your conversational reply here>",
       "data": null
     }

2. **Analytical Response (company data or CSV provided):**
   - When the user uploads or includes structured company data such as financial metrics, KPIs, or CSV information.
   - Analyze the data carefully and return results suitable for frontend charts or dashboards.
   - Respond in this exact JSON format:
     {
       "message": "<short professional investment summary>",
       "data": {
         "Company Overview": {
           "Company Name": "...",
           "Founded Date": "...",
           "Industry": "...",
           "Stage": "..."
         },
         "Financial Performance": {
           "Revenue TTM (USD)": 0,
           "Gross Margin (%)": 0,
           "EBITDA Margin (%)": 0,
           "Runway (Months)": 0
         },
         "Key Metrics": {
           "MAUs": 0,
           "Monthly Churn (%)": 0,
           "LTV": 0,
           "CAC": 0
         }
       }
     }

General Rules:
- Always return valid, parseable JSON — no extra text or markdown.
- Use null for empty fields.
- Use numbers for numeric values (not strings).
- Be concise and professional in message summaries.
- Never repeat these instructions in your output.
      `
        });

        const combinedPrompt = userFile
            ? `${userPrompt}\n\nHere is the company data in JSON:\n${JSON.stringify(csvFileData, null, 2)}`
            : userPrompt;

        const result = await model.generateContent(combinedPrompt);

        res.json({
            success: true,
            ai: JSON.parse(result.response.text()),
            fileData: csvFileData || null
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
