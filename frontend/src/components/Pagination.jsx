import React from "react";
import "../styles/Pagination.css";
const Pagination = ({ prev, next }) => {

  return (
    <div className="pagination-container">
      <button
        className="pagination-prev-button"
        onClick={prev}>
        {/* <img width="100" height="100" src="https://img.icons8.com/arcade/100/000/left-squared.png" alt="left-squared" /> */}
        Prev
      </button>
      <button
        className="pagination-next-button"
        onClick={next}>
        Next
      </button>
    </div>
  )
}

export default Pagination;
