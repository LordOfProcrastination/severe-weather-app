# 🌪️ Severe Weather Explorer

An interactive web application for exploring tornado reports across Europe and learning about the fascinating (and sometimes destructive) weather phenomena behind them.

**🌍 [Explore the Live App](https://lordofprocrastination.github.io/severe-weather-app/)**

## 🌩️ About the Project

Severe weather has always been fascinating to me, especially tornadoes and the powerful thunderstorms that produce them.

I started this project as a way to combine my growing interest in meteorology with my experience in web development and data visualization. The goal is to make severe weather easier to explore and understand through interactive maps, visual explanations, and real-world weather reports.

The project is also an opportunity for me to experiment with new technologies, improve my development skills, and build something I'm genuinely interested in.

## 🗺️ Explore the Map

The interactive map lets you explore historical tornado and waterspout reports, starting with data from Spain.

**Features include:**

- Interactive markers and clusters showing reported events.
- Detailed event information, including location, date, and weather phenomenon.
- Searchable report list for finding individual events.
- Multiple map styles, including Standard, Satellite, and Dark.
- Quick navigation between Spain and a wider European view.
- Keyboard navigation and responsive map controls.

The long-term goal is to expand the map with additional European datasets as suitable sources become available.

## 📚 Learn About Severe Weather

Beyond the map, the application includes educational pages explaining how different severe weather phenomena develop.

Each topic combines interactive or staged illustrations with explanations of the meteorology involved.

| Topic                           | What you'll learn                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| 🌩️ **Supercells**               | How rotating thunderstorms form, develop, and organize                                   |
| 🌪️ **Tornadoes**                | Tornado formation, storm types, lifecycle, and the Enhanced Fujita scale                 |
| ⛈️ **Thunderstorms**            | The ingredients behind thunderstorms, their lifecycle, lightning, and associated hazards |
| 🌊 **Waterspouts**              | How waterspouts develop and where they occur in Europe                                   |
| 🌍 **Severe Weather in Europe** | Regional weather patterns, seasonal conditions, and challenges with historical reporting |

The visualizations are designed to make complicated weather processes easier to understand. They are conceptual illustrations rather than scientific simulations or forecasts.

## 👨‍💻 About Me

I'm an IT graduate from Norway with a particular interest in frontend development, interactive applications, and data visualization.

This project brings together two things I enjoy: building software and learning about severe weather.

You can read more about my background, the motivation behind the project, and view my CV on the application's **About** page.

## 🛠️ Built With

- **React & TypeScript** — Application development
- **Vite** — Development environment and build tooling
- **OpenLayers** — Interactive maps and event visualization
- **D3.js** — Interactive meteorological visualizations
- **SVG & CSS** — Educational diagrams and animations
- **Papa Parse** — Processing CSV weather reports
- **GitHub Pages** — Hosting and deployment

## 🚀 Running Locally

Want to explore the code or run the application yourself?

Clone the repository and install the dependencies:

```bash
git clone https://github.com/LordOfProcrastination/severe-weather-app.git
cd severe-weather-app
npm install
```

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

The production build also runs the TypeScript checks.

**Map configuration:** Satellite and Dark map styles require a MapTiler API key configured through the `VITE_MAPTILER_KEY` environment variable. The Standard map does not require this key.

The application uses hash-based routing for compatibility with GitHub Pages.

## 📂 Project Structure

The educational pages use reusable components, allowing new weather topics to be added without rebuilding the layout and navigation.

```text
src/components/SevereWeather/
├── data/         # Educational content for each topic
├── diagrams/     # SVG illustrations and drawing components
├── selector/     # Weather topic selection
├── shared/       # Reusable controls, styles and information
├── supercell/    # Original interactive D3 visualization
├── topics/       # Shared educational page layout
└── types.ts      # Shared TypeScript definitions
```

Each component manages its own styles, including responsive layouts and reduced-motion support.

Educational diagrams use numbered stages with Previous/Next navigation, and include written descriptions alongside their visual explanations.

## 📊 Weather Data & Sources

### AEMET SINOBAS — Spain

The tornado and waterspout reports currently displayed on the map come from **AEMET SINOBAS** (_Sistema de Notificación de Observaciones Atmosféricas Singulares_), operated by Spain's national meteorological agency.

AEMET authorizes the use and reproduction of this information when properly credited.

The data is transformed into a common event format, making it easier to integrate additional European sources in the future.

**Important:** The reports are presented for educational and visualization purposes only. They are not intended for administrative, legal, or operational weather-warning use.

Source: [AEMET SINOBAS](https://sinobas.aemet.es/)

## 🔭 What's Next?

This is an ongoing personal project, and there are several areas I'd like to continue exploring:

- Expand the map with tornado reports from more European countries.
- Add more interactive weather visualizations.
- Improve the experience of exploring historical severe weather events.
- Continue refining the interface, accessibility, and mobile experience.

The idea is to keep learning, experimenting, and gradually turn the application into a more comprehensive resource for exploring severe weather in Europe.

---

**🌪️ [Try the Severe Weather Explorer](https://lordofprocrastination.github.io/severe-weather-app/)**

_Built out of curiosity, an interest in meteorology, and a love for creating interactive applications._
