import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/my-order`,
          { withCredentials: true }
        );
        setOrder(response.data);
      } catch (err) {
        if (err.response && err.response.status === 500) {
          alert(err.response.data?.message || "Bad request");
        } else {
          alert(err.message);
        }
      }
    };
    fetchapi();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return { bg: "#2c5282", text: "#bee3f8" };
      case "Shipped":
        return { bg: "#805ad5", text: "#e9d8fd" };
      case "Delivered":
        return { bg: "#276749", text: "#c6f6d5" };
      default:
        return { bg: "#4a5568", text: "#e2e8f0" };
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", color: "#edf2f7" }}>
      <Header />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
            color:'black',
          }}
        >
          My Orders
        </h2>

        {order.length === 0 ? (
          <p style={{ textAlign: "center", color: "#a0aec0" }}>
            No orders found.
          </p>
        ) : (
          order.map((item, index) => {
            const statusColor = getStatusColor(item.status);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  backgroundColor: "#2d3748",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  border: "1px solid #4a5568",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                    {item.name}
                  </h3>
                  <span
                    style={{
                      padding: "6px 14px",
                      fontSize: "0.875rem",
                      borderRadius: "999px",
                      backgroundColor: statusColor.bg,
                      color: statusColor.text,
                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <p style={{ color: "#cbd5e0", marginBottom: "0.4rem" }}>
                  <strong>Items:</strong> {item.item.join(", ")}
                </p>
                <p style={{ color: "#cbd5e0" }}>
                  <strong>Total Price:</strong> ₹{item.price}
                </p>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
