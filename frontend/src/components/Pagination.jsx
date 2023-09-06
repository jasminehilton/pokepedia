import React from "react";

const Pagination = ({ prev, next }) => {

  return (
    <div>
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </div>
  )
}

export default Pagination;