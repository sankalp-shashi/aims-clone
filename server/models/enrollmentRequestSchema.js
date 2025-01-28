import mongoose from 'mongoose';

const enrollmentRequestSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    
    advisorCode: {
        type: String,
        required: true,
    },

    courseCode: {
        type: String,
        required: true,
    },

    instructorCode: {
        type: String,
        required: true,
    },
});

export default mongoose.model('enrollmentRequest', enrollmentRequestSchema);