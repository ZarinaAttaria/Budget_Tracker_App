import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BudgetLineChart from "./BudgetLineChart";
import "./ChartPage.css";

const ChartPage = () => {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [filter, setFilter] = useState("lastMonth");

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
        const filteredData = filterData(response.data.budgetEntries, filter);
        setBudgetEntries(filteredData);
        setBudgetLimit(response.data.budgetLimit || 0);
      } catch (error) {
        toast.error("Unable to fetch budget entries");
        console.error("Error fetching budget entries", error);
      }
    };

    fetchBudgetEntries();
  }, [filter]);

  const filterData = (data, filter) => {
    const now = new Date();
    let filteredData = [];

    switch (filter) {
      case "lastMonth":
        filteredData = data.filter(
          (entry) =>
            new Date(entry.date) > new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case "last6Months":
        filteredData = data.filter(
          (entry) =>
            new Date(entry.date) > new Date(now.setMonth(now.getMonth() - 6))
        );
        break;
      case "last12Months":
        filteredData = data.filter(
          (entry) =>
            new Date(entry.date) > new Date(now.setMonth(now.getMonth() - 12))
        );
        break;
      default:
        filteredData = data;
    }

    return filteredData;
  };

  return (
    <div className="budgetChartMainContainer">
      <div className="budgetChartContainer">
        <h2>Budget Analytics</h2>
        <div className="filterOptions">
          <p onClick={() => setFilter("lastMonth")}>Last Month</p>
          <p onClick={() => setFilter("last6Months")}>Last 6 Months</p>
          <p onClick={() => setFilter("last12Months")}>Last 12 Months</p>
        </div>

        <BudgetLineChart
          budgetEntries={budgetEntries}
          budgetLimit={budgetLimit}
        />
      </div>
    </div>
  );
};

export default ChartPage;
