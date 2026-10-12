import type { ReactNode } from "react";
import type { WeatherTopic } from "../types";
import "./WeatherInformation.css";

interface WeatherInformationProps {
  sections: WeatherTopic["sections"];
  sources: WeatherTopic["sources"];
  renderSectionExtra?: (section: WeatherTopic["sections"][number]) => ReactNode;
}

export default function WeatherInformation({
  sections,
  sources,
  renderSectionExtra,
}: WeatherInformationProps) {
  return (
    <>
      {sections.map((section) => (
        <section className="weather-topic__section" key={section.title}>
          <h4>{section.title}</h4>
          {section.paragraphs.map((text) => <p key={text}>{text}</p>)}
          {renderSectionExtra?.(section)}
        </section>
      ))}
      <section className="weather-topic__section weather-topic__sources">
        <h4>Sources &amp; further reading</h4>
        <p>Background for the processes, limitations and regional patterns described above.</p>
        <ul>
          {sources.map((source) => (
            <li key={source.url}><a href={source.url}>{source.title}</a></li>
          ))}
        </ul>
      </section>
    </>
  );
}
