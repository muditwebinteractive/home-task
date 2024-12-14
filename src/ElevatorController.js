import React, { useState } from "react";
import Floor from "./Floor";
import Elevator from "./Elevator";

const ElevatorController = () => {
  const totalFloors = 10;
  const totalElevators = 3;
  const floorHeight = 60; // Height of each floor in pixels for animation

  const [elevators, setElevators] = useState(
    Array.from({ length: totalElevators }, (_, id) => ({
      id,
      currentFloor: 0,
      moving: false,
    }))
  );
  const [queue, setQueue] = useState([]);

  const handleCall = (floor) => {
    const availableElevator = elevators.find((elevator) => !elevator.moving);

    if (availableElevator) {
      moveElevator(availableElevator.id, floor);
    } else {
      setQueue((prevQueue) => [...prevQueue, floor]);
    }
  };

  const moveElevator = (elevatorId, targetFloor) => {
    setElevators((prev) =>
      prev.map((elevator) =>
        elevator.id === elevatorId
          ? { ...elevator, moving: true }
          : elevator
      )
    );

    setTimeout(() => {
      setElevators((prev) =>
        prev.map((elevator) =>
          elevator.id === elevatorId
            ? { ...elevator, currentFloor: targetFloor, moving: false }
            : elevator
        )
      );

      if (queue.length > 0) {
        const nextFloor = queue.shift();
        setQueue([...queue]);
        moveElevator(elevatorId, nextFloor);
      }
    }, Math.abs(targetFloor - elevators.find((e) => e.id === elevatorId).currentFloor) * 1000);
  };

  return (
    <div>
      <div className="floors">
        {Array.from({ length: totalFloors }, (_, floor) => (
          <Floor key={floor} floor={floor} onCall={handleCall} />
        ))}
      </div>
      <div className="elevators">
        {elevators.map((elevator) => (
          <Elevator
            key={elevator.id}
            id={elevator.id}
            currentFloor={elevator.currentFloor}
            moving={elevator.moving}
            floorHeight={floorHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default ElevatorController;