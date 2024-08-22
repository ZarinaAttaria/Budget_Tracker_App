import "./BudgetPage.css";

function FilterByDate({
  handleFilterByDate,
  setFilterDate,
  handleResetFilter,
  filterDate,
}) {
  return (
    <>
      <form onSubmit={handleFilterByDate}>
        <div className="btnsContainer">
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
          <button onClick={handleResetFilter} className="resetFilterBtn">
            Reset Filter
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterByDate;
