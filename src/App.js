import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddArticle from "./pages/AddArticle";
import AddCategory from "./pages/AddCategory";
import ArticleDetails from "./components/ArticleDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
