import { Flow, Label } from "./primitives";

export default function EuropeDiagram({ stage, arrow, coldArrow }: { stage: number; arrow: string; coldArrow: string }) {
  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  return <g key={stage} className="topic-diagram__stage">
    <Label x={45} y={65}>{seasons[stage - 1]} · seasonal ingredients</Label>
    <text x="45" y="100" className="wind-label">Conceptual south–north transect; no geographic or probability scale</text>
    <path d="M0 460H340L410 430L470 305L515 375L550 335L610 460H1000V525H0Z" fill="#cfd6cb" stroke="#586652" strokeWidth="3"/>
    <rect x="0" y="462" width="335" height="63" fill="#8ab0c4"/>
    <Label x={55} y={510}>Mediterranean</Label><Label x={440} y={485}>Alps</Label><Label x={675} y={510}>Central / northern Europe</Label>
    {stage === 1 && <><Flow d="M160 395 Q330 335 430 245" marker={arrow}/><Flow d="M850 160H530" marker={coldArrow} cold/><Label x={70} y={340} warm>Moisture + warming</Label><Label x={570} y={135}>Disturbances bring lift and shear</Label></>}
    {stage === 2 && <><circle cx="840" cy="180" r="40" fill="#edc17b"/><Flow d="M710 435 Q680 320 715 230" marker={arrow}/><Flow d="M360 430 Q430 355 465 270" marker={arrow}/><Label x={560} y={150}>Continental heating</Label><Label x={560} y={355} warm>Buoyant air rises</Label><Label x={70} y={275}>Terrain helps initiate storms</Label></>}
    {stage >= 3 && <><Flow d="M170 440 Q220 330 210 230" marker={arrow}/><Flow d="M740 180 Q430 135 260 195" marker={coldArrow} cold/><Label x={50} y={390} warm>Sea supplies heat + moisture</Label><Label x={370} y={140}>Cooler air / stronger disturbances</Label><Label x={625} y={360}>{stage === 3 ? "Land cools more quickly" : "Less continental instability"}</Label><text x="45" y="285" className="wind-label">{stage === 3 ? "Western / central Mediterranean" : "Eastern Mediterranean"}</text><text x="45" y="315" className="wind-label">Later tornado season in historical records</text></>}
  </g>;
}
