// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children, className }) => {
    return (
        <div className={`border rounded-lg shadow-lg ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children }) => {
    return <div className="p-4 border-b">{children}</div>;
};

export const CardContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
};

export const CardTitle = ({ children, className }) => {
    return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
};
