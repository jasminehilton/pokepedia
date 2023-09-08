import React from "react";
import "../styles/Pagination.css";
const Pagination = ({ prev, next }) => {

  return (
    <div className="pagination-container">
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  )
}

export default Pagination;