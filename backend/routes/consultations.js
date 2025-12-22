const express = require("express");
const {
    createConsultation,
    getUserConsultations,
    getSpecialistConsultations,
    updateConsultationStatus,
    updatePaymentStatus,
    getAllSpecialistConsultations,
} = require("../controllers/consultationController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, authorize("user"), createConsultation);
router.get("/my-consultations", protect, authorize("user"), getUserConsultations);
router.get("/specialist-consultations", protect, authorize("specialist"), getSpecialistConsultations);
router.put("/:id/status", protect, updateConsultationStatus);
router.put("/:id/payment", protect, updatePaymentStatus);
router.get("/specialist-all-consultations", protect, authorize("specialist"), getAllSpecialistConsultations);

module.exports = router;
