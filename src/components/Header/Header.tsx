import { NavLink } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1>Severe Weather Europe</h1>
      <nav>
        <ul>
          {/* This will contain the map where i will show tornado outbreaks and
          other severe weather phenomona */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Map
            </NavLink>
          </li>
          {/* This will contain an info page where i will showcase different
          severe weather types using visualization and front-end skills */}
          <li>
            <NavLink
              to="/severe-weather"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Severe Weather
            </NavLink>
          </li>
          {/* This will contain an about page where i will talk about myself and
          my motivation for creating this project */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
