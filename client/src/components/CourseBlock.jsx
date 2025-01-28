import React from 'react';
import axios from '../utils/axios';

const CourseBlock = ({ course, type }) => {
    const handleRequestEnrollment = async () => {
        try {
            await axios.post('/dashboard/request-enrollment', { courseCode: course.code});
            alert('Enrollment request sent!');
        } catch (error) {
            alert('Error sending enrollment request');
        }
    };

    return (
        <div className="p-4 border rounded shadow-md bg-white">
            <h3 className="font-bold text-lg">{course.name}</h3>
            <p>Code: {course.code}</p>
            <p>Instructor: {course.instructorCode}</p>
            {type === 'available' && (
                <button
                    onClick={handleRequestEnrollment}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Request Enrollment
                </button>
            )}
        </div>
    );
};

export default CourseBlock;
