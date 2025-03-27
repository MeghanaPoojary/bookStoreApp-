import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ name: "", title: "", price: "", category: "", image: "" });
  const [editingBook, setEditingBook] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login"); // Redirect to login if not authenticated
      return;
    }

    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    } else {
      fetchBooks();
    }
  }, [navigate]);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/list.json");
      setBooks(data);
      localStorage.setItem("books", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = () => {
    if (!newBook.name || !newBook.title || !newBook.price || !newBook.category || !newBook.image) {
      alert("Please fill all fields");
      return;
    }

    const updatedBooks = [...books, { id: books.length + 1, ...newBook }];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setNewBook({ name: "", title: "", price: "", category: "", image: "" });
  };

  const startEdit = (book) => {
    setEditingBook(book.id);
    setEditedBook(book);
  };

  const saveEdit = () => {
    if (!editedBook.title || !editedBook.price) {
      alert("Title and Price cannot be empty.");
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === editingBook ? { ...book, ...editedBook } : book
    );

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setEditingBook(null);
    setEditedBook({});
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h2>

      {/* Add New Book */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Book</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {["name", "title", "price", "category", "image"].map((field) => (
            <input
              key={field}
              type={field === "price" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newBook[field]}
              onChange={(e) => setNewBook({ ...newBook, [field]: e.target.value })}
              className="p-2 border rounded-md focus:ring-2 focus:ring-pink-400"
            />
          ))}
        </div>
        <button
          onClick={addBook}
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition duration-300"
        >
          Add Book
        </button>
      </div>

      {/* Book List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Book List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-pink-500 text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-100 transition duration-200">
                    <td className="p-3">
                      <img src={book.image} alt={book.title} className="w-12 h-12 rounded-md" />
                    </td>
                    <td className="p-3">{book.name}</td>
                    <td className="p-3">
                      {editingBook === book.id ? (
                        <input
                          type="text"
                          value={editedBook.title}
                          onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                          className="border p-1 rounded-md"
                        />
                      ) : (
                        book.title
                      )}
                    </td>
                    <td className="p-3">
                      {editingBook === book.id ? (
                        <input
                          type="number"
                          value={editedBook.price}
                          onChange={(e) => setEditedBook({ ...editedBook, price: e.target.value })}
                          className="border p-1 rounded-md"
                        />
                      ) : (
                        `$${book.price}`
                      )}
                    </td>
                    <td className="p-3">{book.category}</td>
                    <td className="p-3 flex space-x-2">
                      {editingBook === book.id ? (
                        <button
                          onClick={saveEdit}
                          className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(book)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteBook(book.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No books available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
