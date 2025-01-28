import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    instructorCode: {
        type: String,
        required: true,
    },
});

const course = mongoose.model('course', courseSchema);
export default course;