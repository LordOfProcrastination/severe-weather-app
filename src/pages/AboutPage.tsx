import { useState } from "react";
import { Link } from "react-router";
import CvViewer from "../components/About/CvViewer";
import "./AboutPage.css";

const technologies = [
  "React", "TypeScript", "JavaScript", "HTML & CSS", "Node.js",
  "API integrations", "D3.js", "Power BI Visual Tools", "Git & GitHub",
];

function AboutPage() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <main className="about-page">
      <header className="about-page__intro">
        <p className="about-page__eyebrow">About this project</p>
        <h2>A personal interest.<br />An interactive project.</h2>
        <p>
          I’m Henrik, the developer behind Severe Weather Europe. I built this app
          to bring two interests together: understanding severe weather and
          creating interactive applications.
        </p>
      </header>

      <div className="about-page__story-grid">
        <section className="about-page__panel about-page__story" aria-labelledby="about-story-title">
          <p className="about-page__eyebrow">The story behind the app</p>
          <h3 id="about-story-title">Why I built this</h3>
          <p>
            Over the last few years, I’ve become increasingly interested in
            meteorology, especially tornadoes, supercells and thunderstorms.
            I’m fascinated by how atmospheric conditions can come together to
            produce something so powerful, and sometimes destructive.
          </p>
          <p>
            After finishing my bachelor’s degree in Information Technology in
            2025, I worked on a portfolio management system for Kristiania
            University College. As that project approached completion, I wanted
            to build something of my own that would give me room to explore
            data visualization and frontend development further.
          </p>
          <p>
            Severe weather gave me a subject I wanted to spend time learning
            about. This app became a way to explore the science while working
            through practical questions about maps, data and interactive diagrams.
          </p>
          <div className="about-page__learning">
            <h4>Learning by building</h4>
            <p>
              I’m using this project to get better at turning data into something
              people can explore and understand. Working with geographical
              records and explaining atmospheric processes visually gives me
              new problems to solve as a developer, as well as more reasons to
              keep learning about the weather.
            </p>
          </div>
        </section>

        <section className="about-page__panel about-page__developer" aria-labelledby="about-developer-title">
          <p className="about-page__eyebrow">Behind the project</p>
          <h3 id="about-developer-title">Henrik Aulie</h3>
          <p className="about-page__role">Norwegian developer · Frontend &amp; mobile</p>
          <p>
            I enjoy solving problems, understanding how systems work, and building
            applications that are useful and enjoyable to use. Practical projects
            are how I like to learn new technologies and develop my skills.
          </p>
          <dl className="about-page__background">
            <div>
              <dt>Education <span>2022–2025</span></dt>
              <dd>Bachelor’s in Information Technology, specializing in frontend
                and mobile development, at Kristiania University College.</dd>
            </div>
            <div>
              <dt>Experience <span>July 2025–August 2026</span></dt>
              <dd>Fullstack Developer / Consultant at Kristiania. I worked on
                frontend development, API integrations and a custom Power BI
                visualization inspired by the BCG matrix for the online education
                department’s portfolio management system.</dd>
            </div>
          </dl>
          <h4>Technologies I’ve worked with</h4>
          <ul className="about-page__technologies" aria-label="Technical experience">
            {technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="about-page__actions">
            <button className="about-page__button" onClick={() => setCvOpen(true)} aria-haspopup="dialog">View My CV</button>
            <a className="about-page__github" href="https://github.com/LordOfProcrastination" target="_blank" rel="noopener noreferrer">
              GitHub profile <span aria-hidden="true">↗</span><span className="about-page__sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </div>

      <section className="about-page__explore" aria-labelledby="about-explore-title">
        <p className="about-page__eyebrow">Inside the app</p>
        <h3 id="about-explore-title">What you can explore</h3>
        <div className="about-page__features">
          <article className="about-page__panel">
            <span className="about-page__feature-number" aria-hidden="true">01 / Explore</span>
            <h4>Historical events</h4>
            <p>Browse tornado and waterspout reports on the interactive map.
              The current dataset comes from Spain’s AEMET SINOBAS; expanding
              coverage across Europe is a goal for the project.</p>
            <Link to="/">Explore the map <span aria-hidden="true">→</span></Link>
          </article>
          <article className="about-page__panel">
            <span className="about-page__feature-number" aria-hidden="true">02 / Understand</span>
            <h4>The science behind storms</h4>
            <p>Read about thunderstorms, tornadoes, waterspouts and severe
              weather in Europe, with explanations and links to meteorological
              sources for further reading.</p>
            <Link to="/severe-weather/thunderstorms">Learn about thunderstorms <span aria-hidden="true">→</span></Link>
          </article>
          <article className="about-page__panel">
            <span className="about-page__feature-number" aria-hidden="true">03 / Interact</span>
            <h4>Processes, step by step</h4>
            <p>Move through illustrated stages to see how storm ingredients
              interact. These simplified diagrams are learning tools, rather
              than exact simulations or forecasts.</p>
            <Link to="/severe-weather">Follow a supercell <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <footer className="about-page__note">
        <h3>A project for learning and sharing</h3>
        <p>This is my personal, non-commercial project, built for exploration and
          education. I’m approaching meteorology as an interested developer, and
          I want to keep improving both the application and my understanding of
          the subject as I go.</p>
      </footer>
      {cvOpen && <CvViewer onClose={() => setCvOpen(false)} />}
    </main>
  );
}

export default AboutPage;
