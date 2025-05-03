import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Address() {
    
    const [formData, setformData] = useState({ name: '', street: '', city: '', state: '', zip: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fetchaddress=async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/user-address`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials:true
                })

                alert(res.data.message);
                navigate('/payment')

            }
            catch (err) {
                console.log(err);
            }
        }
        fetchaddress();
    }


  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '24px',
    border: '2px solid green',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'red',
    marginBottom: '24px',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid green',
    backgroundColor: '#e6ffed',
    outline: 'none',
    marginBottom: '16px',
    fontSize: '16px'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
  };

  const buttonHoverStyle = {
    backgroundColor: '#b91c1c'
  };

  return (
      
    <div style={containerStyle}>
      <h2 style={headingStyle}>Address Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
