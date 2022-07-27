import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [ plants, setPlants] = useState([])
  const [formData, setFormData] = useState({})
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(r => r.json())
      .then(plantData => setPlants(plants => plantData))
  }, [])

  const handleSubmitPlant = (newPlant) => {
    setFormData(oldFormData => oldFormData = newPlant)
    setPlants(oldPlants => [...oldPlants, formData] )
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
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
