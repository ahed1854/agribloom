const Consultation = require("../models/Consultation");
const User = require("../models/User");

const createConsultation = async (req, res) => {
    try {
        const { specialistId } = req.body;

        const specialist = await User.findOne({
            _id: specialistId,
            role: "specialist",
        });

        if (!specialist) {
            return res.status(404).json({
                success: false,
                message: "الأخصائي غير موجود",
            });
        }

        const consultation = await Consultation.create({
            userId: req.user.id,
            specialistId,
            status: "open",
        });

        const populatedConsultation = await Consultation.findById(consultation._id).populate("userId", "username").populate("specialistId", "username specialistProfile");

        res.status(201).json({
            success: true,
            data: populatedConsultation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({ userId: req.user.id }).populate("specialistId", "username specialistProfile").sort({ createdAt: -1 });

        res.json({
            success: true,
            data: consultations, // This should be an array
            count: consultations.length,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getSpecialistConsultations = async (req, res) => {
    try {
        // Only show consultations that are PAID (payment.paid = true)
        const consultations = await Consultation.find({
            specialistId: req.user.id,
            "payment.paid": true, // Only show paid consultations
        })
            .populate("userId", "username")
            .sort({ createdAt: -1 });

        console.log(`Found ${consultations.length} paid consultations for specialist ${req.user.id}`);

        res.json({
            success: true,
            data: consultations,
            count: consultations.length,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Add a new endpoint for specialists to see ALL their consultations (including unpaid)
const getAllSpecialistConsultations = async (req, res) => {
    try {
        // Show all consultations for specialist (including unpaid)
        const consultations = await Consultation.find({
            specialistId: req.user.id,
        })
            .populate("userId", "username")
            .sort({ createdAt: -1 });

        console.log(`Found ${consultations.length} total consultations for specialist ${req.user.id}`);

        res.json({
            success: true,
            data: consultations,
            count: consultations.length,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateConsultationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "جلسة الاستشارة غير موجودة",
            });
        }

        consultation.status = status;
        await consultation.save();

        res.json({
            success: true,
            data: consultation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "جلسة الاستشارة غير موجودة",
            });
        }

        consultation.payment.paid = true;
        consultation.status = "paid";
        await consultation.save();

        res.json({
            success: true,
            data: consultation,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createConsultation,
    getUserConsultations,
    getSpecialistConsultations,
    getAllSpecialistConsultations,
    updateConsultationStatus,
    updatePaymentStatus,
};
