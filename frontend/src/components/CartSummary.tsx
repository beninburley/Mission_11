import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate the total amount as the sum of price * quantity for each item
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontSize: "16px",
      }}
      onClick={() => navigate("/cart")}
    >
      🛒 <strong>{totalQuantity} items</strong> - ${totalAmount.toFixed(2)}
    </div>
  );
}

export default CartSummary;
