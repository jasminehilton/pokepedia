import { useState, useEffect } from "react";

const useCollections = () => {
  const [collection, setCollection] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/collection").then((res) =>
      res.json().then((data) => setCollection([...data]))
    );
  }, []);

  return {
    collection,
  };
};

export default useCollections;