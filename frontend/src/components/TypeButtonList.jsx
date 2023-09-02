import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TypeButton from './TypeButton';

const TypeButtonList = () => {
  
  const [types, setTypes] = useState([]);

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
        <TypeButton key={type.name} typeName={type.name} />
      ))}
    </div>
  );
};

export default TypeButtonList;