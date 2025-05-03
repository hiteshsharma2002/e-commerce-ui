import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

export default function Footer2() {
    
    const [date, setDate] = useState('');
    
    useEffect(() => {
        let year = new Date().getFullYear();
        setDate(year);
      },[])

  return (
      <div>
          
          <div className="container-fluid gx-0 foot-cont2">
        <div className="row gx-0">
          
          <div className="col-12 logo-footer">
            <Link to='/' style={{ textDecoration: 'none' }}><h1>E-Commerce</h1></Link>
            <p>© {date} E-Commerce. All Rights Reserved.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
