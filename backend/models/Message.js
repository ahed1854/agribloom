const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderType: {
        type: String,
        enum: ["user", "specialist"],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messageSchema);
