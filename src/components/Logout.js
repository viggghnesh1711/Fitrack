"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            router.push('/Sign-In');
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <div>
            <button 
                onClick={handleLogout}
                className='bg-red-700 px-4 py-2 rounded-lg text-white'>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;