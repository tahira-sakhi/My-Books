import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Books = () => {
  // State to store the list of books
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch the list of books from the server
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books");
        console.log(response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchAllBooks();
  }, []);
  // Function to handle delete button click
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8800/books/${id}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this book?"
      );
      if (confirmUpdate) {
        navigate(`/update/${id}`);
        console.log("check update", id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Discover the World Through Tahira's Books!</h1>
      <h2>
        Dive into a World of Stories, Adventures, and Knowledge, Where Every
        Book Holds a Story:{" "}
        <span style={{ color: "red" }}>Tahira's Collection:</span>
      </h2>
      <div className="books">
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {books.map((book) => (
            <li key={book.id} style={{ margin: "20px", textAlign: "center" }}>
              {book.cover && <img src={book.cover} alt="" />}
              {/* Display book information */}
              <p>id: {book.id}</p>
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <p>Price: {book.price}</p>
              <p>Language: {book.language}</p>
              <p>Available Copies: {book.available_copies}</p>
              <p>Total Copies: {book.total_copies}</p>
              <p>Location: {book.location}</p>
              <div style={{ marginTop: "10px" }}>
                <button
                  className="update"
                  onClick={() => handleUpdate(book.book_id)}
                >
                  {" "}
                  Update
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/add">
        <button>Add New Book</button>
      </Link>
    </div>
  );
};

export default Books;
