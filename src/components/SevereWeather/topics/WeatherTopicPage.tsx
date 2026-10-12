import { useState } from "react";
import WeatherInformation from "../shared/WeatherInformation";
import TopicDiagram from "../diagrams/TopicDiagram";
import { weatherTopics } from "../data/weatherTopics";
import type { TopicId } from "../types";
import "../shared/Visualization.css";
import "../shared/StageControls.css";
import "./WeatherTopicPage.css";

export default function WeatherTopicPage({ topic }: { topic: TopicId }) {
  const [stage, setStage] = useState(1);
  const content = weatherTopics[topic];
  const current = content.stages[stage - 1];
  return <article className="weather-visualization weather-topic">
    <div className="weather-visualization__header">
      <div><p className="weather-visualization__eyebrow">Severe weather explained</p><h3>{content.title}</h3></div>
      <p>{content.introduction}</p>
    </div>
    <nav className="storm-stage-navigation" aria-label={`${content.title} stages`}>
      {content.stages.map((item, index) => <button key={item.title} className={`storm-stage-button ${stage === index + 1 ? "storm-stage-button--active" : stage > index + 1 ? "storm-stage-button--complete" : ""}`} onClick={() => setStage(index + 1)} aria-current={stage === index + 1 ? "step" : undefined} aria-label={`Go to stage ${index + 1}: ${item.title}`}>{index + 1}</button>)}
    </nav>
    <TopicDiagram topic={topic} stage={stage} title={current.title} description={current.description}/>
    <div className="storm-stage-info">
      <div className="storm-stage-info__text" aria-live="polite" aria-atomic="true"><span>Stage {stage} of {content.stages.length}</span><h4>{current.title}</h4><p>{current.description}</p></div>
      <div className="storm-stage-controls"><button onClick={() => setStage(value => Math.max(1, value - 1))} disabled={stage === 1}>← Previous</button><button onClick={() => setStage(value => Math.min(content.stages.length, value + 1))} disabled={stage === content.stages.length}>Next →</button></div>
    </div>
    <p className="weather-topic__disclaimer">Simplified educational illustration, not a simulation or forecast. {topic === "europe" ? "Seasonal patterns vary by region and hazard; arrows do not represent observed winds." : "Arrows show airflow and rings show rotation; dimensions and timing are not to scale."}</p>
    <WeatherInformation
      sections={content.sections}
      sources={content.sources}
      renderSectionExtra={(section) => topic === "tornadoes" && section.title === "Reading the Enhanced Fujita scale" ? (
        <div className="weather-topic__table"><table><caption>US EF scale: estimated three-second gusts from damage</caption><thead><tr><th scope="col">Rating</th><th scope="col">Wind estimate (mph)</th><th scope="col">Approx. km/h</th></tr></thead><tbody>{[["EF0", "65–85", "105–137"], ["EF1", "86–110", "138–177"], ["EF2", "111–135", "178–217"], ["EF3", "136–165", "218–266"], ["EF4", "166–200", "267–322"], ["EF5", "Over 200", "Over 322"]].map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table></div>
      ) : null}
    />
  </article>;
}
