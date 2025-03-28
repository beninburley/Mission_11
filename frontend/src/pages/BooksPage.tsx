import { useState } from "react";
import BookFilter from "../components/BookFilter";
import BookList from "../components/BookList";
import Welcome from "../components/Welcome";
import CartSummary from "../components/CartSummary";
import "./BooksPage.css";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container-fluid">
      <CartSummary />
      <Welcome />

      {/* Jumbotron Section */}
      <div className="bg-light p-5 rounded mb-4">
        <h1 className="display-4">Welcome to the Bookstore!</h1>
        <p className="lead">
          Discover a wide variety of books across different genres. Find your
          next favorite read today!
        </p>
        <hr className="my-4" />
        <p>
          Use the filters to explore books by category or browse our full
          collection below.
        </p>
      </div>

      <div className="row">
        {/* Sidebar for filters */}
        <div className="col-md-3">
          <BookFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Main content for book list */}
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
