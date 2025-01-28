import dotenv from 'dotenv';
import user from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otp from '../models/otpSchema.js';
dotenv.config({ path: '../.env' });

// Register a new user with role
export const register = async (req, res) => {
    try {
        const { email, role, enteredOTP } = req.body;

        // Validate input fields
        if (!email || !role || !enteredOTP) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Validate role
        const validRoles = ['Student', 'Instructor', 'Admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role! Role must be one of: ${validRoles.join(', ')}` });
        }

        // Check if user already exists
        let existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists!' });
        }

        // let existingUserByName = await user.findOne({ username });
        // if (existingUserByName) {
        //     return res.status(400).json({ message: 'User with this username already exists!' });
        // }

        // Create a new user
        const newUser = new user({
            username,
            email,
            role
        });

        // Save user to the database
        await newUser.save();

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role, email: existingUser.email }, // Include email in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: false,
            sameSite:'none',
            secure:'true' // Cookie can be accessed from JavaScript
        };
        
        res.status(200)
            .cookie('token', token, cookieOptions)
            .json({
                message: 'Login successful',
                success: true,
                token,
                user: { email: existingUser.email, role: existingUser.role },
            });
        // res.cookie("token", token, {
        //     httpOnly: false,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     });
              
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

// Login a user with role validation

export const login = async (req, res) => {
    try {
        console.log('body: ', req.body);
        const { email, enteredOTP, role } = req.body;

        // Validate input fields
        if (!email || !enteredOTP || !role) {
            console.log('email, otp, role: ', email, enteredOTP, role);
            return res.status(405).json({ message: 'All fields are required!' });
        }

        // Check if user exists
        let existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Validate role
        if (existingUser.role !== role) {
            return res.status(403).json({ message: 'Role mismatch! Access denied.' });
        }

        // Check OTP
        const existingOTP = await otp.findOne({ email });
        if (!existingOTP) {
            return res.status(404).json({ message: 'OTP not found or expired!' });
        }

        const matched = await bcrypt.compare(enteredOTP, existingOTP.otp);
        if (!matched) {
            return res.status(406).json({ message: 'Incorrect OTP!' });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // const cookieOptions = {
        //     expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
        //     httpOnly: false
        // };

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true, // Allow client-side access temporarily for testing
            sameSite: 'none',
            secure:'true', // 'none' if cross-origin requests are used
        };
        
        // res.cookie('token', token, cookieOptions);
        

        res.status(200).cookie('token', token, cookieOptions).json({
            message: 'Login successful',
            success: true,
            token,
            user: {
                email: existingUser.email,
                role: existingUser.role
            }
        });
        console.log("Response: ", res);
        return res;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Logout a user
export const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};
