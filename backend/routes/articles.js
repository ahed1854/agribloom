const express = require("express");
const { getArticles, getArticleById, createArticle } = require("../controllers/articleController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", protect, authorize("specialist"), createArticle);

// router.get("/:id", (req, res) => {
//     res.send("Working !");
// });

module.exports = router;
