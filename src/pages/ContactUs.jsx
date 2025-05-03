import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from "axios";
import Footer2 from '../components/Footer2';

export default function ContactUs() {

  const [formData, setformData] = useState({ name: '', review: '',rating:'5' });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchapi = async () => {
      try {
          
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/review`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          alert(res.data.message);
        }

      }
      catch (err) {
        console.log(err.message);
      }


    }
    fetchapi(); 
  }

  return (
    <div>
      <Header></Header>
      
      <div className="container-fluid gx-0">
        <div className="row gx-0">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <img src="/images/contact.avif" alt="" style={{width:'100%',height:"400px",objectFit:'cover'}} className='img-fluid' />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">

          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10 pt-5">
              <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
              
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium me-2 fs-5">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium me-4 fs-5">Rating:</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="5">⭐️⭐️⭐️⭐️⭐️ (5)</option>
            <option value="4">⭐️⭐️⭐️⭐️ (4)</option>
            <option value="3">⭐️⭐️⭐️ (3)</option>
            <option value="2">⭐️⭐️ (2)</option>
            <option value="1">⭐️ (1)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium me-4 fs-5 mb-2">Message:</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-success text-white px-4 py-2 rounded hover:bg-blue-600" style={{border:'none'
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  

          </div>
        </div>
      </div>
    
      <Footer2></Footer2>
          
    </div>
  )
}
