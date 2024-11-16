//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import Course from '../models/courses.js';
import { isAdminValid } from '../middleware/authorizeRole.js'
import { isInstructorValid } from '../middleware/authorizeRole.js'

export async function createCourse(req, res) {
    const adminValid = isAdminValid(req);
    const instructorValid = isInstructorValid(req);

    if (!adminValid && !instructorValid) {
        return res.status(403).json({ message: "Unauthorized. Only admins or instructors can create courses." });
    }

    try {
        const { title, description, price, instructorId, thumbnail, lessons } = req.body;
        
       if (!title || !description || !price || !instructorId) {
            return res.status(400).json({ message: "Missing required fields" });
        } 
        // Check if the course title already exists
        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
            return res.status(400).json({ message: "Course with this title already exists." });
        }

        // Create a new course
        const newCourse = new Course({
            title,
            description,
            price,
            instructorId,
            thumbnail,
            lessons,
        });

        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function getAllCourses(req, res) {
    try {
        const courses = req.Course.getAll();

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }
        res.json({ courses });
    } catch (error) { 
        console.error("Error getting courses:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function getCourseById(req, res) { 
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ course });

    } catch (error) { 
        console.error("Error getting course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function updateCourse(req, res) { 
    const adminValid = isAdminValid(req);
    const instructorValid = isInstructorValid(req);
    
    if (!adminValid &&!instructorValid) {
        return res.status(403).json({ message: "Unauthorized. Only admins or instructors can update courses." });
    }

    try { 
        const courses=req.params.courses
        Course.findById(courses.id).then(async (course) => { 
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            } else {
                course.title = courses.title;
                course.description = courses.description;
                course.price = courses.price;
                course.instructorId = courses.instructorId;
                course.thumbnail = courses.thumbnail;
                course.lessons = courses.lessons;

                const updatedCourse = await course.save();
                res.json({ message: "Course updated successfully", course: updatedCourse });

            }


        })
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
       
}

export async function deleteCourse(req, res) { 
    const adminValid = isAdminValid(req);
    const instructorValid = isInstructorValid(req);
    
    if (!adminValid &&!instructorValid) {
        return res.status(403).json({ message: "Unauthorized. Only admins or instructors can delete courses." });
    }
    
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function enrolledCourse(req, res) { 
    try {
        // Get the student ID from the JWT token (or query parameter)
        const studentId = req.user.id;

        // Find the student and populate the courses array with course details
        const student = await Student.findById(studentId).populate('courses');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Send the enrolled courses as the response
        res.json({ enrolledCourses: student.courses });
    } catch (error) { 
        console.error("Error enrolling course:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}