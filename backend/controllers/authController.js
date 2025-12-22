const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const register = async (req, res) => {
    try {
        const { username, email, password, role, specialistProfile } = req.body;

        const userExists = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (userExists) {
            return res.status(400).json({
                message: "البريد الإلكتروني أو اسم المستخدم موجود مسبقاً",
            });
        }

        const user = await User.create({
            username,
            email,
            password,
            role,
            specialistProfile: role === "specialist" ? specialistProfile : undefined,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            specialistProfile: user.specialistProfile,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                specialistProfile: user.specialistProfile,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login, getMe };
