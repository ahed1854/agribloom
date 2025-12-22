const User = require("../models/User");

const getSpecialists = async (req, res) => {
    try {
        const specialists = await User.find({ role: "specialist" }).select("username email specialistProfile");

        res.json({
            success: true,
            data: specialists,
            count: specialists.length,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getSpecialistById = async (req, res) => {
    try {
        const specialist = await User.findOne({
            _id: req.params.id,
            role: "specialist",
        }).select("username email specialistProfile");

        if (!specialist) {
            return res.status(404).json({
                success: false,
                message: "الأخصائي غير موجود",
            });
        }

        res.json({
            success: true,
            data: specialist,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getSpecialists, getSpecialistById };
