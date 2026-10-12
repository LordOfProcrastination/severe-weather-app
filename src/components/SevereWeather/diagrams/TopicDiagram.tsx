import { useId } from "react";
import type { TopicId } from "../types";
import ThunderstormDiagram from "./ThunderstormDiagram";
import TornadoDiagram from "./TornadoDiagram";
import WaterspoutDiagram from "./WaterspoutDiagram";
import EuropeDiagram from "./EuropeDiagram";
import "../shared/Diagram.css";
import "./TopicDiagram.css";

export default function TopicDiagram({ topic, stage, title, description }: { topic: TopicId; stage: number; title: string; description: string }) {
  const id = useId().replace(/:/g, "");
  const water = topic === "waterspout";
  const arrow = `url(#${id}-arrow)`;
  const coldArrow = `url(#${id}-cold-arrow)`;
  return (
    <div className="supercell-diagram topic-diagram" tabIndex={0} role="region" aria-label="Interactive stage diagram. On small screens, scroll horizontally to explore the full illustration.">
      <svg viewBox="0 0 1000 560" role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-description`}>{description} Orange arrows show rising or warm air; blue arrows show incoming or descending air. Dashed red rings show rotation.</desc>
        <defs>
          <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="#bcc9d4"/><stop offset="1" stopColor="#e3e5df"/></linearGradient>
          <linearGradient id={`${id}-cloud`} x2="0" y2="1"><stop stopColor="#7b8491"/><stop offset="1" stopColor="#4a515d"/></linearGradient>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#dd7440"/></marker>
          <marker id={`${id}-cold-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#5e8fbd"/></marker>
        </defs>
        <rect width="1000" height="560" fill={`url(#${id}-sky)`}/>
        {topic === "europe" ? <EuropeDiagram stage={stage} arrow={arrow} coldArrow={coldArrow}/> : <>
          <rect y="500" width="1000" height="60" fill={water ? "#8ab0c4" : "#cfd6cb"}/>
          <path d="M0 500H1000" stroke={water ? "#3e6e97" : "#586652"} strokeWidth="4"/>
          {water && <path d="M0 526 Q25 510 50 526 T100 526 T150 526 T200 526 T250 526 T300 526 T350 526 T400 526 T450 526 T500 526 T550 526 T600 526 T650 526 T700 526 T750 526 T800 526 T850 526 T900 526 T950 526 T1000 526" fill="none" stroke="#d4e5eb" strokeWidth="3"/>}
          <g key={stage} className="topic-diagram__stage">
            {topic === "thunderstorms" ? <ThunderstormDiagram stage={stage} cloud={`url(#${id}-cloud)`} arrow={arrow} coldArrow={coldArrow}/> : water ? <WaterspoutDiagram stage={stage} cloud={`url(#${id}-cloud)`} arrow={arrow} coldArrow={coldArrow}/> : <TornadoDiagram stage={stage} cloud={`url(#${id}-cloud)`} arrow={arrow} coldArrow={coldArrow}/>}
          </g>
        </>}
        <text x="30" y="548" className="topic-diagram__note">Educational schematic • not to scale</text>
      </svg>
    </div>
  );
}
