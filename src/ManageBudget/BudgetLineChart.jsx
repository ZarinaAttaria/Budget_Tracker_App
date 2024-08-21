import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BudgetLineChart = ({ budgetEntries, budgetLimit }) => {
  const aggregatedData = budgetEntries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
    });
    if (acc[date]) {
      acc[date] += entry.amount;
    } else {
      acc[date] = entry.amount;
    }
    return acc;
  }, {});

  const labels = Object.keys(aggregatedData);
  const data = Object.values(aggregatedData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Budget Amount",
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Budget Limit",
        data: Array(labels.length).fill(budgetLimit),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderDash: [10, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Budget Entries Comparison",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default BudgetLineChart;
