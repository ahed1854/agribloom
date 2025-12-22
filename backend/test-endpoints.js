const axios = require("axios");

// Configure axios for better error handling
axios.defaults.timeout = 5000;

const BASE_URL = "http://localhost:5000/api";

async function testEndpoint(endpoint, name) {
    try {
        console.log(`Testing ${name}...`);
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                "User-Agent": "API-Test-Script",
                Accept: "application/json",
            },
        });
        console.log(`✅ ${name}: SUCCESS (Status: ${response.status})`);
        console.log(`   Data Structure:`, {
            success: response.data.success,
            count: response.data.count,
            dataType: Array.isArray(response.data.data) ? "array" : typeof response.data.data,
        });
        return true;
    } catch (error) {
        console.log(`❌ ${name}: FAILED`);
        if (error.code) {
            console.log(`   Error Code: ${error.code}`);
        }
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Response:`, error.response.data);
        } else if (error.request) {
            console.log(`   No response received: ${error.message}`);
        } else {
            console.log(`   Error: ${error.message}`);
        }
        return false;
    }
}

async function testAllEndpoints() {
    console.log("🧪 Testing API endpoints individually...\n");
    console.log("Server should be running on http://localhost:5000\n");

    const endpoints = [
        { path: "/articles", name: "Articles" },
        { path: "/specialists", name: "Specialists" },
        { path: "/services", name: "Services" },
        { path: "/", name: "Root" },
    ];

    let successCount = 0;

    for (const endpoint of endpoints) {
        const success = await testEndpoint(endpoint.path, endpoint.name);
        if (success) successCount++;
        console.log("---");
    }

    console.log(`\n📊 Results: ${successCount}/${endpoints.length} endpoints working`);

    if (successCount === 0) {
        console.log("\n🔧 Troubleshooting:");
        console.log("1. Make sure server is running: node server.js");
        console.log("2. Check if port 5000 is available");
        console.log("3. Test manually in browser: http://localhost:5000/api/articles");
    }
}

testAllEndpoints();
