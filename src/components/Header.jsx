import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../slides/Context";
import axios from "axios";
import AllCategories from "./AllCategories";

export default function Header() {
  let { userId, setuserId } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  let [product, setProduct] = useState([]);

  // --------------------------------------------- user logout

  const handlebtn = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/user-logout`, {
        withCredentials: true,
      });
      setuserId(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------------------------------- fetch user

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await axios.get(
         `${process.env.REACT_APP_API_BASE_URL}/user/fetch-user`,
          {
            withCredentials: true,
          }
        );
        setuserId(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchapi();
  }, []);

  // --------------------------------------- search

  useEffect(() => {
    const fetcheddata = async () => {
      try {
        const resp = await axios.get(
         `${process.env.REACT_APP_API_BASE_URL}/admin/manage-productapi`
        );
        setProduct(resp.data);
      } catch (err) {
        console.log(err);
        setProduct([]);
      }
    };

    fetcheddata();
  }, []);

  const handlesearch = () => {
    const filtered = product.filter((item) =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    navigate("/search", { state: { filproduct: filtered } });
  };

  return (
    <div>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-12 logo">
            <Link to='/' style={{textDecoration:'none'}}><h1>E-Commerce</h1></Link>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12 col-12 text-start cont1">
            <input
              type="text"
              placeholder="search here..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlesearch();
                }
              }}
            />

            <i
              className="fa-solid fa-magnifying-glass search-icon"
              onClick={handlesearch}
            ></i>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 col-12 cont2 text-start">
            {userId && userId.name ? (
              <span>
                <select
                  id="button"
                  onChange={(e) => {
                    if (e.target.value === "logout") handlebtn();
                    else if (e.target.value === "orders") navigate("/myorders");
                  }}
                >
                  <option value="user" hidden>
                    Hii, {userId.name}
                  </option>
                  <option value="orders">My Orders</option>
                  <option value="logout">Log Out</option>
                </select>
              </span>
            ) : (
              <Link to="/login" id="button2">
                Log In
              </Link>
            )}
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping text-dark cart"> </i>
            </Link>
          </div>
        </div>
      </div>

      {searchQuery && filteredProducts.length > 0 && (
        <div className="search-results">
          <ul>
            {filteredProducts.map((item) => (
              <li key={item._id}>
                <Link to="/nextone" state={{ product: [item] }}>
                  {item.product}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NAVBAR START */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" ></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-list"
            id="navbarSupportedContent" 
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              
               <li className="nav-item ">
                <Link to="/about">About Us</Link>
              </li>
              <li className="nav-item ">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item ">
                <Link to="/location">Location</Link>
              </li>
              <li className="nav-item  ">
                <AllCategories />
              </li> 
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
