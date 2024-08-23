const Needer = require("../models/Useragain.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Display data handler
const display_data = (req, res) => {
    if (req.url === "/") {
        console.log("Hi");
        res.send("Welcome to signup api");
    }
};

// Store data handler
const store_data = async (req, res) => {
    if (req.url === "/store-data") {
        try {
            const { name, password,userRole } = req.body;

            // Check if user already exists
            const profile = await Needer.findOne({ name });
            if (profile) {
                console.log("User already exists");
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create new user
            const newUser = new Needer({
                name,
                password: hashedPassword,
                userRole,
            });

            // Save user to database
            await newUser.save();
            console.log("User saved successfully");

            // Respond with success message
            res.status(200).json({ success: "User data saved successfully" });
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).json({ message: "An error occurred" });
        }
    }
};

module.exports = {
    display_data,
    store_data
};
