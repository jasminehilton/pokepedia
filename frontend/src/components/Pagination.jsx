import React from "react";
import "../styles/Pagination.css";
const Pagination = ({ prev, next }) => {

  return (
<<<<<<< HEAD
    <div className="pagination-buttons">
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
=======
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
>>>>>>> 5f7427b0da0db923088869dc0f26ed5095908f08
    </div>
  )
}

export default Pagination;
