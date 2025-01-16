import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginProgramHead.css';

const ProgramHeadLogin = () => {
    const [programHeadId, setProgramHeadId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!programHeadId || !password) {
            setError('Please enter both Program Head ID and Password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/program-heads/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    program_head_id: programHeadId,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {
                // Store user data in localStorage
                localStorage.setItem('program_head_id', data.program_head.id);
                localStorage.setItem('program_head_name', data.program_head.name);
                
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError('Invalid Program Head ID or Password.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className='login-page'>
            {/* Left Section */}
            <div className='login-blue-section'>
                <div className='seams-logo'></div>
                <h1 className='seams-title'>SEAMS</h1>
                <h2 className='seams-subtitle'>
                    Welcome to Students Engagement <br />
                    and Activity Management System
                </h2>
                <div className='mascot-logo'></div>
            </div>

            {/* Right Section */}
            <div className='login-white-section'>
                <div className='institution-logo'></div>
                
                <div className='login-container'>
                    <h2 className='login-title'>Let's get started.</h2>
                    <h3 className='login-subtitle'>Please enter credentials to proceed</h3>

                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                type='text'
                                id='programHeadId'
                                className='form-input'
                                placeholder='Enter Program Head ID'
                                value={programHeadId}
                                onChange={(e) => setProgramHeadId(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type='password'
                                id='password'
                                className='form-input'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <div className='error-message'>{error}</div>}

                        <button type='submit' className='login-button'>
                            Login
                        </button>

                        <div className='additional-options'>
                            <button type='button' className='forgot-password-button'>
                                Forgot password?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProgramHeadLogin;