import React, { useState } from "react";

const ExampleComponent = () => {
  const [count, setCount] = useState(0); // No type declaration needed

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <button onClick={increment}>Count: {count}</button>
  );
};

export default ExampleComponent;
