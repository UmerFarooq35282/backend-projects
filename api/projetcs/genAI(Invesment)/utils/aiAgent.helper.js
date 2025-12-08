import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAIResponse = async (userPrompt, csvFileData = null) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `
You are an AI investment analysis assistant.
Always respond strictly in JSON format (no markdown, no commentary).

Possible Output Formats:
1. Casual Chat:
   {
     "message": "<your conversational reply>",
     "data": null
   }

2. Analytical Response (when CSV or structured data provided):
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
- JSON only, no markdown.
- Use null for missing values.
- Use numbers (not strings) for numeric data.
- Concise and professional messages only.
`
  });

  const combinedPrompt = csvFileData
    ? `${userPrompt}\n\nHere is the company data in JSON:\n${JSON.stringify(csvFileData, null, 2)}`
    : userPrompt;

  const result = await model.generateContent(combinedPrompt);

  try {
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("❌ AI JSON Parse Error:", error.message);
    throw new Error("AI response is not valid JSON");
  }
};
