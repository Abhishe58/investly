import "./Index.css";
import Logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Login failed");
      } else {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userName", data.name);

        navigate("/setup");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={Logo} alt="Investly" className="headerLogo" />
          <h1 className="logoTitle">Investly</h1>
        </div>

        <div className="headerBox">
          <Link to="/login" className="logButx" style={{ color: "white" }}>
            Login
          </Link>

          <Link to="/signup" className="logButxb">
            Signup
          </Link>
        </div>
      </header>
      <div className="index">
        <div className="container">
          <div className="boxa">
            <div className="minBoxa">
              <h1>Login</h1>
              <form onSubmit={handlelogin} className="loginForm">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="loginputField"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="loginputField"
                  required
                />
                <a>forget password?</a>
                <button type="submit" className="logBut">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="boxb">
            <div className="contentContainer">
              <h1>Welcome Back, Investor</h1>
              <h2> Your money is working hard—see how it’s doing</h2>
              <p>
                Log in to access your dashboard, track your real-time portfolio
                growth, and review your latest goal progress. Stay on top of
                your financial journey and make adjustments whenever you need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
