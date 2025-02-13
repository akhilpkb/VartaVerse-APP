import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../api";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const BASE_URL = "http://localhost:5222"; // Your .NET backend URL

const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticles().then((data) => {
      const selectedArticle = data.find(
        (article) => article.id === parseInt(articleId)
      );
      setArticle(selectedArticle);
    });
  }, [articleId]);

  if (!article) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const imageUrl = article.imageUrl
    ? `${BASE_URL}${article.imageUrl}`
    : "/placeholder.jpg"; // Fallback image

  return (
    <div className="container mt-4">
      {/* Category Badge */}
      <p className="text-primary text-uppercase fw-bold">
        {article.category?.name}
      </p>

      {/* Article Title */}
      <h1 className="fw-bold">{article.title}</h1>
      <p className="text-muted">By {article.author}</p>

      {/* Image Section */}
      <div className="text-center my-3">
        <img
          src={imageUrl}
          alt={article.title}
          className="img-fluid rounded"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        {/* <p className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {article.content}
        </p> */}
      </div>

      {/* Article Content */}
      <div className="mt-3">
        <p>{article.content}</p>
      </div>

      {/* Meta Information */}
      <div className="d-flex justify-content-between border-top pt-3">
        <p>
          <strong>Category:</strong> {article.category?.name}
        </p>
        <p>
          <strong>Published on:</strong>{" "}
          {new Date(article.publicationDate).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
