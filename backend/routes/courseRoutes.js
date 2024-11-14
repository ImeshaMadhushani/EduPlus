// Import the middleware in routes/userRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js'; // Adjust the path as necessary
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
//import { authenticateToken } from '../middleware/authenticateToken.js';
const router = express.Router();

// Example routes using the middleware


router.post('/', authenticateToken, authorizeRole(['admin', 'instructor']), createCourse);
router.get('/', authenticateToken, getAllCourses);
router.get('/:id', authenticateToken, getCourseById);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);

export default router;
