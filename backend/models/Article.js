// const mongoose = require("mongoose");

// const articleSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true,
//         },
//         content: {
//             type: String,
//             required: true,
//         },
//         category: {
//             type: String,
//             required: true,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// module.exports = mongoose.model("Article", articleSchema);

const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        // Arabic content
        title_ar: { type: String, required: true },
        content_ar: { type: String, required: true },
        category_ar: { type: String, required: true },

        // English content
        title_en: { type: String, required: true },
        content_en: { type: String, required: true },
        category_en: { type: String, required: true },

        // Common fields
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Article", ArticleSchema);
