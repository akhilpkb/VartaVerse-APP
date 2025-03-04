import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css"; // Updated import path

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="hamburger-button" onClick={toggleSidebar}>
            ☰
          </button>
          <Link to="/" className="navbar-brand">
            {/* <img src="logo.png" alt="Logo" className="logo" /> */}
            The News App
          </Link>
          <ul className="category-list">
            <li style={{ marginRight: "20px" }}>
              <Link to="/world" className="category-link">
                World
              </Link>
            </li>
            <li style={{ marginRight: "20px" }}>
              <Link to="/business" className="category-link">
                Business
              </Link>
            </li>
            <li style={{ marginRight: "20px" }}>
              <Link to="/sport" className="category-link">
                Sport
              </Link>
            </li>
            <li>
              <Link to="/culture" className="category-link">
                Culture
              </Link>
            </li>
          </ul>
        </div>
        <div className="add-buttons">
          <Link to="/add-article" className="add-button">
            Add Article
          </Link>
          <Link to="/add-category" className="add-button">
            Add Category
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close-button" onClick={toggleSidebar}>
          ✕
        </button>
        <ul className="sidebar-list">
          <li>
            <Link to="/world" className="sidebar-link">
              World
            </Link>
          </li>
          <li>
            <Link to="/business" className="sidebar-link">
              Business
            </Link>
          </li>
          <li>
            <Link to="/sport" className="sidebar-link">
              Sport
            </Link>
          </li>
          <li>
            <Link to="/culture" className="sidebar-link">
              Culture
            </Link>
          </li>
          <li>
            <Link to="/add-article" className="sidebar-add-link">
              Add Article
            </Link>
          </li>
          <li>
            <Link to="/add-category" className="sidebar-add-link">
              Add Category
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
