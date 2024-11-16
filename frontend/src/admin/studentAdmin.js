//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
//import users from '../../../backend/models/users';
//import users from '../../../backend/models/users';

/* const StudentAdmin = () => {
    const [users, setUsers] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        address: '',
        phoneNo: '',
        role: '',  // Assuming role can be modified by admin or authorized users
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    age: response.data.age,
                    address: response.data.address,
                    phoneNo: response.data.phoneNo,
                    role: response.data.role, // Include role in form data
                });
            } catch (error) {
                console.error('Error fetching student data', error);
                navigate('/login'); // Redirect to login if not authenticated
            }
        };
        fetchStudent();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const users = JSON.parse(localStorage.getItem('users'));
            if (users.role === 'student') {
                // Only allow admin or authorized users to modify role
                setFormData((prevState) => ({
                   ...prevState,
                    role: users.role,
                }));
            }
            const response = await axios.put(`/api/users/${users._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data);
            setEditing(false); // Switch back to viewing mode
        } catch (error) {
            console.error('Error updating student data', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/users/${users._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Error deleting student', error);
        }
    };

    return (
        <div className="dashboard">
            <h2 className="text-2xl font-semibold">{editing ? 'Edit' : 'View'} Profile</h2>

            {users ? (
                <div>
                    {editing ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Age:</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Phone No:</label>
                                <input
                                    type="text"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>*/
                            /* Optional role field - ensure that only admins can change this */
  /*                           <div>
                                <label>Role:</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled={users.role !== 'admin'}  // Allow only admin to modify role
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                        </form>
                    ) : (
                        <div>
                            <p>Name: {users.name}</p>
                            <p>Email: {users.email}</p>
                            <p>Age: {users.age}</p>
                            <p>Address: {users.address}</p>
                            <p>Phone No: {users.phoneNo}</p>
                            <p>Role: {users.role}</p> */ /* Show role for admin users */
         /*                </div>
                    )}

                    <div>
                        <button onClick={() => setEditing(!editing)}>
                            {editing ? 'Cancel' : 'Edit Profile'}
                        </button>
                        <button onClick={handleDelete} className="text-red-500">
                            Delete Account
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StudentAdmin;
 */