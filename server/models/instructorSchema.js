import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    courses: {
        type: [String],
        required: false,
    },

    instructorCode: {
        type: String,
        required: true,
    },
});

export default mongoose.model('instructor', instructorSchema);