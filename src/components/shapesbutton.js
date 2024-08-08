import React from 'react';

const ShapeButtons = ({ setSelectedShape }) => {
  return (
    <div>
      <button onClick={() => setSelectedShape('circle')}>Circle</button>
      <button onClick={() => setSelectedShape('rectangle')}>Rectangle</button>
    </div>
  );
};

export default ShapeButtons;