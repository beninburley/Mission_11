import { useState, useEffect } from "react";
import { Book } from "./types/Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortOrder]);

  return (
    <>
      <h1>Books</h1>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <br />
      {books.map((b) => (
        <div className="card shadow-sm mb-3" id="bookCard">
          <div className="card-header bg-primary text-white">
            <h3 className="card-title mb-0">{b.title}</h3>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Author:</strong> {b.author}
              </li>
              <li className="list-group-item">
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li className="list-group-item">
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li className="list-group-item">
                <strong>Classification:</strong> {b.classification}
              </li>
              <li className="list-group-item">
                <strong>Category:</strong> {b.category}
              </li>
              <li className="list-group-item">
                <strong>Pages:</strong> {b.pageCount}
              </li>
              <li className="list-group-item">
                <strong>Price:</strong> ${b.price.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        {/* Previous Button */}
        <button
          className="btn btn-outline-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="btn btn-outline-primary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Results Per Page Dropdown */}
      <div className="mt-3 d-flex justify-content-center align-items-center gap-2">
        <label className="fw-bold">Results per page:</label>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  );
}

export default BookList;
