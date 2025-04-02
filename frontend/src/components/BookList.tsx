import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { fetchBooks } from "../api/BooksAPI";
import "./BookList.css";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <br />
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <br />
      <div className="book-list">
        {books.map((b) => (
          <div className="card" id="bookCard" key={b.bookID}>
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
              <button
                className="btn btn-success"
                onClick={() =>
                  navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
                }
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>
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
        <button
          className="btn btn-outline-primary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
