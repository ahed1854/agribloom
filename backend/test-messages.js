const axios = require("axios");

async function testMessagesAPI() {
    try {
        console.log("🔍 Testing Messages API...\n");

        // First, login as a user to get a token
        console.log("1. Logging in as user...");
        const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
            email: "saud@example.com", // Use your user email
            password: "password123",
        });

        const token = loginRes.data.token;
        console.log("✅ Logged in as user, token received");

        // Get user's consultations
        console.log("\n2. Getting user consultations...");
        const consultationsRes = await axios.get("http://localhost:5000/api/consultations/my-consultations", {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User consultations:", JSON.stringify(consultationsRes.data, null, 2));

        // Test messages for each consultation
        if (consultationsRes.data.success && consultationsRes.data.data.length > 0) {
            const consultationId = consultationsRes.data.data[0]._id;

            console.log(`\n3. Testing messages for consultation: ${consultationId}`);

            // Get messages
            const messagesRes = await axios.get(`http://localhost:5000/api/messages/${consultationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Messages response:", JSON.stringify(messagesRes.data, null, 2));

            // Send a test message
            console.log(`\n4. Sending test message to consultation: ${consultationId}`);
            const sendRes = await axios.post(
                "http://localhost:5000/api/messages",
                {
                    consultationId,
                    text: "هذه رسالة تجريبية من الاختبار",
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Send message response:", JSON.stringify(sendRes.data, null, 2));

            // Get messages again to see the new one
            console.log(`\n5. Getting updated messages...`);
            const updatedMessagesRes = await axios.get(`http://localhost:5000/api/messages/${consultationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Updated messages:", JSON.stringify(updatedMessagesRes.data, null, 2));
        } else {
            console.log("❌ No consultations found for user");

            // Try creating a consultation first
            console.log("\n3. Creating a new consultation...");

            // Get a specialist ID (you'll need to get this from your database)
            // First, get specialists to find one
            const specialistsRes = await axios.get("http://localhost:5000/api/specialists");
            if (specialistsRes.data.success && specialistsRes.data.data.length > 0) {
                const specialistId = specialistsRes.data.data[0]._id;

                console.log(`Creating consultation with specialist: ${specialistId}`);

                const createConsRes = await axios.post(
                    "http://localhost:5000/api/consultations",
                    {
                        specialistId,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log("Created consultation:", JSON.stringify(createConsRes.data, null, 2));
            }
        }
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
    }
}

testMessagesAPI();
