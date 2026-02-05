import { useState } from "react";
import axios from "axios";
import "./Assests.css";
import { useNavigate } from "react-router-dom";

type Form = {
  investment_amount: string;
  age: string;
  risk_appetite: string;
  horizon_category: string;
  investment_goal: string;
};

type Allocation = Record<string, number>;

export default function Assests() {
  const [form, setForm] = useState<Form>({
    investment_amount: "",
    risk_appetite: "",
    horizon_category: "",
    age: "",
    investment_goal: "",
  });

  const [result, setResult] = useState<Allocation | null>(null);
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Predict
      const res = await axios.post("http://localhost:3000/api/predict", {
        ...form,
        investment_amount: Number(form.investment_amount),
        age: Number(form.age),
      });

      setResult(res.data.allocation);

      // 2️⃣ Save to DB
      await axios.post("http://localhost:3000/api/save-allocation", {
        userId: localStorage.getItem("userId"), // from login
        investment_amount: Number(form.investment_amount),
        age: Number(form.age),
        risk_appetite: form.risk_appetite,
        horizon_category: form.horizon_category,
        investment_goal: form.investment_goal,
        allocation: res.data.allocation,
      });
      navigate("/fianl-setup");
    } catch (err) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const LABEL_MAP: Record<string, string> = {
    fds_pct: "Fixed Deposits",
    gold_pct: "Gold",
    stocks_pct: "Stocks",
    mf_pct: "Mutual Funds",
  };

  return (
    <div>
      <header>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src="/logo.png" alt="Investly" className="headerLogo" />
          <h1 className="logoTitle">Investly</h1>
        </div>

        <div className="headerBox">
          {userEmail && (
            <h2 style={{ fontWeight: "600" }}>Welcome, {userEmail}</h2>
          )}
        </div>
      </header>
      <div className="world">
        <div className="containerx">
          <div className="inputContainer">
            <h2>Investment Allocation</h2>

            <form onSubmit={submitForm}>
              <label htmlFor="investment_amount">Investment Amount</label>
              <input
                type="number"
                name="investment_amount"
                placeholder="Investment Amount"
                value={form.investment_amount}
                onChange={handleChange}
                required
              />
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
              />

              <label htmlFor="risk_appetite">Risk Appetite</label>
              <select
                name="risk_appetite"
                value={form.risk_appetite}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Risk Appetite
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <label htmlFor="horizon_category">Time Horizon</label>
              <select
                name="horizon_category"
                value={form.horizon_category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Time Horizon
                </option>
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </select>

              <label htmlFor="investment_goal">Goal</label>
              <select
                name="investment_goal"
                value={form.investment_goal}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Goal
                </option>
                <option value="Education">Education</option>
                <option value="Growth">Growth</option>
                <option value="House">House</option>
                <option value="Retirement">Retirement</option>
              </select>

              <button type="submit">
                {loading ? "Predicting..." : "Get Allocation"}
              </button>
            </form>
          </div>
          {result && (
            <div className="results">
              <div className="minresult">
                <div>
                  <h3>Allocation Result (%)</h3>
                  <ul>
                    {Object.entries(result).map(([key, value]) => (
                      <li key={key}>
                        {LABEL_MAP[key] ?? key}: {value}%
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
