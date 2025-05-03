import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./pay.css";

export default function Next() {
  const location = useLocation();
  const { product } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Header />

      <div id="next" className="text-center text-white py-4">
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700" }}>Results:</h1>

        <div className="d-flex flex-wrap justify-content-center mt-4 px-3">
          {product.length > 0 ? (
            product.map((item, index) => (
              <motion.div
                className="card"
                style={{
                  width: "18rem",
                  margin: "15px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                }}
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${item.image?.[0]}`}
                  className="card-img-top"
                  alt={item.product}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    backgroundColor: "#262626",
                    padding: "10px",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.product}</h5>
                  <h6 className="text-success">Rs. {item.price}</h6>
                  <p
                    className="mb-1"
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      borderRadius: "5px",
                      padding: "2px 6px",
                      display: "inline-block",
                      fontWeight: "600",
                    }}
                  >
                    {item.discount} Off
                  </p>
                  <p
                    style={{
                      color: item.avail === "In Stock" ? "#4caf50" : "#f44336",
                      fontWeight: "bold",
                    }}
                  >
                    {item.avail}
                  </p>

                  <Link
                    to="/nextone"
                    state={{
                      product: product.filter((p2) => p2.product === item.product),
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "25px",
                        padding: "8px 20px",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                    >
                      More Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <h3 className="mt-4 text-light">No result found 🙂</h3>
          )}
        </div>
      </div>

      <Footer />
      <Footer2 />
    </div>
  );
}
