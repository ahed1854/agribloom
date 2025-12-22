const express = require("express");
const { getSpecialists, getSpecialistById } = require("../controllers/specialistController");
const router = express.Router();

router.get("/", getSpecialists);
router.get("/:id", getSpecialistById);

module.exports = router;
