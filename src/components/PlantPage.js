import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [ plants, setPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(r => r.json())
      .then(plantData => setPlants(plants => plantData))
  }, [])

  const handleSubmitPlant = (newPlant) => {
    setPlants(oldPlants => [...oldPlants, newPlant ])
  }

  const handleNewPrice = (newPlant, plantId) => {
  
    setPlants(oldPlants => oldPlants.map(plant => {
      if(plant.id === plantId) {
        return {...plant, price: parseFloat(newPlant.price).toFixed(2)}
      } else {
        return plant
      }
    }))
  }

  const handleRemovePlant = (deletedPlantId) => {
    setPlants(oldPlants => oldPlants.filter(plant => {
      if(plant.id === deletedPlantId) {
        return false
      } else {
        return true
      }
    }))
  } 

  const handleSearchPlants = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredPlants = plants.filter(plant => {
    if(searchQuery === "") {
      return true
    } else {
      return plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
  })

  return (
    <main>
      <NewPlantForm handleSubmitPlant={handleSubmitPlant}/>
      <Search handleSearchPlants={handleSearchPlants}/>
      <PlantList handleNewPrice={handleNewPrice} handleRemovePlant={handleRemovePlant} plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
