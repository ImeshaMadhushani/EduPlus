// Import the middleware in routes/userRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js'; // Adjust the path as necessary
import { getUserById, getAllUsers, registerUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
//import { authenticateToken } from '../middleware/authenticateToken.js';
const router = express.Router();

// Example routes using the middleware
router.get('/:id', authenticateToken, authorizeRole(['admin', 'user', 'instructor']), getUserById);
router.get('/', authenticateToken, authorizeRole(['admin']), getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'user']), updateUser);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteUser);

export default router;
