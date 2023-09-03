import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TypeButton from './TypeButton';

const TypeButtonList = () => {
  
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const onTypeSelect = (typeName) => {
    if (selectedTypes.includes(typeName)) {
      console.log('Removed type:', typeName);
      setSelectedTypes(selectedTypes.filter((type) => type !== typeName)); //Filters out any existing types
    } else {
      console.log('Selected type:', typeName);
      setSelectedTypes([...selectedTypes, typeName]);
    }
  }

  //This will show all the currently selected types
  useEffect(() => {
    console.log('Selected types:', selectedTypes);
  }, [selectedTypes]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then((response) => {
        setTypes(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon types data:', error);
      });
  }, []);

  if (types.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {types.map((type) => (
        <TypeButton
          key={type.name}
          typeName={type.name}
          onTypeSelect={onTypeSelect}
        />
      ))}
    </div>
  );
};

export default TypeButtonList;