import React, { useState, useEffect } from 'react';
import { FaBook, FaUsers, FaDollarSign, FaBookOpen, FaGraduationCap, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [payments, setPayments] = useState([]);
    const [adminInfo] = useState({ name: 'Admin User', email: 'admin@eduplus.com' });
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New student registration: Sarah Parker', time: '5 mins ago', read: false },
        { id: 2, message: 'New course published: Advanced Physics', time: '1 hour ago', read: false },
        { id: 3, message: 'Payment received from John Doe', time: '2 hours ago', read: true }
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const [usersRes, coursesRes, lessonsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/users', { headers }),
                    fetch('http://localhost:5000/api/courses', { headers }),
                    fetch('http://localhost:5000/api/lessons', { headers }),
                ]);

                const [usersData, coursesData, lessonsData] = await Promise.all([
                    usersRes.json(),
                    coursesRes.json(),
                    lessonsRes.json(),
                ]);

                setStudents(usersData.users.filter((user) => user.role === 'student'));
                setInstructors(usersData.users.filter((user) => user.role === 'instructor'));
                setCourses(coursesData.courses || []);
                setLessons(lessonsData.lessons || []);
                setPayments([
                    { id: 1, studentName: 'John Doe', course: 'Mathematics', amount: 99.99, status: 'completed' },
                    { id: 2, studentName: 'Jane Smith', course: 'Physics', amount: 149.99, status: 'pending' },
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const markAsRead = (notificationId) => {
        setNotifications(notifications.map(notification =>
            notification.id === notificationId
                ? { ...notification, read: true }
                : notification
        ));
    };

    const NotificationDropdown = () => (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    >
                        Mark all as read
                    </button>
                </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                            }`}
                        onClick={() => markAsRead(notification.id)}
                    >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const Sidebar = () => (
        <div className="w-64 bg-gray-800 h-screen fixed left-0 top-0">
            <div className="p-6 text-center">
                <div className="mb-4">
                    <img
                        src="/api/placeholder/100/100"
                        alt="Admin"
                        className="w-20 h-20 rounded-full mx-auto mb-2"
                    />
                    <h2 className="text-white text-lg font-semibold">{adminInfo.name}</h2>
                    <p className="text-gray-400 text-sm">{adminInfo.email}</p>
                </div>
                <nav className="mt-8">
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`flex items-center p-3 rounded w-full mb-2 ${activeTab === 'students' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <FaUsers size={20} className="mr-2" />
                        Students
                    </button>
                    <button
                        onClick={() => setActiveTab('instructors')}
                        className={`flex items-center p-3 rounded w-full mb-2 ${activeTab === 'instructors' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <FaGraduationCap size={20} className="mr-2" />
                        Instructors
                    </button>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`flex items-center p-3 rounded w-full mb-2 ${activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <FaBook size={20} className="mr-2" />
                        Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('lessons')}
                        className={`flex items-center p-3 rounded w-full mb-2 ${activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <FaBookOpen size={20} className="mr-2" />
                        Lessons
                    </button>
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`flex items-center p-3 rounded w-full mb-2 ${activeTab === 'payments' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <FaDollarSign size={20} className="mr-2" />
                        Payments
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}
                        className="flex items-center p-3 rounded w-full text-gray-300 hover:bg-gray-700 mt-8"
                    >
                        <FaSignOutAlt size={20} className="mr-2" />
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    );

    const TableComponent = ({ title, headers, data, onEdit, onDelete }) => (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{title}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add New
                    </button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                {headers.map((header, index) => (
                                    <th key={index} className="p-4 text-left font-medium">
                                        {header}
                                    </th>
                                ))}
                                <th className="p-4 text-left font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    {Object.keys(item)
                                        .filter((key) => key !== '_id' && key !== 'id')
                                        .map((key, idx) => (
                                            <td key={idx} className="p-4">
                                                {key === 'status' ? (
                                                    <span
                                                        className={`px-2 py-1 rounded ${item[key] === 'active' || item[key] === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                    >
                                                        {item[key]}
                                                    </span>
                                                ) : (
                                                    item[key]
                                                )}
                                            </td>
                                        ))}
                                    <td className="p-4">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                </div>
            );
        }

        const tables = {
            students: {
                title: 'Students',
                headers: ['Name', 'Email', 'Age', 'Address', 'Phone No', 'Enrolled Courses', 'Last Login', 'Status'],
                data: students.map((student) => ({
                    name: student.name,
                    email: student.email,
                    age: student.age,
                    address: student.address,
                    phoneNo: student.phoneNo,
                    enrolledCourses: student.enrolledCourses,
                    lastLogin: student.lastLogin,
                    status: student.status,
                })),
            },
            instructors: {
                title: 'Instructors',
                headers: ['Name', 'Email', 'Courses', 'Status'],
                data: instructors.map((instructor) => ({
                    name: instructor.name,
                    email: instructor.email,
                    courses: instructor.createdCourses?.length || 0,
                    status: instructor.status,
                })),
            },
            courses: {
                title: 'Courses',
                headers: ['Title', 'Instructor', 'Duration', 'Status'],
                data: courses.map((course) => ({
                    title: course.title,
                    instructor: course.instructor?.name || 'N/A',
                    duration: `${course.duration} hours`,
                    status: course.status,
                })),
            },
            lessons: {
                title: 'Lessons',
                headers: ['Title', 'Course', 'Length', 'Status'],
                data: lessons.map((lesson) => ({
                    title: lesson.title,
                    course: lesson.course?.title || 'N/A',
                    length: `${lesson.length} mins`,
                    status: lesson.status,
                })),
            },
            payments: {
                title: 'Payments',
                headers: ['Student Name', 'Course', 'Amount', 'Status'],
                data: payments.map((payment) => ({
                    studentName: payment.studentName,
                    course: payment.course,
                    amount: `$${payment.amount.toFixed(2)}`,
                    status: payment.status,
                })),
            },
        };

        const activeTable = tables[activeTab];
        if (activeTable) {
            return (
                <TableComponent
                    title={activeTable.title}
                    headers={activeTable.headers}
                    data={activeTable.data}
                    onEdit={(item) => console.log('Edit:', item)}
                    onDelete={(item) => console.log('Delete:', item)}
                />
            );
        }

        return <div>Content not found</div>;
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <FaBell size={24} />
                            {notifications.some(n => !n.read) && (
                                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                        {showNotifications && <NotificationDropdown />}
                    </div>
                </div>
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;