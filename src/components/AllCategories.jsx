import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Ensure this includes dropdown styling if needed

export default function AllCategories() {
  const [category, setCategory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [product, setProduct] = useState([]);
  

  // categories api ------------------------------------------

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
       `${process.env.REACT_APP_API_BASE_URL}/admin/manage-categoryapi`
      );
      setCategory(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategory([]);
    }
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
    if (category.length === 0) {
      fetchCategories();
    }
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  // product --------------------------------------------

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

  return (
    <div
      className="nav-item dropdown ms-5 fs-5 position-relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="nav-link dropdown-toggle text-white"
        style={{ cursor: "pointer" }}
      >
        All Categories
      </span>

      {showDropdown && (
        <div className="dropdown-menu show custom-dropdown ">
          {category.map((item, idx) => (
            <Link
              to="/next"
              state={{
                product: product.filter((p1) => p1.category === item.category),
              }}
              key={idx}
              className="dropdown-item "
            >
              {item.category}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
