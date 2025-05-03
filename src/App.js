import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./components/Home";
import Location from "./pages/Location";
import Next from "./slides/Next";
import NextOne from "./slides/NextOne";
import Cart from "./slides/Cart";
import { useEffect, useState } from "react";
import UserContext from "./slides/Context";
import Address from "./slides/Address";
import Payment from "./slides/Payment";
import CartPract from "./slides/CartPract";
import Search from "./components/Search";
import Thanks from "./slides/Thanks";
import MyOrders from "./components/MyOrders";

function App() {
  const [userId, setuserId] = useState(() => localStorage.getItem("userEmail"));

  const [total, setTotal] = useState(() => {
    const storedTotal = localStorage.getItem("total_amt");
    return storedTotal ? JSON.parse(storedTotal) : 0;
  });

  const [cart, setcart2] = useState(() => {
    const storedCart = localStorage.getItem("cart_value");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync total to localStorage
  useEffect(() => {
    localStorage.setItem("total_amt", JSON.stringify(total));
  }, [total]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart_value", JSON.stringify(cart));
  }, [cart]);


  return (
    <UserContext.Provider value={{ userId, setuserId, total, setTotal, cart, setcart2 }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/location" element={<Location />} />
            <Route path="/next" element={<Next />} />
            <Route path="/nextone" element={<NextOne />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/cart" element={<CartPract />} /> */}
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/search" element={<Search></Search>} />
            <Route path="/thanks" element={<Thanks></Thanks>} />
            <Route path="/myorders" element={<MyOrders></MyOrders>} />

          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
