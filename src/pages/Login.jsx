import axios from 'axios';
import './login.css'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../slides/Context';

export default function Login() {
    let [formData, setformData] = useState({ email: '', pass: '' });
    let [error, setError] = useState('');

    let { setuserId } = useContext(UserContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/login`, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data);
            if (response.data.success) {
                setuserId(response.data.backid);
                navigate('/');
            }
            
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setError('User not found');
                } else if (err.response.status === 401) {
                    setError('Incorrect Password');
                } else {
                    setError('Server error occurred');
                }
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e0f2f1' }} id='login' >
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', width: '300px' }} >
                <h1 style={{ color: 'black', textAlign: 'center' }}>User Login</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        value={formData.email} 
                        style={{ padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        type="password" 
                        name="pass" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        value={formData.pass} 
                        style={{ padding: '10px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <button style={{ backgroundColor: 'black', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Login</button>
                </form>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <a href="/signup">
                        <button style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black', borderRadius: '4px', cursor: 'pointer' }}>Signup</button>
                    </a>
                </div>
            </div>
        </div>
    );
}
