import "./Index.css";
import Logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:2000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Login failed");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="index">
        <div className="container">
          <div className="boxa">
            <div className="minheader">
              <img src={Logo} alt="" className="logo" />
              <h1>INVESTLY</h1>
            </div>
            <div className="minBoxa">
              <h1>Login</h1>
              <p>Welcome Back!</p>
              <form onSubmit={handlelogin}>
                <input
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="inputField"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  name=""
                  id=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputField"
                  required
                />
                <a>forget password?</a>
                <button type="submit" className="logBut">
                  Log In
                </button>
              </form>
            </div>
          </div>
          <div className="boxb">
            <a href="" className="SignupBut">
              <Link to="/signup">Sign Up</Link>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
