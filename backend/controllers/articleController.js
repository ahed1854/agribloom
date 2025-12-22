const Article = require("../models/Article");

const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found",
            });
        }

        res.json({
            success: true,
            data: article,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getArticles = async (req, res) => {
    try {
        const { lang = "ar" } = req.query; // Get language from query

        let filter = {};
        let articles;

        if (lang === "ar") {
            // Return Arabic articles (existing system)
            articles = await Article.find(filter).sort({ createdAt: -1 });
        } else {
            // For English, return only articles that have English content
            // Or return a mix based on your logic
            articles = await Article.find(filter).sort({ createdAt: -1 });
        }

        res.json({
            success: true,
            data: articles,
            count: articles.length,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const createArticle = async (req, res) => {
    try {
        const { title_ar, content_ar, category_ar, title_en, content_en, category_en } = req.body;

        // Create bilingual article
        const article = await Article.create({
            title_ar,
            content_ar,
            category_ar,
            title_en,
            content_en,
            category_en,
            author: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: article,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getArticles, createArticle, getArticleById };
