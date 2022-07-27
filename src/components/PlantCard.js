import React, {useState} from "react";

function PlantCard({plant}) {
  const [isInStock, setIsInStock] = useState(true)

  const toggleInStock = () => {
    setIsInStock(!isInStock)
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {`$${plant.price}`}</p>
      {isInStock ? (
        <button onClick={toggleInStock} className="primary">In Stock</button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
