import React from "react";
import "../styles/Pagination.css";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const Pagination = ({ prev, next }) => {

  return (
    <div className="pagination-container">
      <AwesomeButton
        className="pagination-prev-button"
        type="danger"
        onPress={prev}>
        Prev
      </AwesomeButton>
      <AwesomeButton
        className="pagination-next-button"
        type="danger"
        onPress={next}>
        Next
      </AwesomeButton>
    </div>
  )
}

export default Pagination;
