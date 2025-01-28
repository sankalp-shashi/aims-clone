import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import CourseBlock from './CourseBlock';

const CourseList = ({ type }) => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const endpoint =
                    type === 'available'
                        ? '/dashboard/available-courses'
                        : type === 'enrolled'
                        ? '/dashboard/enrolled-courses'
                        : '/dashboard/requested-courses';
        
                const response = await axios.get(endpoint, { withCredentials: true });
        
                if (response.headers['content-type'].includes('application/json')) {
                    console.log('Courses Data:', response.data);
                    setCourses(Array.isArray(response.data) ? response.data : []);
                } else {
                    console.error('Unexpected Response:', response);
                    setError('Invalid response from the server');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
            }
        };

        fetchCourses();
    }, [type]);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(courses) && courses.map((course) => (
                    <CourseBlock key={course.code} course={course} type={type} />
                ))}
                {Array.isArray(courses) && courses.length === 0 && (
                    <p>No courses found for this section.</p>
                )}
            </div>
        </div>
    );
};

export default CourseList;
