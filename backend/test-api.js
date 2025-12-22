const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function testAPI() {
    try {
        console.log("🧪 Testing API endpoints...\n");

        // Test articles
        console.log("1. Testing articles endpoint...");
        const articlesResponse = await axios.get(`${BASE_URL}/articles`);
        console.log("Articles:", articlesResponse.data);

        // Test specialists
        console.log("\n2. Testing specialists endpoint...");
        const specialistsResponse = await axios.get(`${BASE_URL}/specialists`);
        console.log("Specialists:", specialistsResponse.data);

        // Test services
        console.log("\n3. Testing services endpoint...");
        const servicesResponse = await axios.get(`${BASE_URL}/services`);
        console.log("Services:", servicesResponse.data);

        console.log("\n✅ All API tests completed!");
    } catch (error) {
        console.error("❌ API Test failed:", error.response?.data || error.message);
    }
}

testAPI();
