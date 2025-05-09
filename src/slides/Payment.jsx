import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./pay.css";
import UserContext from "./Context";

export default function Payment() {
  const [address, setAddress] = useState([]);
  const [order, setOrder] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  // const { totalamt } = location.state || {};
  const { total, cart } = useContext(UserContext);

  const { item } = location.state || {};

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/fetch-address`,
          {
            withCredentials: true,
          }
        );
        setAddress(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchapi();
  }, []);

  const handlepay = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user/create-order`,
      {
        total,
        withCredentials: true,
      }
    );

    const order = response.data;
    const options = {
      key: "rzp_test_CI5gswkwy2BW99",
      amount: order.amount,
      currency: "INR",
      name: "ECommerce",
      description: "Test Transaction",
      order_id: order.id,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleorder = () => {

    const fetchorder=async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/orders`, { name:address[0]?.name,price:total,item:item,street:address[0]?.street,city:address[0]?.city,state:address[0]?.state,zip:address[0]?.zip }, {
          withCredentials:true
        })
        setOrder(res.data);
        navigate('/thanks');
  
      }
      catch (err) {
        console.log(err.message);
      }


    }
    fetchorder();

  }

  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2c2d34",
            marginBottom: "30px",
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          Checkout
        </h2>

        {address.length > 0 ? (
          address.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderLeft: "6px solid red",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#f8fdf8",
                transition: "all 0.3s ease",
              }}
            >
              <h3 style={{ color: "#dc3545", marginBottom: "10px" }}>
                Delivering to, {item.name}
              </h3>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                Address:- {item.street}, {item.city}
              </p>
              <p style={{ margin: "5px 0" }}>
                {item.state} - {item.zip}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#dc3545", textAlign: "center" }}>
            No address found. Please add one!
          </p>
        )}

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/address">
            <button
              style={{
                padding: "12px 25px",
                backgroundColor: "#2c2d34",
                color: "#fff",
                fontSize: "16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              ➕ Add New Address
            </button>
          </Link>
        </div>

        <div className="container pay-cont">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-sm-12 col-12 price text-start">
              <h4>Price Details</h4>

              <div className="price-line">
                <span>Items:</span>
                {cart}
              </div>

              <div className="price-line">
                <span>Delivery:</span>
                <span>
                  <del>₹110</del> Free
                </span>
              </div>

              <div className="price-line">
                <span>Promotion Applied:</span>
                <span>--</span>
              </div>

              <div className="price-line total">
                <strong>Total:</strong>
                <strong>₹{total}</strong>
              </div>
            </div>

            <div className="col-lg-8 col-md-8 col-sm-12 col-12 pay">
              <h3>Select Payment Method</h3>
              {address.length > 0 ? (
                <div>
                  <label style={{ display: "block", marginBottom: "10px" }}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />{" "}
                    Cash On Delivery
                  </label>

                  <label style={{ display: "block", marginBottom: "10px" }}>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />{" "}
                    Pay Online
                  </label>

                  {paymentMethod === "online" && (
                    <button
                      onClick={handlepay}
                      style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Pay Now
                    </button>
                  )}

                  {paymentMethod === "cod" && (
                    <div>
                      <Link to="/thanks">
                        <button
                          onClick={handleorder}
                          style={{
                            height: "40px",
                            width: "120px",
                            border: "none",
                            backgroundColor: "green",
                            color: "white",
                            marginTop: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          Order
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ color: "white", textAlign: "center" }}>
                  No address found. Please add one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
