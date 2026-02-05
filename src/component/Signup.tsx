import "./Index.css";
import Logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Signup failed");
      } else {
        navigate("/login");
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
              <h1>Signup</h1>
              <form onSubmit={handleSignup} className="loginForm">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="loginputField"
                  required
                />
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
                  Signup
                </button>
              </form>
            </div>
          </div>
          <div className="boxb">
            <div className="contentContainer">
              <h1>Start Your Financial Journey</h1>
              <h2>
                Join thousands making smarter, data-driven decisions today.
              </h2>
              <p>
                Create your free account to unlock unbiased investment plans
                tailored specifically to your budget. It only takes a minute to
                set your goals and receive a clear, personalized roadmap for
                your wealth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
