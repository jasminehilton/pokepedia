import React from 'react';

const TypeButton = ({typeName, onTypeSelect}) => {
  return (
    <button className="type-button" onClick={() => onTypeSelect(typeName)}>
      {typeName}
    </button>
  )
};


export default TypeButton;