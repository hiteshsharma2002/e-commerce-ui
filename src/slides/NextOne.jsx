import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./Context";
import { motion } from "framer-motion";

export default function NextOne() {
  const location = useLocation();
  const { product } = location.state || {};
  const { userId, setTotal, setcart2 } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const item = product[0];
  const [selectedImage, setSelectedImage] = useState(item.image[0]);

  const handlebtn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/cart-items`,
        {
          product: item.product,
          price: item.price,
          discount: item.discount,
          avail: item.avail,
          image: selectedImage,
          email: userId,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert(res.data.message);
        navigate("/cart");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handlebuy = () => {
    setTotal(item.price);
    setcart2("1");
    navigate("/payment", { state: { item: item.product } });
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Header />

      <motion.div
        className="container-fluid py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="row p-3 shadow-lg"
          style={{
            borderRadius: "15px",
            background: "#1e1e1e",
            color: "#fff",
          }}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Image */}
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}${selectedImage}`}
              alt=""
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                borderRadius: "10px",
                backgroundColor: "#262626",
              }}
            />
          </motion.div>

          {/* Details */}
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12 pt-4 ps-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="fw-bold mb-3" style={{ color: "#fff" }}>
              {item.product}
            </h1>
            <h4 className="fw-semibold mb-2 text-success">Rs. {item.price}</h4>
            <h5 className="mb-2 text-light">
              <span className="text-danger">Description:</span>{" "}
              <span style={{ fontWeight: "normal", fontSize: "15px" }}>
                {item.desc}
              </span>
            </h5>
            <h6
              className="mb-2 px-3 py-1 rounded"
              style={{
                backgroundColor: "#ff9800",
                display: "inline-block",
                fontWeight: "600",
              }}
            >
              {item.discount}
            </h6>
            <h5
              className="mt-2"
              style={{
                color: item.avail === "In Stock" ? "#4caf50" : "#f44336",
                fontWeight: "bold",
              }}
            >
              {item.avail}
            </h5>

            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlebtn}
                className="me-3"
                disabled={item.avail !== "In Stock"}
                style={{
                  backgroundColor: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  padding: "10px 25px",
                  cursor: item.avail === "In Stock" ? "pointer" : "not-allowed",
                }}
              >
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlebuy}
                disabled={item.avail !== "In Stock"}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  padding: "10px 25px",
                  cursor: item.avail === "In Stock" ? "pointer" : "not-allowed",
                }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="col-12 mt-4 d-flex flex-wrap">
            {item.image.map((pic, index) => (
              <motion.img
                key={index}
                src={`${process.env.REACT_APP_API_BASE_URL}${pic}`}
                alt=""
                onClick={() => setSelectedImage(pic)}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  border:
                    selectedImage === pic
                      ? "3px solid #4caf50"
                      : "1px solid #555",
                  cursor: "pointer",
                  backgroundColor: "#262626",
                  padding: "3px",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
