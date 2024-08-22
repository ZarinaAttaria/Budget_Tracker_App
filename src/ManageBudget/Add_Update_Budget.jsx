import "./BudgetPage.css";
function Add_Update_Budget({
  toggleAddBudget,
  setBudgetName,
  setAmount,
  setDate,
  handleSubmit,
  isEditing,
  budgetName,
  amount,
  date,
}) {
  return (
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
            <button type="submit" className="addBtn">
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add_Update_Budget;
