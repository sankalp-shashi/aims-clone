import express from 'express';
import {
    getAvailableCourses,
    getEnrolledCourses,
    getRequestedCourses,
    requestEnrollment
} from '../controllers/studentDashboardController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/available-courses', authenticateToken, getAvailableCourses);
// router.get('/available-courses', async (req, res) => {
//     console.log('Request received for available courses');
//     try {
//         await getAvailableCourses(req, res);
//     } catch (err) {
//         console.error('Error in /available-courses:', err);
//         res.status(500).send('Internal server error');
//     }
// });

// router.get('/available-courses', );
router.get('/enrolled-courses', getEnrolledCourses);
router.get('/requested-courses', getRequestedCourses);
router.post('/request-enrollment', requestEnrollment);

export {router as studentRouter};
