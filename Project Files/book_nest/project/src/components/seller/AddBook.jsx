import React, { useState } from 'react';
import { useBooks } from '../../contexts/BookContext';

const genreOptions = [
  'Fiction', 'Nonfiction', 'Thriller', 'Mystery', 'Biography',
  'Science', 'Business', 'Romance', 'History', 'Fantasy'
];

const AddBook = () => {
  const { addBook } = useBooks();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.genre || !form.price || !form.image) {
      alert('Please fill in all required fields.');
      return;
    }

    addBook({
      ...form,
      price: parseInt(form.price),
      bestseller: false
    }, 1); // sellerId = 1 for now

    alert('Book added successfully!');

    setForm({
      title: '',
      author: '',
      genre: '',
      price: '',
      description: '',
      image: null
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">Select Genre</option>
          {genreOptions.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price (in ₹)"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded"
        />

        {form.image && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-500">Preview:</p>
            <img src={form.image} alt="Preview" className="h-40 object-contain rounded border" />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
