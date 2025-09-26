import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3 mb-4 px-3">
        <div className="container-fluid px-0">
          <Link className="navbar-brand fw-semibold" to="/">Event Planner</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary ms-lg-2" to="/new">+ New Event</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
