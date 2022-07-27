import React from "react";
import PlantCard from "./PlantCard";

function PlantList({handleNewPrice, plants}) {
  
  return (
    <ul className="cards">{plants.map(plant => {
      return (
        <PlantCard key={plant.id} plant={plant} handleNewPrice={handleNewPrice} />
      )
    })}</ul>
  );
}

export default PlantList;
