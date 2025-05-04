import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "./Context";
import { motion } from "framer-motion";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { total, setTotal, setcart2 } = useContext(UserContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/cart-details`,
          {
            withCredentials: true,
          }
        );
        const dataWithQuantities = (Array.isArray(response.data) ? response.data : []).map(
          (item) => ({
            ...item,
            quantity: 1,
          })
        );
        setCart(dataWithQuantities);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setError(err.response.data.message);
        }
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = (index, type) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        const newQty = type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
  };

  useEffect(() => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(totalAmount);
    setcart2(totalItems);
  }, [cart, setTotal, setcart2]);

  const handleCheckout = () => {
    const item = cart.map((item) => item.product);
    navigate("/payment", { state: { item } });
  };

  const handleRemove = async (index, itemId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/cart-remove`,
        { id: itemId },
        { withCredentials: true }
      );
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <div className="container-fluid mt-5 bg-black pt-4">
        <h2 className="mb-4 text-center text-light">🛒 Your Shopping Cart</h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {cart.length === 0 ? (
          <motion.p
            className="text-center text-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Shopping Cart is empty
          </motion.p>
        ) : (
          <div className="d-flex flex-column gap-4">
            {cart.map((item, index) => (
              <motion.div
                className="card shadow-sm p-3"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="row g-3 align-items-center">
                  {/* Product Image */}
                  <div className="col-md-3 text-center">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/${item.image}`}
                      className="img-fluid"
                      alt={item.product}
                      style={{ maxHeight: "180px", objectFit: "contain" }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="col-md-9">
                    <h5 className="mb-2 text-success fw-bolder">{item.product}</h5>
                    <p className="mb-1">
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <p className="mb-1">
                      <strong>Discount:</strong> {item.discount}
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong>{" "}
                      <span className={item.avail ? "text-success" : "text-danger"}>
                        {item.avail ? "Available" : "Out of Stock"}
                      </span>
                    </p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center justify-content-end mt-2">
                      <button
                        onClick={() => handleQuantityChange(index, "minus")}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        -
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, "plus")}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => handleRemove(index, item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Total and Checkout */}
            <motion.div
              className="text-end mt-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-light">Total: ₹{totalAmount}</h4>
              <button className="btn btn-danger mt-3" onClick={handleCheckout}>
                Checkout
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
