import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./BudgetPage.css";
import ChartPage from "./ChartPage";
import Pagination from "./Pagination";
import Add_Update_Budget from "./Add_Update_Budget";
import FilterByDate from "./FilterByDate";
import BudgetTable from "./BudgetTable";

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
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isFilterByDate, setIsFilterByDate] = useState(false);
  const token = localStorage.getItem("token");

  const fetchAllBudgetEntries = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/getAllBudget` ||
          `/api/auth/getAllBudget`,
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
    toggleAddBudget();
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/auth/update-budget/${entryId}`,
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
          `${import.meta.env.VITE_API_URL}/api/auth/add-budget`,
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
        `${import.meta.env.VITE_API_URL}/api/auth/delete-budget/${entryId}` ||
          `/api/auth/delete-budget/${entryId}`,
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
      setIsFilterByDate(true);
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
  const handleResetFilter = () => {
    fetchAllBudgetEntries();
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="mainBugetContainer">
        <div className="budgetContainer1">
          <div className="budgetContainerTop">
            <FilterByDate
              handleFilterByDate={handleFilterByDate}
              setFilterDate={setFilterDate}
              handleResetFilter={handleResetFilter}
              filterDate={filterDate}
            />
            <button onClick={toggleAddBudget} className="addBtn">
              Add Budget
            </button>
          </div>
          <div className="filteredItems">
            {isFilterByDate &&
              `showing ${filteredBudget.length} out of ${budget.length}`}
          </div>
          <BudgetTable
            currentRows={currentRows}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <Pagination
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            filteredBudget={filteredBudget}
            indexOfLastRow={indexOfLastRow}
          />
        </div>
      </div>

      {isAddBudget && (
        <>
          <Add_Update_Budget
            toggleAddBudget={toggleAddBudget}
            setBudgetName={setBudgetName}
            setAmount={setAmount}
            setDate={setDate}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            budgetName={budgetName}
            amount={amount}
            date={date}
          />
        </>
      )}
      <ChartPage isAddBudget={isAddBudget} isEditing={isEditing} />
    </>
  );
}

export default BudgetPage;
