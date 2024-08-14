import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (response.status === 200) {
                navigate('/home');
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={credentials.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={credentials.password}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </form>
                {error && <div className="text-red-500 text-center mt-2">{error}</div>}
            </div>
        </div>
    );
}