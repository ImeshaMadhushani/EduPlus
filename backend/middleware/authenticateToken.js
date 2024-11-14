/*  // middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied: No token provided' });

    jwt.verify(token, process.env.JWT_SECRET || 'eduplus', (err, user) => {
        if (err) return res.status(403).json({ message: 'Access denied: Invalid token' });
        req.user = user;
        next();
    });
};
  */