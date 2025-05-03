import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";

export default function Location() {
  return (
    <div>
      
      <Header />

      <h1 style={{fontSize:'3rem',fontWeight:'800',marginTop:'20px',color:'black'}}>Our Location</h1>


      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }} id="location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d448631.102694728!2d76.92755416429559!3d28.541808948359698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x390d04d9e11a08cf%3A0xc1a5a267ef8fd396!2sUttam%20Nagar%2C%20Delhi%2C%20110059!3m2!1d28.619557399999998!2d77.0549901!4m5!1s0x390ce9e275e841cd%3A0xc70c5a5c5bb51758!2sSector%20157%2C%20Noida%2C%20Uttar%20Pradesh%20201310!3m2!1d28.4609027!2d77.45728969999999!5e0!3m2!1sen!2sin!4v1743526991517!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border:'10px solid grey',marginBottom:'20px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    
    </div>
  );
}
