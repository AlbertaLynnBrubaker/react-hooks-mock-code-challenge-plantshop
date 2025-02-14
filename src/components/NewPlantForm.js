import React, {useState} from "react";

function NewPlantForm({handleSubmitPlant}) {
  const [formInput, setformInput] = useState({
    name: "",
    image: "",
    price: ""
  })

  const handleFormChange = (e) => {
    setformInput(() => {
      return {
        ...formInput,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:6001/plants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formInput)
    })
      .then(r => r.json())
      .then(newPlant => handleSubmitPlant(newPlant))

    setformInput(formInput => {
      return formInput = {
        name: "",
        image: "",
        price: ""
      }
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={handleFormChange}          
          type="text" 
          name="name"
          className="form-input" 
          placeholder="Plant name"
          value={ formInput.name }
        />
        <input
          onChange={handleFormChange}
          type="text" 
          name="image" 
          className="form-input"
          placeholder="Image URL"
          value={ formInput.image }
        />
        <input
          onChange={handleFormChange}
          type="number" 
          name="price" 
          className="form-input"
          step="0.01" 
          placeholder="Price"
          value={ formInput.price }
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
