const Service = require("../models/Service");

const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: services,
            count: services.length,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "الخدمة غير موجودة",
            });
        }

        res.json({
            success: true,
            data: service,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const createService = async (req, res) => {
    try {
        const { title, description, price, videoUrl } = req.body;

        const service = await Service.create({
            title,
            description,
            price,
            videoUrl,
        });

        res.status(201).json({
            success: true,
            data: service,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { getServices, getServiceById, createService };
