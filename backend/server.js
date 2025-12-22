const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();

// Enhanced CORS configuration
app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        credentials: true,
    })
);

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/articles", require("./routes/articles"));
app.use("/api/specialists", require("./routes/specialists"));
app.use("/api/consultations", require("./routes/consultations"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/services", require("./routes/services"));

app.get("/", (req, res) => {
    res.json({
        message: "منصة الاستشارات الزراعية - API",
        timestamp: new Date(),
        endpoints: {
            articles: "/api/articles",
            specialists: "/api/specialists",
            services: "/api/services",
            auth: "/api/auth",
        },
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date(),
        database: "Connected", // Since we already connected at startup
    });
});

const PORT = process.env.PORT || 5000;

// Bind to all network interfaces
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌐 Also accessible on http://127.0.0.1:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Handle server errors
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.log("Try these solutions:");
        console.log("1. Kill the process using port 5000");
        console.log("2. Change PORT in .env file to 5001");
        console.log("3. Wait a few seconds and try again");
    } else {
        console.error("❌ Server error:", error);
    }
});
