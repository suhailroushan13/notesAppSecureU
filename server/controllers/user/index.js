import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../../models/User.js"; // Adjust the path as necessary

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        // Validate email
        const emailRegex = /.+\@.+\..+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        // Validate phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ msg: "Phone number must be exactly 10 digits" });
        }

        // Check if the email already exists
        const existingUserByEmail = await userModel.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        // Check if the phone number already exists
        const existingUserByPhone = await userModel.findOne({ phone });
        if (existingUserByPhone) {
            return res.status(400).json({ msg: "Phone number already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ msg: "User Created Successfully" });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Set session
        req.session.userId = user._id;

        // Set a cookie manually if needed
        res.cookie('session_id', req.session.id, { httpOnly: true, secure: false });

        res.json({ msg: "Login successful", session_id: req.session.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Middleware to authenticate the user
const authenticate = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    next();
};

// Get user profile
router.get("/profile", authenticate, async (req, res) => {
    try {
        console.log("API Called ✅");

        const user = await userModel.findById(req.session.userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/profile", authenticate, async (req, res) => {
    try {
        const updates = req.body;
        const allowedUpdates = ["firstName", "lastName", "email", "phone", "password"];
        const updateFields = {};

        allowedUpdates.forEach(field => {
            if (updates[field]) {
                updateFields[field] = updates[field];
            }
        });

        if (updateFields.password) {
            updateFields.password = await bcrypt.hash(updateFields.password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.session.userId, updateFields, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete user profile
router.delete("/profile", authenticate, async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.session.userId);
        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        req.session.destroy();
        res.json({ msg: "User deleted" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete all users
router.delete("/users", async (req, res) => {
    try {
        const result = await userModel.deleteMany({});
        res.json({ msg: "All users deleted", result });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
