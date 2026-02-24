import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import "./Setupb.css";
import { Link } from "react-router-dom";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

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
      .get(`https://investly5.netlify.app/api/allocations/${userId}`)
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

  const HORIZON_YEARS = {
    Short: 2,
    Medium: 5,
    Long: 8,
  } as const;

  const calculateCompoundReturn = (
    principal: number,
    rate: number,
    years: number,
  ) => {
    return Math.round(principal * Math.pow(1 + rate / 100, years));
  };
  return (
    <>
      <div>
        <header className="homeHeader">
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
          <div className="mainContainera">
            <h2>Your Allocation History</h2>

            {data.length === 0 ? (
              <p>No allocations found</p>
            ) : (
              data.map((item) => (
                <div key={item._id} className="">
                  <div className="itemContainer">
                    <div className="itemBox">
                      <p className="itemName">
                        <b>Investment Amount</b>
                      </p>
                      <p className="pNumber">₹{item.investment_amount}</p>
                    </div>

                    <div className="itemBox">
                      <p className="itemName">
                        <b>Age</b>
                      </p>
                      <p className="pNumber">{item.age}</p>
                    </div>
                    <div className="itemBox">
                      <p className="itemName">
                        <b>Risk</b>
                      </p>
                      <p className="pNumber">{item.risk_appetite}</p>
                    </div>
                    <div className="itemBox">
                      <p className="itemName">
                        <b>Time Horizon</b>
                      </p>
                      <p className="pNumber">{item.horizon_category}</p>
                    </div>
                    <div className="itemBox">
                      <p className="itemName">
                        <b>Goal</b>
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
                      const years = HORIZON_YEARS[horizon];

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

                      // 🔹 YEARLY RETURNS
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

                      // 🔹 HORIZON (COMPOUND) RETURNS
                      const fdFinal = calculateCompoundReturn(
                        fdAmount,
                        RETURN_RATES.FD[horizon],
                        years,
                      );
                      const goldFinal = calculateCompoundReturn(
                        goldAmount,
                        RETURN_RATES.Gold[horizon],
                        years,
                      );
                      const stocksFinal = calculateCompoundReturn(
                        stocksAmount,
                        RETURN_RATES.Stocks[horizon],
                        years,
                      );
                      const mfFinal = calculateCompoundReturn(
                        mfAmount,
                        RETURN_RATES.MF[horizon],
                        years,
                      );

                      const totalFinalValue =
                        fdFinal + goldFinal + stocksFinal + mfFinal;

                      const totalHorizonProfit =
                        totalFinalValue - item.investment_amount;

                      const piedata: ChartData[] = [
                        {
                          name: "FDs",
                          value: item.allocation.fds_pct,
                          color: "#0088FE",
                        },
                        {
                          name: "Gold",
                          value: item.allocation.gold_pct,
                          color: "#FFBB28",
                        },
                        {
                          name: "Stocks",
                          value: item.allocation.stocks_pct,
                          color: "#00C49F",
                        },
                        {
                          name: "Mutual Funds",
                          value: item.allocation.mf_pct,
                          color: "#FF8042",
                        },
                      ];

                      return (
                        <>
                          <div className="bContainer">
                            <div className="listContainer">
                              <div className="minlistContainer">
                                <p className="itemName">
                                  <b>Recommended Asset Allocation</b>
                                </p>
                                {/* 🔹 ASSET BREAKDOWN */}
                                <ul className="ulList">
                                  <li className="liList">
                                    FDs: {item.allocation.fds_pct}% (₹{fdAmount}
                                    ) → ₹{fdReturn}
                                    <small>
                                      {" "}
                                      (Return: {RETURN_RATES.FD[horizon]}%)
                                    </small>
                                  </li>

                                  <li className="liList">
                                    Gold: {item.allocation.gold_pct}% (₹
                                    {goldAmount}) → ₹{goldReturn}
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
                                <div className="chatbotxzBox">
                                  <h3>Investly Wealth Assistant</h3>
                                  <p>
                                    Meet your personal financial strategist.
                                    Investly AI analyzes your risk appetite and
                                    horizon to provide real-time allocation
                                    advice, market insights, and tailored
                                    investment breakdowns to help you grow your
                                    wealth.
                                  </p>
                                  <Link to="/chatbot" className="chatbotxzBut">
                                    InvestIQ
                                  </Link>
                                </div>
                              </div>
                              <div className="minlistContainerb">
                                <PieChart width={300} height={300}>
                                  <Pie
                                    data={piedata}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60} // Makes it a Donut chart (cleaner look)
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                  >
                                    {piedata.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip
                                    formatter={(value) => `${value}%`}
                                    contentStyle={{
                                      borderRadius: "8px",
                                      border: "none",
                                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                    }}
                                  />
                                  <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                              </div>
                            </div>
                            {/* 🔹 SUMMARY */}
                            <div className="summaryContainer">
                              <div className="summaryBox">
                                <h2>Yearly Profit</h2>
                                <p>
                                  <b>Invested Amount:</b> ₹
                                  {item.investment_amount}
                                </p>
                                <p>
                                  <b>Profit (Yearly Profit):</b> ₹{totalProfit}
                                </p>
                                <p className="totalsummary">
                                  <b>Total Value:</b> ₹{totalReturnAmount}
                                </p>
                              </div>
                              <div className="summaryBox">
                                <h2>Total Profit ({years} Years)</h2>

                                <p>
                                  <b>Invested Amount:</b> ₹
                                  {item.investment_amount}
                                </p>

                                <p>
                                  <b>Total Profit:</b> ₹{totalHorizonProfit}
                                </p>

                                <p className="totalsummary">
                                  <b>Final Value After {years} Years:</b> ₹
                                  {totalFinalValue}
                                </p>
                              </div>
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
          </div>
        </main>
      </div>
    </>
  );
}
