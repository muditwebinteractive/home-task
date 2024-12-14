import React from "react";

const Floor = ({ floor, onCall }) => {
  return (
    <div className="floor">
      <span>Floor {floor}</span>
      <button onClick={() => onCall(floor)}>Call Elevator</button>
    </div>
  );
};

export default Floor;