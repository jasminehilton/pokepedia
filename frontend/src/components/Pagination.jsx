import React from "react";

const Pagination = ({ loadPreviousPage, loadNextPage }) => {
  return (
    <div>
      <button onClick={loadPreviousPage}>Previous</button>
      <button onClick={loadNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
