import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { isAdminValid } from '../middleware/authorizeRole.js'
//import { authenticateToken } from '../middleware/auth.js';
//import users from '../models/users.js';

//const JWT_SECRET = process.env.JWT_SECRET; // Secure secret with environment variables in production
const SALT_ROUNDS = 10;

// User Registration
export async function register(req, res) {
    try {
        const { name, email, password, confirmPassword, role, age, address, phoneNo } = req.body;

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            age,
            address,
            phoneNo,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// User Login
/* export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await users.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(password);
        console.log(user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}; */
export function login(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email }).then((user) => {
        if (user == null) {
            res.status(401).json({ message: "Invalid email or password!" });
        } else {
            const isPasswordValid = bcrypt.compare(credentials.password, user.password)
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password!" });
            } else {
                const payload = {
                    id: user._id, 
                    email: user.email,
                    name: user.name,
                    role: user.role
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });
                return res.json({ message: "User logged in successfully!", user: user, token: token });
            }
        }
    }).catch((error) => {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error" });
    });
}

// Get User by ID (Admin)
export async function getUserById(req, res) {
    const adminValid = isAdminValid(req);

    if (!adminValid) {
        res.status(403).json({
            message: 'Access denied: Unauthorized role'
        });
        return;
    } 

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) { 
            res.status(404).json({
                message: 'User not found'
            });  
        } 
            res.json(user);
    }catch (error) {
        // Handle unexpected errors
        console.error("Error fetching user:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Update User Profile (any role)
export async function updateUser(req, res) {
    const credentials = req.body;

    User.findById(credentials.email).then(async (user) => {
        try{
        if (user == null) {
            res.status(404).json({ message: 'User not found' });
        } else {
            user.name = credentials.name;
            user.email = credentials.email;
            user.password = credentials.password;
            user.role = credentials.role;
            user.age = credentials.age;
            user.address = credentials.address;
            user.phoneNo = credentials.phoneNo;

            // If a new password is provided, hash it and update
            if (password) {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
                user.password = hashedPassword;
            }

            await user.save().then(() => res.json({ message: 'User updated successfully' }));
        }
        }catch (err) { 
            console.error("Error updating user:", err);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    })
}

// Delete User (Admin only)
export async function deleteUser(req, res) { 
    const adminValid = isAdminValid(req);
    if (!adminValid) { 
        res.status(403).json({
            message: 'Access denied: Unauthorized role'
        });
        return;
    }
    
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
// List all users
export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        if (users == null) {
            return res.status(403).json({ message: "Not Found" });
        } else {
            res.json({ message: "Found", users: users });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}