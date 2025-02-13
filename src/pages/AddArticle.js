import { useState, useEffect } from "react";
import { addArticle, fetchCategories } from "../api";

const AddArticle = () => {
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    author: "",
    categoryId: "",
    image: null, // New image field
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticle({ ...article, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!article.slug) {
    article.slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  const formData = new FormData();
  formData.append("title", article.title);
  formData.append("content", article.content);
  formData.append("author", article.author || "Anonymous");
  formData.append("categoryId", Number(article.categoryId)); // Ensure it's a number
  formData.append("slug", article.slug);

  if (article.image) {
    formData.append("image", article.image);
  }

  try {
    await addArticle(formData);
    alert("Article added successfully!");

    setArticle({
      title: "",
      content: "",
      author: "",
      categoryId: "",
      image: null,
    });
    setImagePreview(null);
  } catch (error) {
    console.error("Error adding article:", error);
    alert("Failed to add article. Please try again.");
  }
};


  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Add New Article</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              value={article.content}
              onChange={(e) =>
                setArticle({ ...article, content: e.target.value })
              }
              className="form-control"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              value={article.author}
              onChange={(e) =>
                setArticle({ ...article, author: e.target.value })
              }
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              value={article.categoryId}
              onChange={(e) =>
                setArticle({ ...article, categoryId: e.target.value })
              }
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 img-fluid rounded shadow"
                style={{ maxWidth: "100px" }}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
