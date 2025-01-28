import React, { useState } from 'react';
import CourseList from '../components/CourseList';

const Dashboard_inst = () => {
    const [activeSection, setActiveSection] = useState('available');

    console.log('Active Section:', activeSection); // Debug active section

    return (
        <div className="p-5">
            <div className="flex justify-around mb-4">
                <button
                    onClick={() => setActiveSection('available')}
                    className={`px-4 py-2 ${activeSection === 'available' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Requested Courses for Instructor
                </button>
                <button
                    onClick={() => setActiveSection('enrolled')}
                    className={`px-4 py-2 ${activeSection === 'enrolled' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Requested Courses for Faculty Advisor
                </button>
                
            </div>

            {activeSection === 'available' && <CourseList type="available" />}
            {activeSection === 'enrolled' && <CourseList type="enrolled" />}
            {activeSection === 'requested' && <CourseList type="requested" />}
        </div>
    );
};

export default Dashboard_inst;
