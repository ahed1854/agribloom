// const getMessages = async (req, res) => {
//     try {
//         const { consultationId } = req.params;

//         console.log(`Getting messages for consultation ${consultationId}, user: ${req.user.id}, role: ${req.user.role}`);

//         // Check if consultation exists
//         const consultation = await Consultation.findById(consultationId);
//         if (!consultation) {
//             return res.status(404).json({
//                 success: false,
//                 message: "جلسة الاستشارة غير موجودة",
//             });
//         }

//         // Check if user has access to this consultation
//         if (req.user.role === "user" && consultation.userId.toString() !== req.user.id) {
//             return res.status(403).json({
//                 success: false,
//                 message: "غير مصرح بالوصول لهذه المحادثة",
//             });
//         }

//         if (req.user.role === "specialist" && consultation.specialistId.toString() !== req.user.id) {
//             return res.status(403).json({
//                 success: false,
//                 message: "غير مصرح بالوصول لهذه المحادثة",
//             });
//         }

//         // SPECIAL RULE: Specialist can only access messages if consultation is PAID
//         // But we'll allow them to see if they have access via specialist-all-consultations endpoint
//         // Actually, let's remove this restriction and allow specialists to see messages
//         // if they have access to the consultation (regardless of payment)
//         // if (req.user.role === "specialist" && !consultation.payment.paid) {
//         //   return res.status(403).json({
//         //     success: false,
//         //     message: "لا يمكن الوصول إلى المحادثة حتى يتم دفع الاستشارة من قبل المستخدم",
//         //   });
//         // }

//         // Get messages
//         const messages = await Message.find({ consultationId }).populate("senderId", "username").sort({ timestamp: 1 });

//         console.log(`Found ${messages.length} messages for consultation ${consultationId}`);

//         res.json({
//             success: true,
//             data: messages,
//             count: messages.length,
//         });
//     } catch (error) {
//         console.error("Error in getMessages:", error);
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// const sendMessage = async (req, res) => {
//     try {
//         const { consultationId, text } = req.body;

//         console.log(`Sending message to consultation ${consultationId}: ${text}`);
//         console.log("User:", req.user);

//         // Check if consultation exists
//         const consultation = await Consultation.findById(consultationId);
//         if (!consultation) {
//             return res.status(404).json({
//                 success: false,
//                 message: "جلسة الاستشارة غير موجودة",
//             });
//         }

//         // Check if user has access to this consultation
//         if (req.user.role === "user" && consultation.userId.toString() !== req.user.id) {
//             return res.status(403).json({
//                 success: false,
//                 message: "غير مصرح بإرسال الرسالة",
//             });
//         }

//         if (req.user.role === "specialist" && consultation.specialistId.toString() !== req.user.id) {
//             return res.status(403).json({
//                 success: false,
//                 message: "غير مصرح بإرسال الرسالة",
//             });
//         }

//         // SPECIAL RULE: Specialist can only send messages if consultation is PAID
//         if (req.user.role === "specialist" && !consultation.payment.paid) {
//             return res.status(403).json({
//                 success: false,
//                 message: "لا يمكن إرسال رسائل حتى يتم دفع الاستشارة من قبل المستخدم",
//             });
//         }

//         // Check if consultation is closed
//         if (consultation.status === "closed") {
//             return res.status(400).json({
//                 success: false,
//                 message: "لا يمكن إرسال رسائل في استشارة مغلقة",
//             });
//         }

//         // Create message
//         const message = await Message.create({
//             consultationId,
//             senderId: req.user.id,
//             senderType: req.user.role,
//             text,
//             timestamp: new Date(),
//         });

//         // Populate sender info
//         const populatedMessage = await Message.findById(message._id).populate("senderId", "username");

//         console.log("Message created:", populatedMessage);

//         res.status(201).json({
//             success: true,
//             data: populatedMessage,
//         });
//     } catch (error) {
//         console.error("Error in sendMessage:", error);
//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// module.exports = {
//     getMessages,
//     sendMessage,
// };

const Consultation = require("../models/Consultation");
const Message = require("../models/Message");
const mongoose = require("mongoose");

const getMessages = async (req, res) => {
    try {
        const { consultationId } = req.params;

        console.log(`Getting messages for consultation ${consultationId}, user: ${req.user.id}, role: ${req.user.role}`);

        // Check if consultationId is provided and is valid
        if (!consultationId || consultationId === "undefined" || !mongoose.Types.ObjectId.isValid(consultationId)) {
            return res.status(400).json({
                success: false,
                message: "معرف الاستشارة غير صالح",
            });
        }

        // Check if consultation exists
        const consultation = await Consultation.findById(consultationId);
        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "جلسة الاستشارة غير موجودة",
            });
        }

        // Check if user has access to this consultation
        if (req.user.role === "user" && consultation.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "غير مصرح بالوصول لهذه المحادثة",
            });
        }

        if (req.user.role === "specialist" && consultation.specialistId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "غير مصرح بالوصول لهذه المحادثة",
            });
        }

        // Get messages
        const messages = await Message.find({ consultationId }).populate("senderId", "username").sort({ timestamp: 1 });

        console.log(`Found ${messages.length} messages for consultation ${consultationId}`);

        res.json({
            success: true,
            data: messages,
            count: messages.length,
        });
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { consultationId, text } = req.body;

        // Check if consultationId is provided and is valid
        if (!consultationId || consultationId === "undefined" || !mongoose.Types.ObjectId.isValid(consultationId)) {
            return res.status(400).json({
                success: false,
                message: "معرف الاستشارة غير صالح",
            });
        }

        console.log(`Sending message to consultation ${consultationId}: ${text}`);
        console.log("User:", req.user);

        // Check if consultation exists
        const consultation = await Consultation.findById(consultationId);
        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "جلسة الاستشارة غير موجودة",
            });
        }

        // Check if user has access to this consultation
        if (req.user.role === "user" && consultation.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "غير مصرح بإرسال الرسالة",
            });
        }

        if (req.user.role === "specialist" && consultation.specialistId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "غير مصرح بإرسال الرسالة",
            });
        }

        // SPECIAL RULE: Specialist can only send messages if consultation is PAID
        if (req.user.role === "specialist" && !consultation.payment.paid) {
            return res.status(403).json({
                success: false,
                message: "لا يمكن إرسال رسائل حتى يتم دفع الاستشارة من قبل المستخدم",
            });
        }

        // Check if consultation is closed
        if (consultation.status === "closed") {
            return res.status(400).json({
                success: false,
                message: "لا يمكن إرسال رسائل في استشارة مغلقة",
            });
        }

        // Create message
        const message = await Message.create({
            consultationId,
            senderId: req.user.id,
            senderType: req.user.role,
            text,
            timestamp: new Date(),
        });

        // Populate sender info
        const populatedMessage = await Message.findById(message._id).populate("senderId", "username");

        console.log("Message created:", populatedMessage);

        res.status(201).json({
            success: true,
            data: populatedMessage,
        });
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getMessages,
    sendMessage,
};
