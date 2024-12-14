import React from "react";

const Elevator = ({ id, currentFloor, moving, floorHeight }) => {
  const elevatorStyle = {
    transform: `translateY(${-currentFloor * floorHeight}px)`,
    transition: moving ? "transform 1s ease-in-out" : "none",
  };

  return (
    <div className="elevator" style={elevatorStyle}>
      <h3>Elevator {id + 1}</h3>
    </div>
  );
};

export default Elevator;