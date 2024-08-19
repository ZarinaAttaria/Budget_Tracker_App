import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

function BudgetPage() {
  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  console.log("Token", token);
  useEffect(() => {
    const fetchAllBudgetEntries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/getAllBudget`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBudget(response.data.budgetEntries);

        console.log("Budget Entries", response.data.budgetEntries);
      } catch (error) {
        alert(
          error.response?.data?.message || "Unable to get all budget entries"
        );
        console.error("Error in getting all budget Entries", error);
      }
    };
    fetchAllBudgetEntries();
  }, [token, budgetName, date, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/add-budget`,
        {
          date,
          transactionName: budgetName,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Budget Added Successfully");
      console.log("Budget Added Successfully", response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add budget");
      console.error("Error in adding budget", error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((b) => (
            <tr key={b._id}>
              <td>{b.transactionName}</td>
              <td>{b.amount}</td>
              <td>{b.date}</td>
              <td>
                <button></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            placeholder="Name"
          />
        </label>
        <label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </label>
        <label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}

export default BudgetPage;
