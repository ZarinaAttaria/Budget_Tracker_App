import "./BudgetPage.css";
function Pagination({
  handlePreviousPage,
  handleNextPage,
  handleRowsPerPageChange,
  currentPage,
  rowsPerPage,
  filteredBudget,
  indexOfLastRow,
}) {
  return (
    <>
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
    </>
  );
}

export default Pagination;
