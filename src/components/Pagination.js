import React from "react";

function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  handleNextPage,
  handlePrevPage,
}) {
  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        <i className="ri-arrow-left-circle-fill"></i>
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <i className="ri-arrow-right-circle-fill"></i>
      </button>
    </div>
  );
}

export default Pagination;
