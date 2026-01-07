import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  // Read cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: 15,
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: 12,
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: 18,
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba",
          description: "Calming scent, used in aromatherapy.",
          cost: 20,
        },
        {
          name: "Jasmine",
          image:
            "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b",
          description: "Sweet fragrance, promotes relaxation.",
          cost: 18,
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel for skin care.",
          cost: 14,
        },
        {
          name: "Chamomile",
          image:
            "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Promotes sleep and relaxation.",
          cost: 15,
        },
      ],
    },
  ];

  // REQUIRED BY TASK 4: total quantity in cart icon
  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
      : 0;
  };

  // Add to cart (Redux handles quantity + duplicates)
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowPlants(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowPlants(true);
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="logo"
            />
            <a href="/" onClick={handleHomeClick}>
              <div className="tag_home_link">
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div className="ul">
          <div>
            <a href="#" onClick={handlePlantsClick}>
              Plants
            </a>
          </div>

          <div>
            <a href="#" onClick={handleCartClick}>
              <h1 className="cart" style={{ position: "relative" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  height="68"
                  width="68"
                >
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>

                {/* Quantity badge */}
                <div className="cart_quantity_count">
                  {calculateTotalQuantity()}
                </div>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        showPlants && (
          <div className="product-grid">
            {plantsArray.map((category) => (
              <div key={category.category}>
                <div className="plantname_heading">
                  <h2 className="plant_heading">{category.category}</h2>
                </div>

                <div className="product-list">
                  {category.plants.map((plant) => {
                    const isInCart = cartItems.some(
                      (item) => item.name === plant.name
                    );

                    return (
                      <div className="product-card" key={plant.name}>
                        <h3 className="product-title">{plant.name}</h3>

                        <img
                          className="product-image"
                          src={plant.image}
                          alt={plant.name}
                        />

                        <p>{plant.description}</p>
                        <p className="product-price">${plant.cost}</p>

                        <button
                          className={`product-button ${
                            isInCart ? "added-to-cart" : ""
                          }`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={isInCart}
                        >
                          {isInCart ? "Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default ProductList;