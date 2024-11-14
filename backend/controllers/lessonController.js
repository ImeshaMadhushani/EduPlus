//import mongoose from 'mongoose';
import Lessons from '../models/lessons.js';
import Course from '../models/courses.js';
import { isAdminValid, isInstructorValid } from '../middleware/authorizeRole.js';

export async function createLesson(req, res) {
    const adminValid = isAdminValid(req);
    const instructorValid = isInstructorValid(req);

    if (!adminValid && !instructorValid) { // Require either role
        return res.status(403).json({ message: "Unauthorized. Only admins or instructors can create lessons." });
    }

    try {
        const { courseId, title, description, duration, instructorId } = req.body;
        const course = await Course.findById(courseId);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }
     
        // Create new lesson
        const newLesson = new Lessons({
            courseId,
            title,
            videoURL,
            pdfURL,
            content,
            order,
            description,
            duration,
            class: lessonClass,
        });

        await newLesson.save();
        res.status(201).json({ message: "Lesson created successfully", lesson: newLesson });

    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}  

export async function getLessonsByCourse(req, res) {
    try {
        const courseId = req.params.courseId;

        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ message: "Course not found." });
        }

        const lessons = await Lessons.find({ courseId });
        res.json(lessons);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: "Server error" ,err:err.message});
    }
}

// Get a single lesson by ID
export async function getLessonById(req, res) {
    try {
        const { id } = req.params;
        const lesson = await Lessons.findById(id);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found." });
        }

        res.status(200).json(lesson);
    } catch (error) {
        console.error("Error fetching lesson:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a lesson by ID
export async function updateLesson (req, res){
    const adminValid = isAdminValid(req);
    const instructorValid = isInstructorValid(req);

    if (!adminValid && !instructorValid) { // Require either role
        return res.status(403).json({ message: "Unauthorized. Only admins or instructors can update lessons." });
    }

    try {
        const { id } = req.params;
        const { title, videoURL, pdfURL, content, order, description, duration, class: lessonClass } = req.body;

        const updatedLesson = await Lessons.findByIdAndUpdate(
            id,
            { title, videoURL, pdfURL, content, order, description, duration, class: lessonClass },
            { new: true, runValidators: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ message: "Lesson not found." });
        }

        res.status(200).json({ message: "Lesson updated successfully", lesson: updatedLesson });
    } catch (error) {
        console.error("Error updating lesson:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Delete a lesson by ID
export async function deleteLesson (req, res){
    const adminValid = isAdminValid(req);
    const instructorValid = isInstructorValid(req);

    if (!adminValid && !instructorValid) { // Require either role
        return res.status(403).json({ message: "Unauthorized. Only admins or instructors can delete lessons." });
    }

    try {
        const { id } = req.params;
        const deletedLesson = await Lessons.findByIdAndDelete(id);

        if (!deletedLesson) {
            return res.status(404).json({ message: "Lesson not found." });
        }

        res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};