import { useEffect, useState } from "react";
import "./Landing.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [result, setResult] = useState("");

  const calestimate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const P = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(duration);
    const n = parseFloat(frequency);

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      setResult("Please fill all fields correctly.");
      return;
    }

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const futureValue = P * Math.pow(1 + r / n, n * t);

    // Update result state
    setResult(`Estimated Value after ${t} years: ₹${futureValue.toFixed(2)}`);
  };

  const containerVarient = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // If page already loaded (important!)
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const getStarted = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("Our team is working on it. Please stay tuned.");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="loader">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              Investly
            </motion.h1>
            <div className="loadBox">
              <div className="loaderCon"></div>
            </div>
          </div>
        ) : (
          <div>
            <motion.header
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img src="/logo.png" alt="" className="logo" />
                <h1 className="logoTitle">Investly</h1>
              </div>

              <div className="ctaBut">
                <Link to="/login" className="alink">
                  Get Started
                </Link>
              </div>
            </motion.header>
            <section className="HeroSection">
              <div className="heroBox">
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#111",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="heroTag"
                >
                  Strategic
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#111",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="heroTag"
                >
                  Secure
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#111",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="heroTag"
                >
                  Simplified
                </motion.p>
              </div>
              <h1 className="heroPera">
                <motion.span
                  initial={{ x: -200 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  style={{ display: "inline-block" }}
                >
                  Smart Investing
                </motion.span>{" "}
                <motion.span
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  style={{ display: "inline-block" }}
                >
                  Zero Confusion
                </motion.span>
              </h1>
              <motion.p
                className="heroPera"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 10 }}
              >
                Turn overwhelming market options into one clear, goal-based plan
                tailored to you
              </motion.p>
              <motion.p
                className="heroPerb"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Investly eliminates beginner's analysis paralysis by filtering
                thousands of options into unbiased, data-driven recommendations.
                We align your budget and risk with your real-life goals for
                confident, stress-free decision-making.
              </motion.p>
              <motion.div
                className="heroBox"
                variants={containerVarient}
                initial="hidden"
                animate="show"
              >
                <motion.div className="ctaBut" variants={itemVariants}>
                  <a href="" className="alink" onClick={getStarted}>
                    Get Started
                  </a>
                </motion.div>
                <motion.a
                  href="#tryit"
                  className="ctaButb"
                  variants={itemVariants}
                >
                  Try it
                </motion.a>
              </motion.div>
            </section>
            <section className="AboutSection">
              <div className="aboutcona">
                <h1>Our Mission: Clarity in a Crowded Market</h1>
                <p>
                  At Investly, we believe investing shouldn’t be a guessing
                  game. We were built to solve the "analysis paralysis" that
                  stops beginners from starting. Instead of overwhelming you
                  with endless choices, we use unbiased, data-driven algorithms
                  to curate options that specifically match your budget and risk
                  tolerance. We don’t sell financial products; we provide
                  clarity. Our goal is simple: to transform your financial
                  dreams into a concrete, actionable roadmap you can trust.
                </p>
              </div>
              <div className="aboutconb">
                <div className="minaboutbox">
                  <div className="wrapBox">
                    <p className="aboutconbpe">Zero Confusion</p>
                    <p className="aboutconbpe">Smart Suggestions</p>
                    <p className="aboutconbpe">Beginner Friendly</p>
                    <p className="aboutconbpe">Goal-Based Plans</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="estimatecostContainer" id="tryit">
              <div className="estContainer">
                <h1>Visualize Your Future Wealth</h1>
                <form onSubmit={calestimate} className="landForm">
                  <div className="xform">
                    <div className="inputBox">
                      <label htmlFor="amount">Investment Amount (₹)</label>
                      <input
                        type="number"
                        id="amount"
                        placeholder="Enter Amount (eg. ₹50000)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="inputField"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <label htmlFor="rate">
                        Expected Annual Rate of Return (%)
                      </label>
                      <input
                        type="number"
                        id="rate"
                        placeholder="Enter Rate (eg. 5)"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="inputField"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <label htmlFor="year">Investment Duration (Years)</label>
                      <input
                        type="number"
                        id="year"
                        placeholder="Enter Years (eg. 8)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="inputField"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <label htmlFor="fre">Compounding Frequency</label>
                      <select
                        name=""
                        id="fre"
                        className="inputField"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        required
                      >
                        <option style={{ color: "black" }} value="1">
                          Yearly
                        </option>
                        <option style={{ color: "black" }} value="4">
                          Quarterly
                        </option>
                        <option style={{ color: "black" }} value="12">
                          Monthly
                        </option>
                      </select>
                    </div>
                  </div>

                  <button className="subBut" type="submit">
                    See My Future Wealth
                  </button>
                  {result && (
                    <div id="result" className="estimateResult">
                      {result}
                    </div>
                  )}
                </form>
              </div>
              <div className="predictContainer">
                <div className="minpredictContainer">
                  <h1>Get Your Instant Investment Blueprint Description</h1>
                  <p>
                    Stop guessing where to invest. Simply select your risk
                    comfort level, and our system will instantly build a custom
                    portfolio blueprint. Get a precise, data-backed breakdown of
                    stocks, FDs, and funds perfectly aligned with your financial
                    goals for maximum growth.
                  </p>
                  <a
                    href="https://investly001.pythonanywhere.com/"
                    target="_blank"
                    className="allcoteBut"
                  >
                    Reveal My Allocation
                  </a>
                </div>
              </div>
            </section>
            <section className="problemContainer">
              <h1>Too Many Options. Too Little Guidance.</h1>
              <div className="scrollSection">
                <div className="stickyWrapper">
                  <div className="scrollProblemContainer">
                    <div className="problemBox">
                      <img src="/1.png" alt="" className="problemImg" />
                      <p className="problemTitle">Too Many Choices</p>
                      <p className="problemDes">
                        Stocks, crypto, mutual funds, FDs, real estate — it’s
                        hard to know where to start.
                      </p>
                    </div>
                    <div className="problemBox">
                      <img src="/2.png" alt="" className="problemImg" />
                      <p className="problemTitle">Confusing Jargon</p>
                      <p className="problemDes">
                        Terms like CAGR, NAV, P/E ratio, and compounding scare
                        beginners away.
                      </p>
                    </div>
                    <div className="problemBox">
                      <img src="/3.png" alt="" className="problemImg" />
                      <p className="problemTitle">Biased Advice</p>
                      <p className="problemDes">
                        Many platforms push their own products instead of giving
                        unbiased recommendations.
                      </p>
                    </div>
                    <div className="problemBox">
                      <img src="/4.png" alt="" className="problemImg" />
                      <p className="problemTitle">Fear of Loss</p>
                      <p className="problemDes">
                        New investors worry about losing money because they
                        don’t understand risk management.
                      </p>
                    </div>
                    <div className="problemBox">
                      <img src="/5.png" alt="" className="problemImg" />
                      <p className="problemTitle">Time-Consuming Research</p>
                      <p className="problemDes">
                        Analyzing markets, comparing assets, and tracking
                        portfolios takes too much effort.
                      </p>
                    </div>
                    <div className="problemBox">
                      <img src="/6.png" alt="" className="problemImg" />
                      <p className="problemTitle">No Clear Goal Alignment</p>
                      <p className="problemDes">
                        People often invest randomly without a clear financial
                        plan, leading to poor returns.
                      </p>
                    </div>
                    <div className="problemBox">
                      <img src="/7.webp" alt="" className="problemImg" />
                      <p className="problemTitle">Trust Issues</p>
                      <p className="problemDes">
                        Not knowing if a platform is secure or compliant makes
                        people hesitant to try.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="featureContainer">
              <h1>Our Features</h1>
              <div className="featureBox">
                <div className="featureboxa">
                  <p className="featureTitle">AI-Powered Suggestions</p>
                  <p>
                    Personalized recommendations based on your goals and risk
                    profile.
                  </p>
                </div>
                <div className="featureboxa">
                  <p className="featureTitle">Goal Tracking</p>
                  <p>See your investments grow toward your objectives.</p>
                </div>
                <div className="featureboxa">
                  <p className="featureTitle">Multi-Asset Support</p>
                  <p>Stocks, crypto, mutual funds, FDs, real estate.</p>
                </div>
                <div className="featureboxa">
                  <p className="featureTitle">Interactive Dashboard</p>
                  <p>Track, visualize, and simulate growth.</p>
                </div>
                <div className="featureboxa">
                  <p className="featureTitle">Smart Alerts</p>
                  <p>Stay informed with timely insights.</p>
                </div>
              </div>
            </section>
            <footer>
              <p>© 2025 Investly. All rights reserved.</p>
              <p>
                Disclaimer: Investly provides AI-powered suggestions.
                Investments are subject to market risks.
              </p>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
