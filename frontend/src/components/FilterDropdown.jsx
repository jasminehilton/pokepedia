import React from "react";

const FilterDropdown = ({ selectedType, setSelectedType, typesData }) => {
  const handleTypeChange = (e) => {
    const newSelectedType = e.target.value;
    setSelectedType(newSelectedType);
  };

  return (
    <div>
      <label>Filter by Type:</label>
      <select onChange={handleTypeChange} value={selectedType}>
        <option value="">All Types</option>
        {typesData.results.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
