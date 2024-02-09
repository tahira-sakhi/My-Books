import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Add = () => {
  const [books, setBooks] = useState({
    title: "",
    author: "",
    price: "",
    language: "",
    available_copies: "",
    total_copies: "",
    location: "",
  });
  const navigate = useNavigate(); // navigate to home page//
  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", books);

      navigate("/");
    } catch (err) {
      console.error(err); // Corrected error logging
    }
  };

  console.log(books);
  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="Author"
        onChange={handleChange}
        name="author"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="Language"
        onChange={handleChange}
        name="language"
      />
      <input
        type="number"
        placeholder="Available_copies"
        onChange={handleChange}
        name="available_copies"
      />
      <input
        type="number"
        placeholder="Total_copies"
        onChange={handleChange}
        name="total_copies"
      />
      <input
        type="text"
        placeholder="Location"
        onChange={handleChange}
        name="location"
      />
      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default Add;
