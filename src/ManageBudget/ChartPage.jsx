import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BudgetLineChart from "./BudgetLineChart";
import "./ChartPage.css";
const ChartPage = () => {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);

  useEffect(() => {
    const fetchBudgetEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/getAllBudget",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBudgetEntries(response.data.budgetEntries);
        setBudgetLimit(response.data.budgetLimit || 0);
      } catch (error) {
        toast.error("Unable to fetch budget entries");
        console.error("Error fetching budget entries", error);
      }
    };

    fetchBudgetEntries();
  }, []);

  return (
    <div className="budgetChartMainContainer">
      <div className="budgetChartContainer">
        <h2>Budget Analytics</h2>

        <BudgetLineChart
          budgetEntries={budgetEntries}
          budgetLimit={budgetLimit}
        />
      </div>
    </div>
  );
};

export default ChartPage;
