import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total cost of all items in cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // rubric mentions cost string like "$15" -> parseFloat(item.cost.substring(1))
      // but your ProductList currently uses numeric costs, so handle both safely:
      const unitPrice =
        typeof item.cost === "string"
          ? parseFloat(item.cost.substring(1))
          : Number(item.cost);

      const qty = Number(item.quantity || 1);
      return total + unitPrice * qty;
    }, 0);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: (item.quantity || 1) + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    const currentQty = item.quantity || 1;

    if (currentQty > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: currentQty - 1,
        })
      );
    } else {
      // if would drop to 0, remove item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Subtotal for an individual item
  const calculateTotalCost = (item) => {
    const unitPrice =
      typeof item.cost === "string"
        ? parseFloat(item.cost.substring(1))
        : Number(item.cost);

    const qty = Number(item.quantity || 1);
    return unitPrice * qty;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>

              {/* show unit price */}
              <div className="cart-item-cost">
                ${typeof item.cost === "string"
                  ? parseFloat(item.cost.substring(1))
                  : item.cost}
              </div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity || 1}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
