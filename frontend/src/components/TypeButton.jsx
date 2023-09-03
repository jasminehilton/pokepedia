import React from 'react';

const TypeButton = ({ typeName, onTypeSelect }) => {
  const handleClick = () => {
    onTypeSelect(typeName); //Uses the onTypeSelect prop, to callback with typeName parameter
  };

  return (
    <button className="type-button" onClick={handleClick}>
      {typeName}
    </button>
  );
};

export default TypeButton;