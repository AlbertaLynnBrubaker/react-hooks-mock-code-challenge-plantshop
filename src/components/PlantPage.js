import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [ plants, setPlants] = useState([])
  const [formData, setFormData] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  // const [newPrice, setNewPrice] = useState()

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(r => r.json())
      .then(plantData => setPlants(plants => plantData))
  }, [])

  const handleSubmitPlant = (newPlant) => {
    setFormData(oldFormData => oldFormData = newPlant)
    setPlants(oldPlants => [...oldPlants, formData] )
  }

  const handleNewPrice = (newPlant, plantId) => {
    console.log(newPlant.price)
    setPlants(oldPlants => oldPlants.map(plant => {
      if(plant.id === plantId) {
        return {...plant, price: parseFloat(newPlant.price).toFixed(2)}
      } else {
        return plant
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
      <PlantList handleNewPrice={handleNewPrice} plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
