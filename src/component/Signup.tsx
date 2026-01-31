import "./Index.css";
import Logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:2000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Signup failed");
      } else {
        alert(data.message);
        navigate("/");
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
              <h1>Sign Up</h1>
              <p>Welcome Back!</p>
              <form onSubmit={handleSignup}>
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
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="boxb">
            <Link to="/" className="SignupBut">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
