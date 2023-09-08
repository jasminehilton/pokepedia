import React from "react";

const Pagination = ({ prev, next }) => {

  return (
    <div className="pagination-buttons">
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  )
}

export default Pagination;