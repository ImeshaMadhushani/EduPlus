// Import the middleware in routes/userRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js'; // Adjust the path as necessary
import { createLesson, getLessonsByCourse, getLessonById, updateLesson, deleteLesson } from '../controllers/lessonController.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
//import { authenticateToken } from '../middleware/authenticateToken.js';
const router = express.Router();

// Example routes using the middleware


router.post('/', authenticateToken, authorizeRole(['admin', 'instructor']), createLesson);
router.get('/', authenticateToken, getLessonsByCourse);
router.get('/:id', authenticateToken, getLessonById);
router.put('/:id', authenticateToken, updateLesson);
router.delete('/:id', authenticateToken, authorizeRole(['admin', 'instructor']), deleteLesson);

export default router;
