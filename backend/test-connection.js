const http = require("http");

console.log("🔍 Testing backend connectivity...\n");

// Test if backend is responding
const testBackend = () => {
    return new Promise((resolve, reject) => {
        const req = http.request(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/articles",
                method: "GET",
                timeout: 5000,
            },
            (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    console.log("✅ Backend is responding");
                    console.log(`   Status: ${res.statusCode}`);
                    resolve();
                });
            }
        );

        req.on("error", (err) => {
            console.log("❌ Backend connection failed");
            console.log(`   Error: ${err.message}`);
            reject(err);
        });

        req.on("timeout", () => {
            console.log("❌ Backend request timeout");
            req.destroy();
            reject(new Error("Timeout"));
        });

        req.end();
    });
};

// Test if MongoDB is connected
const testMongoDB = async () => {
    try {
        const mongoose = require("mongoose");
        const dotenv = require("dotenv");
        dotenv.config();

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB is connected");

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log(`   Collections: ${collections.map((c) => c.name).join(", ")}`);

        await mongoose.connection.close();
    } catch (err) {
        console.log("❌ MongoDB connection failed");
        console.log(`   Error: ${err.message}`);
    }
};

// Run tests
async function runTests() {
    console.log("1. Testing backend server...");
    try {
        await testBackend();
    } catch (err) {
        console.log("   💡 Tip: Make sure server is running with: node server.js");
    }

    console.log("\n2. Testing database...");
    await testMongoDB();

    console.log("\n🎯 Next steps:");
    console.log("   - Test in browser: http://localhost:5000/api/articles");
    console.log("   - Start frontend: cd frontend && npm run dev");
    console.log("   - Test frontend: http://localhost:3000");
}

runTests();
