import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        NewsApp
      </Link>
      <div>
        <Link to="/add-article" className="btn btn-primary me-2">
          Add Article
        </Link>
        <Link to="/add-category" className="btn btn-secondary">
          Add Category
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
