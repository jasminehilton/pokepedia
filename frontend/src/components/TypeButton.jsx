import React, { useState } from 'react';

const TypeButton = ({ typeName, onTypeSelect }) => {
  const [selected, setSelected] = useState(false); //Temporary state, will be moved to reducer

  const handleClick = () => {
    setSelected(!selected);
    onTypeSelect(typeName); //Uses the onTypeSelect prop, to callback with typeName parameter
  };
  
  const buttonClassName = selected ? 'type-button selected' : 'type-button'; //Will change the button className depending on selected state

  return (
    <button className={buttonClassName} onClick={handleClick}>
      {typeName}
    </button>
  );
};

export default TypeButton;