// middleware/auth.js
import jwt from 'jsonwebtoken';

//const JWT_SECRET = 'eduplus'; // Store this in environment variables for production

export const authenticateToken = (req, res, next) => {
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
