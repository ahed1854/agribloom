const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        specialistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["open", "closed", "paid"],
            default: "open",
        },
        payment: {
            paid: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Consultation", consultationSchema);
