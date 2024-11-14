// Import the middleware in routes/userRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js'; // Adjust the path as necessary
import { register, login, getUserById,updateUser,deleteUser,getAllUsers } from '../controllers/userController.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
//import { authenticateToken } from '../middleware/authenticateToken.js';
const router = express.Router();

// Example routes using the middleware


router.post('/register', register);
router.post('/login', login);
router.get('/:id', authenticateToken, authorizeRole(['admin']), getUserById);
router.get('/', authenticateToken, getAllUsers);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
