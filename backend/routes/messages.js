const express = require("express");
const { getMessages, sendMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/:consultationId", protect, getMessages);
router.post("/", protect, sendMessage);

module.exports = router;
