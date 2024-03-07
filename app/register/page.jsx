'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AvatarGenerator } from 'random-avatar-generator';
import { Button, IconButton, TextField } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const router = useRouter();

    const generateRandomAvatar = () => {
        const generator = new AvatarGenerator();
        return generator.generateRandomAvatar();
    }

    const handleRefreshAvatar = () => {
        setAvatarUrl(generateRandomAvatar)
    }

    useEffect(() => {
        setAvatarUrl(generateRandomAvatar());
    }, [])


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

        // Name validation
        if (!name.trim()) {
            errors.name = 'Name can\'t be empty.';
        } else if (name.trim().length > 20) {
            errors.name = 'Name should be at most 20 characters.';
        }

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
        } else if (!strongPasswordRegex.test(password)) {
            errors.password = 'Password should include a combination of letters, numbers, and symbols.';
        }

        // Confirm Password validation
        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Password can\'t be empty.';
        }
        else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;
    };


    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='min-h-[30vh] bg-white w-[95vw] md:w-[35vw] rounded-lg shadow-md p-5'>

                <h2 className='text-lg font-semibold text-center text-cyan-600'>Swift-Chat</h2>
                <h2 className='text-base font-semibold text-center text-gray-600'>Create your account.</h2>

                <div className="flex items-center space-y-2 justify-center p-2">
                    <div className='relative'>
                        <img src={avatarUrl} alt="Avatar" className='rounded-full h-20 w-20' />
                        <IconButton onClick={handleRefreshAvatar} sx={{ position: 'absolute', top: -15, right: -15 }}><ReplayIcon /></IconButton>
                    </div>
                </div>


                <div className=' my-2'>
                    <TextField
                        size='small'
                        fullWidth
                        label='Name'
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                        error={errors.name}
                        helperText={errors.name}
                    />
                </div>

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

                <div className=' my-2'>
                    <TextField
                        size='small'
                        fullWidth
                        label='Confirm Password'
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </div>


                <Button size='small' fullWidth variant='contained' color='inherit' type="submit">Register</Button>
            </form>
        </div>
    )
}

export default page
