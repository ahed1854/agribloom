const axios = require("axios");

async function testPaymentFlow() {
    try {
        console.log("🔍 Testing Payment Flow for Specialists...\n");

        // 1. Login as a user
        console.log("1. Logging in as user...");
        const userLogin = await axios.post("http://localhost:5000/api/auth/login", {
            email: "saud@example.com",
            password: "password123",
        });

        const userToken = userLogin.data.token;
        console.log("✅ User logged in");

        // 2. Create a consultation (unpaid)
        console.log("\n2. Creating consultation (unpaid)...");
        const specialistsRes = await axios.get("http://localhost:5000/api/specialists");
        const specialistId = specialistsRes.data.data[0]._id;

        const createConsRes = await axios.post(
            "http://localhost:5000/api/consultations",
            {
                specialistId,
            },
            {
                headers: { Authorization: `Bearer ${userToken}` },
            }
        );

        const consultationId = createConsRes.data.data._id;
        console.log(`✅ Created consultation: ${consultationId}`);
        console.log(`   Status: ${createConsRes.data.data.status}, Paid: ${createConsRes.data.data.payment.paid}`);

        // 3. Login as specialist
        console.log("\n3. Logging in as specialist...");
        const specialistLogin = await axios.post("http://localhost:5000/api/auth/login", {
            email: "ahmed@agricultural.com",
            password: "password123",
        });

        const specialistToken = specialistLogin.data.token;
        console.log("✅ Specialist logged in");

        // 4. Specialist tries to see consultations (should see none - unpaid)
        console.log("\n4. Specialist viewing consultations (should be empty)...");
        const specialistConsRes = await axios.get("http://localhost:5000/api/consultations/specialist-consultations", {
            headers: { Authorization: `Bearer ${specialistToken}` },
        });

        console.log(`Specialist consultations: ${specialistConsRes.data.count}`);
        console.log(`Data:`, specialistConsRes.data.data);

        // 5. User pays for consultation
        console.log("\n5. User paying for consultation...");
        const paymentRes = await axios.put(
            `http://localhost:5000/api/consultations/${consultationId}/payment`,
            {},
            {
                headers: { Authorization: `Bearer ${userToken}` },
            }
        );

        console.log(`✅ Payment successful:`, paymentRes.data.data.payment.paid);

        // 6. Specialist tries to see consultations again (should see the paid one)
        console.log("\n6. Specialist viewing consultations after payment...");
        const specialistConsRes2 = await axios.get("http://localhost:5000/api/consultations/specialist-consultations", {
            headers: { Authorization: `Bearer ${specialistToken}` },
        });

        console.log(`Specialist consultations after payment: ${specialistConsRes2.data.count}`);
        console.log(`Data:`, specialistConsRes2.data.data);

        // 7. Specialist tries to send message (should work now)
        console.log("\n7. Specialist sending message to paid consultation...");
        try {
            const messageRes = await axios.post(
                "http://localhost:5000/api/messages",
                {
                    consultationId,
                    text: "مرحباً، شكراً للدفع. كيف يمكنني مساعدتك؟",
                },
                {
                    headers: { Authorization: `Bearer ${specialistToken}` },
                }
            );

            console.log("✅ Message sent successfully:", messageRes.data.data.text);
        } catch (err) {
            console.error("❌ Specialist cannot send message:", err.response?.data?.message);
        }

        console.log("\n🎉 Payment flow test completed!");
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

testPaymentFlow();
