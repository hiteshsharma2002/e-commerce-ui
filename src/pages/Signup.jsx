import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  let [formData, setformData] = useState({ name: '', email: '', mobile: '', pass: '' });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit=async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        
      
      });
      alert('User registered successfully');
      navigate('/login');
    }
    catch (error) {

      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }


  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#e8f5e9" }} id='login'>
      <div style={{ width: "100%", maxWidth: "400px", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", color: "black" }}>Sign Up</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid black" }}
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid black" }}
            required
          />
          <input 
            type="tel" 
            name="mobile" 
            placeholder="Mobile Number" 
            value={formData.mobile} 
            onChange={handleChange} 
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid black" }}
            required
          />
          <input 
            type="password" 
            name="pass" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid black" }}
            required
          />
          
          <button type="submit" style={{ padding: "10px", borderRadius: "5px", backgroundColor: "black", color: "white", fontWeight: "bold", cursor: "pointer" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
