import { Link, NavLink } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__brand" to="/" aria-label="Severe Weather Europe — home">
          <svg className="header__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M8 12C13 8 27 8 32 12M11 18C16 15 25 15 29 18M15 24C18 22 23 22 26 24M18 30L22 29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div>
            <h1>Severe Weather <span>Europe</span></h1>
            <p>Historical events &amp; storm science</p>
          </div>
        </Link>
        <nav aria-label="Main navigation">
          <ul>
            <li><NavLink to="/" end className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" /></svg>
              Map
            </NavLink></li>
            <li><NavLink to="/severe-weather" className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 16a5 5 0 1 1 1-9 6 6 0 0 1 11 4 3 3 0 0 1-1 6M12 13l-3 5h4l-2 4" /></svg>
              Severe Weather
            </NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
              About
            </NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
