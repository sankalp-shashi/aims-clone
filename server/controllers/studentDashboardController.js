import Student from '../models/studentSchema.js';
import Course from '../models/courseSchema.js';

export const getAvailableCourses = async (req, res) => {
    console.log('Request received at /dashboard/available-courses'); // Log request
    console.log('Authenticated User:', req.user); // Log user (from auth middleware)

    try {
        const courses = await Course.find();
        console.log('Courses fetched:', courses); // Log fetched courses
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error in getAvailableCourses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Fetch enrolled courses
export const getEnrolledCourses = async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.user.email });
        const enrolledCourses = await Course.find({ code: { $in: student.enrolledCourses } });
        res.status(200).json(enrolledCourses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching enrolled courses' });
    }
};

// Fetch requested courses
export const getRequestedCourses = async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.user.email });
        const requestedCourses = await Course.find({ code: { $in: student.requestedCourses } });
        res.status(200).json(requestedCourses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching requested courses' });
    }
};

// Request enrollment
export const requestEnrollment = async (req, res) => {
    try {
        const { courseCode } = req.body;
        const student = await Student.findOne({ email: req.user.email });
        if (!student.requestedCourses.includes(courseCode)) {
            student.requestedCourses.push(courseCode);
            await student.save();
            res.status(200).json({ message: 'Enrollment request sent' });
        } else {
            res.status(400).json({ error: 'Already requested' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error sending enrollment request' });
    }
};