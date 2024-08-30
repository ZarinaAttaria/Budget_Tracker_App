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
  const totalRecords = filteredBudget.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const isDisabledPrevious = currentPage === 1;
  const isDisabledNext = currentPage >= totalPages || totalPages === 0;

  const startIndex =
    totalRecords === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIndex =
    totalRecords === 0 ? 0 : Math.min(indexOfLastRow, totalRecords);

  return (
    <>
      <div className="paginationControls">
        <img
          src="previous.png"
          onClick={handlePreviousPage}
          className={`paginationButton icons ${
            isDisabledPrevious ? "disabled" : ""
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
            isDisabledNext ? "disabled" : ""
          }`}
        />

        <div className="paginationInfo">
          {`${startIndex}-${endIndex} of ${totalRecords}`}
        </div>
      </div>
    </>
  );
}

export default Pagination;
