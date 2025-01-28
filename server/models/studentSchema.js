import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    enrolledCourses: {
        type: [String],
        required: false,
    },

    requestedCourses: {
        type: [String],
        required: false,
    },

    advisorCode: {
        type: String,
        required: true,
    },
});

const student = mongoose.model('student', studentSchema);
export default student;