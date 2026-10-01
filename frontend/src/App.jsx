import { useState } from "react";
import axios from "axios";
function App() {

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/books",
                formData
            );

            console.log(response.data);

            setMessage("Book added successfully!");

            
            setFormData({
                title: "",
                author: "",
                isbn: "",
                category: "",
                publicationYear: ""
            });

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message || "Failed to add book"
            );
        }
    };

    return (
        <div>
            <h1>Library Book Management System</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Book Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Author Name</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Publication Year</label>
                    <input
                        type="number"
                        name="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Add the Book to the DB
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default App;