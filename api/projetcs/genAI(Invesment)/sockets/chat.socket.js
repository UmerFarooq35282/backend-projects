import { Chat } from "../models/chat.model.js";
import { generateAIResponse } from "../utils/aiAgent.helper.js";

export const aiAgentSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("send_message", async ({ userId, chatId, title, text, csvData }) => {
      try {
        let chat =
          chatId && (await Chat.findById(chatId)) ||
          (await Chat.create({ userId, title, messages: [] }));

        chat.messages.push({ role: "user", text });
        await chat.save();

        const aiResponse = await generateAIResponse(text, csvData);

        chat.messages.push({ role: "bot", text: aiResponse.message });
        await chat.save();

        io.to(socket.id).emit("receive_message", {
          chatId: chat._id,
          role: "bot",
          text: aiResponse.message,
          data: aiResponse.data,
        });
      } catch (err) {
        console.error("Socket Error:", err.message);
        io.to(socket.id).emit("receive_message", {
          role: "bot",
          text: "⚠️ AI failed to respond. Please try again.",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
