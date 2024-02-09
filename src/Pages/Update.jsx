import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("check param", id);

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    language: "",
    available_copies: "",
    total_copies: "",
    location: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/books/${id}`);
        const rdata = response.data;
        console.log("check data response", response);
        // setBook((prev) => ({ ...prev, rdata }));
        setBook(response.data);

        console.log("check data", response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${id}`, book);
      navigate(`/update/${id}`);
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        value={book.title}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={handleChange}
        name="author"
        value={book.author}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
        value={book.price}
      />
      <input
        type="text"
        placeholder="Language"
        onChange={handleChange}
        name="language"
        value={book.language}
      />
      <input
        type="number"
        placeholder="Available_copies"
        onChange={handleChange}
        name="available_copies"
        value={book.available_copies}
      />
      <input
        type="number"
        placeholder="Total_copies"
        onChange={handleChange}
        name="total_copies"
        value={book.total_copies}
      />
      <input
        type="text"
        placeholder="Location"
        onChange={handleChange}
        name="location"
        value={book.location}
      />
      <button className="formButton" onClick={handleUpdate}>
        Update the Book
      </button>
    </div>
  );
};

export default Update;
