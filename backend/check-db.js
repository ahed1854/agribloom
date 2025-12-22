const mongoose = require("mongoose");
require("dotenv").config();

async function checkDatabase() {
    try {
        console.log("🔍 Checking database connection and data...\n");

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected\n");

        const db = mongoose.connection.db;

        // Check collections
        const collections = await db.listCollections().toArray();
        console.log(
            "📁 Collections:",
            collections.map((c) => c.name)
        );

        // Check data in each collection
        const Article = require("./models/Article");
        const User = require("./models/User");
        const Service = require("./models/Service");

        console.log("\n📊 Data Count:");
        console.log("Articles:", await Article.countDocuments());
        console.log("Users:", await User.countDocuments());
        console.log("Specialists:", await User.countDocuments({ role: "specialist" }));
        console.log("Services:", await Service.countDocuments());

        console.log("\n📝 Sample Data:");

        const articles = await Article.find().limit(2);
        console.log("First 2 articles:", articles);

        const specialists = await User.find({ role: "specialist" }).limit(2);
        console.log("First 2 specialists:", specialists);

        const services = await Service.find().limit(2);
        console.log("First 2 services:", services);

        await mongoose.connection.close();
        console.log("\n✅ Database check completed");
    } catch (error) {
        console.error("❌ Database check failed:", error.message);
        process.exit(1);
    }
}

checkDatabase();
