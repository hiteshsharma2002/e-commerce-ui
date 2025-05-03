import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

export default function Footer() {


  return (
      <div>
      <div className="container-fluid foot-cont1">
        <div className="row gx-0">
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 text-light">

            <h5>Know About Us</h5>
            <ul style={{listStyle:'none'}}>
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About Us</li></Link>
              <Link to='/contact'><li>Contact Us</li></Link>
              <Link to='/location'><li>Location</li></Link>
            </ul>

          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 text-light">
            <h5>Connect With Us</h5>
            <ul style={{listStyle:'none'}}>
              <a href="https://www.facebook.com/"><li>Facebook</li></a>
              <a href="https://www.instagram.com/"><li>Instagram</li></a>
              <a href="https://x.com/?lang=en"><li>Twitter</li></a>
            </ul>
           
          </div>


          <div className="col-lg-4 col-md-6 col-sm-6 col-12 text-light">
            <h5>Mail Us</h5>

            <pre>
                 E-Commerce Internet Private Limited, <br />
                 Buildings Mount Manginoi, <br />
                 Clove Village near Wellington Embassy <br />
                 Outer Ring Road,ShakorPur Village, <br />
                 Delhi, 1100589, <br />
                 New Delhi, India 
            </pre>

          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12 text-light">
            <h5>Registered Office Address</h5>
            <pre>E-Commerce Internet Private Limited, <br />
              Buildings Mount Manginoi, <br />
              Clove Village near Wellington Embassy <br />
              Outer Ring Road,ShakorPur Village, <br />
              Delhi, 1100589, <br />
              New Delhi, India <br />
              Telephone: 011-571581451 / 011-7821623522
            </pre>
          </div>
        </div>
      </div>
      

    </div>
  )
}
