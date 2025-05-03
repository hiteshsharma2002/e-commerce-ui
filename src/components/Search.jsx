import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header';

export default function Search() {

    const location = useLocation();

    const { filproduct } = location.state || {};
    

  return (
      <div>
          
          <Header></Header>
          
          <div className="d-flex flex-wrap justify-content-center">
  {filproduct.length > 0 ? (
    filproduct.map((item, index) => (
      <div className="card" style={{ width: '18rem', margin: "10px" }} key={index}>
        
        <img 
          src={`${process.env.REACT_APP_API_BASE_URL}${item.image?.[0]}`} 
          className="card-img-top"  
          style={{ width: "100%", height: "200px", objectFit: "contain" }} 
          alt={item.product} 
        />
        
        <div className="card-body">
          <h5 className="card-title" style={{ backgroundColor: 'black', color: 'white' }}>
            {item.product}
          </h5>
          <h5 className="card-title" style={{ backgroundColor: 'black', color: 'white' }}>
            Rs. {item.price}
          </h5>
          
          <h5 className="card-title" style={{ backgroundColor: 'green', color: 'white' }}>
            {item.discount} On M.R.P
          </h5>
          <h5 className="card-title">{item.avail}</h5>
          <>
            <Link to='/nextone' state={{ product: [item]   }}><button  
              style={{
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                width: '120px',
                height: '30px',
                marginTop: '40px',
                marginLeft: '100px'
              }}
            >
              More Details
            </button></Link>
          </>
        </div>
      </div>
    ))
  ) : (
                      <h3>No result found 🙂</h3>
                      
  )}
</div>

    </div>
  )
}
