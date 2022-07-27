import React from "react";
import PlantCard from "./PlantCard";

function PlantList({handleRemovePlant, handleNewPrice, plants}) {

  console.log(plants)
  
  return (
    <ul className="cards">{plants.map(plant => {
      return (
        <PlantCard key={plant.id} plant={plant} handleNewPrice={handleNewPrice} handleRemovePlant={handleRemovePlant} />
      )
    })}</ul>
  );
}

export default PlantList;
