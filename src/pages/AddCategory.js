import { useState } from "react";
import { addCategory } from "../api";

const AddCategory = () => {
  const [category, setCategory] = useState({ name: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCategory(category);
    alert("Category added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <input
        type="text"
        placeholder="Name"
        value={category.name}
        onChange={(e) => setCategory({ ...category, name: e.target.value })}
        className="form-control mb-3"
      />
      <textarea
        placeholder="Description"
        value={category.description}
        onChange={(e) =>
          setCategory({ ...category, description: e.target.value })
        }
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-primary">
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
