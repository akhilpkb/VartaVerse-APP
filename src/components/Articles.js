import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { Link } from "react-router-dom";

const Articles = ({ categoryId }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      console.log("Fetched Articles:", data);
      if (categoryId) {
        setArticles(
          data.filter(
            (article) =>
              Number(article.categoryId) === Number(categoryId) &&
              article.content &&
              article.content.trim()
          )
        );
      } else {
        setArticles(
          data.filter((article) => article.content && article.content.trim())
        );
      }
    });
  }, [categoryId]);

  if (articles.length === 0) {
    return <p className="text-center">No articles found</p>;
  }

  return (
    <div className="col-12">
      <div className="row">
        {articles.map((article) => {
          const contentPreview = article.content.substring(0, 100);

          return (
            <div key={article.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </h5>
                  <p className="card-text">{contentPreview}...</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;
