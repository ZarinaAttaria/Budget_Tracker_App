import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BudgetLineChart from "./BudgetLineChart";
import dayjs from "dayjs";
import { startOfMonth, subMonths, endOfMonth, format } from "date-fns";
import "./ChartPage.css";

const ChartPage = ({ isAddBudget, isEditing }) => {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [filter, setFilter] = useState("currentMonth");

  useEffect(() => {
    const fetchBudgetEntries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/getAllBudget` ||
            "/api/auth/getAllBudget",
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
  }, [filter, isAddBudget, isEditing]);

  const filterData = (data, filter) => {
    const today = new Date();
    let startDate;

    switch (filter) {
      case "lastMonth":
        startDate = startOfMonth(subMonths(today, 1));
        break;
      case "last6Months":
        startDate = startOfMonth(subMonths(today, 6));
        break;
      case "last12Months":
        startDate = startOfMonth(subMonths(today, 12));
        break;
      case "currentMonth":
      default:
        startDate = startOfMonth(today);
        break;
    }

    const filteredData = data
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endOfMonth(today);
      })
      .map((entry) => ({
        ...entry,
        date: format(new Date(entry.date), "yyyy-MM-dd"),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return filteredData;
  };

  return (
    <div className="budgetChartMainContainer">
      <div className="budgetChartContainer">
        <h2 className="budgetAnalyticsHeading">Budget Analytics</h2>
        <div className="filterOptions">
          <p
            className={`filterOption ${
              filter === "lastMonth" ? "activeFilter" : ""
            }`}
            onClick={() => setFilter("lastMonth")}
          >
            LAST MONTH
          </p>
          <p
            className={`filterOption ${
              filter === "last6Months" ? "activeFilter" : ""
            }`}
            onClick={() => setFilter("last6Months")}
          >
            LAST 6 MONTHS
          </p>
          <p
            className={`filterOption ${
              filter === "last12Months" ? "activeFilter" : ""
            }`}
            onClick={() => setFilter("last12Months")}
          >
            LAST 12 MONTHS
          </p>
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
