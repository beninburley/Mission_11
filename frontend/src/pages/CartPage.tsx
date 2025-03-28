import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import "./CartPage.css"; // Import the CSS file for styling

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate the total cost of all items in the cart
  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-grid">
            {cart.map((item: CartItem) => (
              <div key={item.bookID} className="cart-item">
                <h3>{item.title}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.bookID)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-summary">
        <h3>Total Quantity: {totalQuantity}</h3>
        <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
        <button className="checkout-button">Checkout</button>
        <button className="continue-button" onClick={() => navigate("/books")}>
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default CartPage;
