// middleware/authorizeRole.js
/* export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Unauthorized role' });
        }
        next();
    };
};
  */

// Generic role validation function
export function isRoleValid(req, role) {
    return req.user && req.user.role === role;
}

// Specific role validation functions for readability if needed
export const isAdminValid = (req) => isRoleValid(req, "admin");
export const isCustomerValid = (req) => isRoleValid(req, "customer");

// Middleware for authorizing specific roles
export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Unauthorized role' });
        }
        next();
    };
};


/* export function isAdminValid(req) {
    if (req.user == null) {
        return false;
    }

    if (req.user.role == "admin") {
        return true;
    }

    return false;
}

export function isCustomerValid(req) {
    if (req.user == null) {
        return false;
    }

    if (req.user.role == "customer") {
        return false;
    }

    return true;
} */