import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./BudgetPage.css";
import ChartPage from "./ChartPage";

function BudgetPage() {
  const [budget, setBudget] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [entryId, setEntryId] = useState("");
  const [filteredBudget, setFilteredBudget] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [filterDate, setFilterDate] = useState(today);
  const [isAddBudget, setIsAddBudget] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);

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
    setIsAddBudget(!isAddBudget);

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
      setCurrentPage(1);
    } else {
      setFilteredBudget(budget);
      setCurrentPage(1);
    }
  };

  const toggleAddBudget = () => {
    setIsAddBudget(!isAddBudget);
    if (!isAddBudget) {
      setBudgetName("");
      setDate("");
      setAmount("");
      setIsEditing(false);
      setEntryId("");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const currentRows = filteredBudget.slice(0, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredBudget.length / rowsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
                  type="date"
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
              {currentRows.map((b) => (
                <tr key={b._id}>
                  <td>{b.transactionName}</td>
                  <td>{b.amount}</td>
                  <td>{b.date.split("T")[0]}</td>
                  <td>
                    <img src="edit.png" onClick={() => handleEdit(b)} />
                    <img
                      src="delete.png"
                      className="icons"
                      onClick={() => handleDelete(b._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paginationControls">
            <img
              src="previous.png"
              onClick={handlePreviousPage}
              className={`paginationButton icons ${
                currentPage === 1 ? "disabled" : ""
              }`}
            />

            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="paginationSelect"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>

              <option value={10}>10</option>
            </select>

            <img
              src="next.png"
              onClick={handleNextPage}
              className={`paginationButton icons ${
                currentPage >= Math.ceil(filteredBudget.length / rowsPerPage)
                  ? "disabled"
                  : ""
              }`}
            />
            <div className="paginationInfo">
              {`${indexOfLastRow - rowsPerPage + 1}-${Math.min(
                indexOfLastRow,
                filteredBudget.length
              )} of ${filteredBudget.length}`}
            </div>
          </div>
        </div>
      </div>

      {isAddBudget && (
        <>
          <div className="darkBackground" onClick={toggleAddBudget}></div>
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="addFormContainer">
                <div className="addBudgetTop">
                  <h2>{isEditing ? "Update Budget" : "Add Budget"}</h2>
                  <img
                    src="icons8-cross-50.png"
                    className="crossIcon"
                    onClick={toggleAddBudget}
                  />
                </div>

                <label>
                  <input
                    className="addInput"
                    type="text"
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                    placeholder="Name"
                  />
                </label>
                <label>
                  <input
                    className="addInput"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    min="0"
                  />
                </label>
                <label>
                  <input
                    className="addInput"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                  />
                </label>
                <button
                  type="submit"
                  className="addBtn"
                  onClick={toggleAddBudget}
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <ChartPage />
    </>
  );
}

export default BudgetPage;
