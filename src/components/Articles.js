import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { Link } from "react-router-dom";
import "./css/Articles.css";

const BASE_URL = "http://localhost:5222"; // Ensure this matches the backend

const Articles = ({ categoryId }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      console.log("Fetched Articles:", data);
      let filteredArticles = [];
      const resolvedArticles = new Map(); // Use a Map for efficient lookup

      // First, resolve references and filter for valid content
      data.forEach((item) => {
        if (item.$ref) {
          // Resolve reference
          const refId = item.$ref;
          if (resolvedArticles.has(refId)) {
            return; // Skip if already processed
          }
          const referencedArticle = data.find(
            (article) => article.$id === refId
          );
          if (
            referencedArticle &&
            referencedArticle.content &&
            referencedArticle.content.trim()
          ) {
            resolvedArticles.set(refId, referencedArticle);
            filteredArticles.push(referencedArticle);
          }
        } else if (item.content && item.content.trim()) {
          // Process non-referenced articles
          if (resolvedArticles.has(item.id)) {
            return; // Skip if already processed
          }
          resolvedArticles.set(item.id, item);
          filteredArticles.push(item);
        }
      });

      // Apply category filtering after resolving references
      if (categoryId) {
        filteredArticles = filteredArticles.filter(
          (article) => Number(article.categoryId) === Number(categoryId)
        );
      }
      setArticles(filteredArticles);
    });
  }, [categoryId]);

  if (articles.length === 0) {
    return <p className="text-center">No articles found</p>;
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {articles.map((article) => {
          const imageUrl = article.imageUrl
            ? `${BASE_URL}${article.imageUrl}`
            : "/placeholder.jpg"; // Fallback image

          return (
            <div key={article.id} className="col">
              <div className="card h-100 article-card">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="card-img-top article-image"
                />
                <div className="card-body">
                  <h5 className="card-title article-title">
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </h5>
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
