import React, {useState} from "react";

function PlantCard({handleRemovePlant, handleNewPrice, plant}) {
  const [isInStock, setIsInStock] = useState(true)
  const [isUpdatePrice, setIsUpdatePrice] = useState(false)
  const [trackPrice, setTrackPrice] = useState(plant.price)
  

  const toggleInStock = () => {
    setIsInStock(!isInStock)
  }

  const toggleChangePrice = () => {
    setIsUpdatePrice(!isUpdatePrice)
  }

  const handlePriceChange = (e) => {
    setTrackPrice(trackPrice => trackPrice = e.target.value)
  }

  const toggleUpdatePrice = (e) => {
    e.preventDefault()

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: trackPrice
      })
    })
      .then(r => r.json())
      .then(newPrice => handleNewPrice(newPrice, plant.id))
    
    setIsUpdatePrice(!isUpdatePrice)
  }

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE'
    })
      .then(() => handleRemovePlant(plant.id) )
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {isUpdatePrice ? 
      <form onSubmit={(e) => toggleUpdatePrice(e)}>
        <input onChange={handlePriceChange} className="price" id="price-input" value={trackPrice} placeholder="New Price..."/>
        <button type='submit' id="price-btn" className="price" value="Update Price">Update Price</button>
      </form>:
      <>
        <p className="price">Price: {`$${plant.price}`}</p>
        <button onClick={toggleChangePrice} id="price-btn" className="price">Update Price</button>
      </>
      }

      
      {isInStock ? (
        <button onClick={toggleInStock} className="primary">In Stock</button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Remove Plant</button>
    </li>
  );
}

export default PlantCard;
