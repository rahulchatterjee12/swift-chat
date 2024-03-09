'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation here
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // If there are no validation errors, you can proceed with form submission
            // Add your logic for form submission here
            console.log('Form submitted successfully!');
        } else {
            // If there are validation errors, update the errors state
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format.';
        }

        // Password validation
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!password.trim()) {
            errors.password = 'Password is required.';
        } else if (password.trim().length < 8) {
            errors.password = 'Password should be 8 characters.';
        }

        return errors;
    };


    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='min-h-[30vh] bg-white w-[95vw] md:w-[35vw] rounded-lg shadow-md p-5'>

                <h2 className='text-lg font-semibold text-center text-cyan-600'>Swift-Chat</h2>
                <h2 className='text-base font-semibold text-center text-gray-600'>Login to your account.</h2>

                <div className=' my-2'>
                    <TextField
                        size='small'
                        fullWidth
                        label='Email'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        helperText={errors.email}
                    />
                </div>

                <div className=' my-2'>
                    <TextField
                        size='small'
                        fullWidth
                        label='Password'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        helperText={errors.password}
                    />
                </div>

                <Button size='small' sx={{ marginBottom: 1 }} fullWidth variant='contained' color='inherit' type="submit">Login</Button>
                <span className='text-xs'>
                    New to Swift-Chat?
                    <Link href='/register' className='text-blue-600'> Create an Account</Link>
                </span>
            </form>
        </div>
    )
}

export default LoginForm
