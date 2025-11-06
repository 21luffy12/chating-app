import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genrateTockenAndSetCookie from "../utils/genrateTocken.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        // Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if username exists (case-insensitive)
        const existingUser = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Set profile picture based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

        // Create and save new user
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        });

        await newUser.save();

        // Generate JWT token and set cookie
        genrateTockenAndSetCookie(newUser._id, res);

        // Respond with user data
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Trim username input and ensure case-insensitive query
        console.log("Login attempt for username:", username.trim());
        const user = await User.findOne({ username: new RegExp(`^${username.trim()}$`, 'i') });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Compare entered password with stored (hashed) password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate token and set cookie
        genrateTockenAndSetCookie(user._id, res);

        // Return user data
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        // Clear the JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
