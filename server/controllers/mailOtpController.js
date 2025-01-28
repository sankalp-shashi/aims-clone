import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import otp from '../models/otpSchema.js';
import user from '../models/userSchema.js';

dotenv.config({ path: '../.env' });

// Generate a random 6-digit OTP
const generateOTP = () => {
    const otp = crypto.randomInt(100000, 1000000);
    console.log('Generated OTP: ', otp);
    return otp;
};

export const sendOTP = async (req, res) => {
    try {
        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_PROVIDER, // Replace with your SMTP provider
            auth: {
                user: process.env.EMAIL_ID, // Your email address
                pass: process.env.EMAIL_PWD, // Your email password or app-specific password
            },
        });
        // console.log('Transporter: ', transporter);
        const plaintextOTP = generateOTP();
        const encryptedOTP = await bcrypt.hash(plaintextOTP.toString(10), 12);
    
       
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({message: 'Email is required'});
        }

        const existingOTP = await otp.findOne({email});
        const existingUser = await user.findOne({email});
        if (!existingUser) {
            return res.status(404).json({message: 'User not found'});
        }
        if (existingOTP)
        {
            existingOTP.otp = encryptedOTP;
            await existingOTP.save();
        }
        else
        {
            // Save the OTP to the database
            const newOTP = new otp({
                email,
                otp: encryptedOTP,
            });
            await newOTP.save();
        }

        
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'OTP',
            text: `Your OTP is ${plaintextOTP}. It expires in 5 minutes.`,
        };

          
        transporter.verify((error, success) => {
        if (error) {
            console.error('SMTP Connection Error:', error);
        } else {
            console.log('SMTP Connection Successful: ', success);
        }
        });
          

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: 'Failed to send OTP'});
            }
            // print('Email sent: ' + info.response);
            console.log('Email sent: ' + info.response);
            res.json({message: 'OTP sent successfully'});
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong!'});
    }
}
