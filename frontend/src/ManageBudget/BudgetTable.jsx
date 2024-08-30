function BudgetTable({ currentRows, handleEdit, handleDelete }) {
  return (
    <>
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
          {currentRows.length > 0 ? (
            currentRows.map((b) => (
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
            ))
          ) : (
            <p className="noRecordFound">No record found</p>
          )}
        </tbody>
      </table>
    </>
  );
}

export default BudgetTable;
