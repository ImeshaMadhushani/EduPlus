import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Header from '../components/Header';

const StudentDashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use navigate instead of history

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get('/api/courses/enrolledCourse', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEnrolledCourses(response.data.enrolledCourse);
                setLoading(false);
            } catch (err) {
                setError('Error fetching enrolled courses');
                setLoading(false);
            }
        };
        fetchEnrolledCourses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header/>
            <h1>Student Dashboard</h1>
            <h2>Your Enrolled Courses</h2>
            <ul>
                {enrolledCourses.length === 0 ? (
                    <p>No enrolled courses</p>
                ) : (
                    enrolledCourses.map((course) => (
                        <li key={course._id}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button
                                onClick={() => navigate(`/course/${course._id}`)} // Use navigate instead of history.push
                            >
                                View Course
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default StudentDashboard;
