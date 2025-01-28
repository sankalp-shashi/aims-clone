import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({ path: '../.env' })

export const authenticateToken = (req, res, next) => {
    console.log('Authenticating request:', req.cookies); // Debug
    const token = req.cookies?.token;

    if (!token) {
        console.log('No token found in cookies'); // Debug
        return res.status(401).json({ message: 'Token for authentication not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Decoded User:', decoded); // Debug
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};


// export const authenticateToken = (req,res,next) => {
//     const token = req.cookies.token;
//     if (!token){
//         return res.status(402).json({message: 'Token for authentication not found'});
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user;
//         next();
//     } catch (error) {
//         res.status(403).json({message: 'Invalid token'});
//     }
// }