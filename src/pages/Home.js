import { useState } from "react";
import Categories from "../components/Categories";
import Articles from "../components/Articles";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 mb-3">
          <h2 className="text-center">Browse Articles by Category</h2>
        </div>
        <Categories onSelectCategory={setSelectedCategory} />
      </div>
      <div className="row mt-4">
        <Articles categoryId={selectedCategory} />
      </div>
    </div>
  );
};

export default Home;
