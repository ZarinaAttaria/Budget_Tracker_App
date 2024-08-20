import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function BudgetPage() {
  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editEntryId, setEditEntryId] = useState(null);

  const token = localStorage.getItem("token");

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
      } catch (error) {
        alert(
          error.response?.data?.message || "Unable to get all budget entries"
        );
        console.error("Error in getting all budget Entries", error);
      }
    };
    fetchAllBudgetEntries();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/auth/update-budget/${editEntryId}`,
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

        alert("Budget updated successfully");
      } else {
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
      }

      setBudgetName("");
      setDate("");
      setAmount("");
      setIsEditing(false);
      setEditEntryId(null);

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
        } catch (error) {
          alert(
            error.response?.data?.message || "Unable to get all budget entries"
          );
          console.error("Error in getting all budget Entries", error);
        }
      };
      fetchAllBudgetEntries();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add/update budget");
      console.error("Error in adding/updating budget", error);
    }
  };

  const handleEdit = (entry) => {
    setBudgetName(entry.transactionName);
    setDate(entry.date.split("T")[0]); // Format date as YYYY-MM-DD
    setAmount(entry.amount);
    setIsEditing(true);
    setEditEntryId(entry._id);
  };

  const handleDelete = async (entryId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/auth/delete-budget/${entryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Budget Entry deleted successfully");

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
        } catch (error) {
          alert(
            error.response?.data?.message || "Unable to get all budget entries"
          );
          console.error("Error in getting all budget Entries", error);
        }
      };
      fetchAllBudgetEntries();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete budget");
      console.error("Error in deleting budget", error);
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
                <button onClick={() => handleEdit(b)}>Edit</button>
                <button onClick={() => handleDelete(b._id)}>Delete</button>
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
        <input type="submit" value={isEditing ? "Update" : "Add"} />
      </form>
    </>
  );
}

export default BudgetPage;
