import { useEffect, useState } from "react";
import axios from "axios";
import "./Setupb.css";

type Allocation = {
  _id: string;
  investment_amount: number;
  age: number;
  risk_appetite: string;
  horizon_category: string;
  investment_goal: string;
  allocation: {
    fds_pct: number;
    gold_pct: number;
    stocks_pct: number;
    mf_pct: number;
  };
  createdAt: string;
};

export default function Setupb() {
  const [data, setData] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3000/api/allocations/${userId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        alert("Failed to load data");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const calculateAmount = (total: number, percent: number) => {
    return Math.round((total * percent) / 100);
  };

  if (loading) return <p>Loading...</p>;

  const RETURN_RATES = {
    FD: {
      Short: 6.5,
      Medium: 6.8,
      Long: 6.5,
    },
    Gold: {
      Short: 9,
      Medium: 10,
      Long: 9,
    },
    MF: {
      Short: 10,
      Medium: 12.5,
      Long: 13.5,
    },
    Stocks: {
      Short: 13,
      Medium: 12.88,
      Long: 12.9,
    },
  };
  const calculateReturnAmount = (principal: number, rate: number) => {
    return Math.round(principal + (principal * rate) / 100);
  };

  return (
    <>
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
            {userName && (
              <h2 style={{ fontWeight: "600" }}>Welcome, {userName}</h2>
            )}
          </div>
        </header>
        <main>
          <h3 style={{ marginTop: "15px" }}>Your Allocation History</h3>

          {data.length === 0 ? (
            <p>No allocations found</p>
          ) : (
            data.map((item) => (
              <div key={item._id} className="">
                <div className="itemContainer">
                  <div className="itemBox">
                    <p className="itemName">
                      <b>Investment Amount:</b>
                    </p>
                    <p className="pNumber">₹{item.investment_amount}</p>
                  </div>

                  <div className="itemBox">
                    <p className="itemName">
                      <b>Age:</b>
                    </p>
                    <p className="pNumber">{item.age}</p>
                  </div>
                  <div className="itemBox">
                    <p className="itemName">
                      <b>Risk:</b>
                    </p>
                    <p className="pNumber">{item.risk_appetite}</p>
                  </div>
                  <div className="itemBox">
                    <p className="itemName">
                      <b>Time Horizon:</b>
                    </p>
                    <p className="pNumber">{item.horizon_category}</p>
                  </div>
                  <div className="itemBox">
                    <p className="itemName">
                      <b>Goal:</b>
                    </p>
                    <p className="pNumber">{item.investment_goal}</p>
                  </div>
                </div>

                <div className="itemBoxb">
                  {(() => {
                    const horizon = item.horizon_category as
                      | "Short"
                      | "Medium"
                      | "Long";

                    const fdAmount = calculateAmount(
                      item.investment_amount,
                      item.allocation.fds_pct,
                    );
                    const goldAmount = calculateAmount(
                      item.investment_amount,
                      item.allocation.gold_pct,
                    );
                    const stocksAmount = calculateAmount(
                      item.investment_amount,
                      item.allocation.stocks_pct,
                    );
                    const mfAmount = calculateAmount(
                      item.investment_amount,
                      item.allocation.mf_pct,
                    );

                    const fdReturn = calculateReturnAmount(
                      fdAmount,
                      RETURN_RATES.FD[horizon],
                    );
                    const goldReturn = calculateReturnAmount(
                      goldAmount,
                      RETURN_RATES.Gold[horizon],
                    );
                    const stocksReturn = calculateReturnAmount(
                      stocksAmount,
                      RETURN_RATES.Stocks[horizon],
                    );
                    const mfReturn = calculateReturnAmount(
                      mfAmount,
                      RETURN_RATES.MF[horizon],
                    );

                    const totalReturnAmount =
                      fdReturn + goldReturn + stocksReturn + mfReturn;

                    const totalProfit =
                      totalReturnAmount - item.investment_amount;

                    return (
                      <>
                        <div className="bContainer">
                          <div className="listContainer">
                            <p className="itemName">
                              <b>Recommended Asset Allocation</b>
                            </p>
                            {/* 🔹 ASSET BREAKDOWN */}
                            <ul className="ulList">
                              <li className="liList">
                                FDs: {item.allocation.fds_pct}% (₹{fdAmount}) →
                                ₹{fdReturn}
                                <small>
                                  {" "}
                                  (Return: {RETURN_RATES.FD[horizon]}%)
                                </small>
                              </li>

                              <li className="liList">
                                Gold: {item.allocation.gold_pct}% (₹{goldAmount}
                                ) → ₹{goldReturn}
                                <small>
                                  {" "}
                                  (Return: {RETURN_RATES.Gold[horizon]}%)
                                </small>
                              </li>

                              <li className="liList">
                                Stocks: {item.allocation.stocks_pct}% (₹
                                {stocksAmount}) → ₹{stocksReturn}
                                <small>
                                  {" "}
                                  (Return: {RETURN_RATES.Stocks[horizon]}%)
                                </small>
                              </li>

                              <li className="liList">
                                Mutual Funds: {item.allocation.mf_pct}% (₹
                                {mfAmount}) → ₹{mfReturn}
                                <small>
                                  {" "}
                                  (Return: {RETURN_RATES.MF[horizon]}%)
                                </small>
                              </li>
                            </ul>
                          </div>
                          {/* 🔹 SUMMARY */}
                          <div className="summaryBox">
                            <p>
                              <b>Invested Amount:</b> ₹{item.investment_amount}
                            </p>
                            <p>
                              <b>Profit:</b> ₹{totalProfit}
                            </p>
                            <p style={{ color: "slateblue" }}>
                              <b>Total Value:</b> ₹{totalReturnAmount}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* <small>{new Date(item.createdAt).toLocaleString()}</small> */}
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}
