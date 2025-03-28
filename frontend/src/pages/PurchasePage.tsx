import { useNavigate, useParams } from "react-router-dom";
import Welcome from "../components/Welcome";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();

  // Convert price to a number
  const pricePerBook = price ? parseFloat(price) : 0;

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || "No Title Found",
      price: pricePerBook,
      quantity,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <div className="container mt-5">
      <Welcome />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Purchase {title}</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Number of Books:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className="form-control"
                    placeholder="Enter Quantity"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                <p className="text-center">
                  <strong>Total Price:</strong> $
                  {(quantity * pricePerBook).toFixed(2)}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
