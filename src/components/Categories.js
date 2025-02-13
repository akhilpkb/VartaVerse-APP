import { useEffect, useState } from "react";
import { fetchCategories } from "../api";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="col-12">
      <div className="d-flex flex-wrap justify-content-center">
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((category) => (
            <button
              key={category.id}
              className="btn btn-outline-primary m-2"
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name || "Unknown Category"}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
