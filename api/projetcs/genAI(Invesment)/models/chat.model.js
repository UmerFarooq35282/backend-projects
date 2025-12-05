const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "ApiUser", required: true },
        title: { type: String, required: true },
        messages: [
            {
                role: { type: String, enum: ["user", "bot"], required: true },
                text: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = {Chat}