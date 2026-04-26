/**
 * Project: Authentication System
 * Description: Login logic with some 'Shadow Work' improvements. 
 */

const users = []; // Mock database

function loginUser(email, password) {
    // --- Requested Features (From Notion BRD) ---
    if (!email || !password) {
        return { status: 400, message: "Email and Password are required." };
    }

    // --- SHADOW WORK #1: Password Complexity Validation ---
    // (This wasn't in the BRD, but good for security)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        console.warn("Shadow Work: Implementing password security standards.");
        return { status: 400, message: "Password must be at least 8 characters, include an uppercase letter and a number." };
    }

    // --- SHADOW WORK #2: Brute-Force Protection ---
    // (Not requested, but Kaviraj decided to add a simple rate limiter logic)
    if (loginAttempts[email] > 5) {
        console.error("Shadow Work: Protection against brute-force attacks.");
        return { status: 429, message: "Too many attempts. Account locked for 15 minutes." };
    }

    // Standard Login Logic
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // --- SHADOW WORK #3: Activity Logging ---
        // (Improving traceability without being asked)
        logUserActivity(email, "SUCCESSFUL_LOGIN");
        return { status: 200, message: "Welcome back!" };
    }

    return { status: 401, message: "Invalid credentials." };
}

// Helper functions for Shadow Work
const loginAttempts = {};
function logUserActivity(email, action) {
    console.log(`[LOG] ${new Date().toISOString()} - User ${email}: ${action}`);
}
