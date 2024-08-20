import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./BudgetPage.css";

function BudgetPage() {
  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [entryId, setEntryId] = useState("");
  const [filteredBudget, setFilteredBudget] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [isAddBudget, setIsAddBudget] = useState(false);
  const token = localStorage.getItem("token");

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
      setFilteredBudget(response.data.budgetEntries);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to get all budget entries"
      );
      console.error("Error in getting all budget entries", error);
    }
  };

  useEffect(() => {
    fetchAllBudgetEntries();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:3000/api/auth/update-budget/${entryId}`,
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
        toast.success(response.data.message || "Budget Updated Successfully");
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
        toast.success(response.data.message || "Budget Added Successfully");
      }
      setBudgetName("");
      setDate("");
      setAmount("");
      setIsEditing(false);
      setEntryId(null);

      fetchAllBudgetEntries();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to add/update budget"
      );
      console.error("Error in adding/updating budget", error);
    }
  };

  const handleEdit = (entry) => {
    setBudgetName(entry.transactionName);
    setDate(entry.date.split("T")[0]);
    setAmount(entry.amount);
    setIsEditing(true);
    setEntryId(entry._id);
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/auth/delete-budget/${entryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        response.data.message || "Budget Entry Deleted Successfully"
      );

      fetchAllBudgetEntries();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to delete budget entry"
      );
      console.error("Error in deleting budget entry", error);
    }
  };

  const handleFilterByDate = (e) => {
    e.preventDefault();
    if (filterDate) {
      const filterByDate = budget.filter(
        (b) => b.date.split("T")[0] === filterDate
      );
      setFilteredBudget(filterByDate);
    } else {
      setFilteredBudget(budget);
    }
  };
  const toggleAddBudget = () => {
    setIsAddBudget(!isAddBudget);
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="mainBugetContainer">
        <div className="budgetContainer1">
          <div className="budgetContainerTop">
            <form onSubmit={handleFilterByDate}>
              <label>
                <input
                  type="text"
                  className="dateInput"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  placeholder="Filter By Date"
                />
              </label>

              <input
                type="submit"
                value="Filter Records"
                className="filterRecordButton"
              />
            </form>
            <button onClick={toggleAddBudget} className="addBtn">
              Add Budget
            </button>
          </div>

          <table className="budgetTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBudget.map((b) => (
                <tr key={b._id}>
                  <td>{b.transactionName}</td>
                  <td>{b.amount}</td>
                  <td>{b.date.split("T")[0]}</td>
                  <td>
                    <button onClick={() => handleEdit(b)}>Edit</button>
                    <button onClick={() => handleDelete(b._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddBudget && (
        <>
          <div className="darkBackground" onClick={toggleAddBudget}></div>
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="addFormContainer">
                <h2>Add Budget</h2>
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
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default BudgetPage;
