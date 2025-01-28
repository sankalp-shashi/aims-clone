import mongoose from 'mongoose';

const approvalRequestSchema = new mongoose.Schema({

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

export default mongoose.model('approvalRequest', approvalRequestSchema);