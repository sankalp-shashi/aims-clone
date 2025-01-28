import React, { useState } from 'react';
import CourseList from '../components/CourseList';

const DashboardPage = () => {
    const [activeSection, setActiveSection] = useState('available');

    console.log('Active Section:', activeSection); // Debug active section

    return (
        <div className="p-5">
            <div className="flex justify-around mb-4">
                <button
                    onClick={() => setActiveSection('available')}
                    className={`px-4 py-2 ${activeSection === 'available' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Available Courses
                </button>
                <button
                    onClick={() => setActiveSection('enrolled')}
                    className={`px-4 py-2 ${activeSection === 'enrolled' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Enrolled Courses
                </button>
                <button
                    onClick={() => setActiveSection('requested')}
                    className={`px-4 py-2 ${activeSection === 'requested' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Requested Courses
                </button>
            </div>

            {activeSection === 'available' && <CourseList type="available" />}
            {activeSection === 'enrolled' && <CourseList type="enrolled" />}
            {activeSection === 'requested' && <CourseList type="requested" />}
        </div>
    );
};

export default DashboardPage;
