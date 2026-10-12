import { Cloud, Flow, Label, type StormProps } from "./primitives";

export default function WaterspoutDiagram({ stage, cloud, arrow, coldArrow }: StormProps) {
  return <>
    <Cloud fill={cloud} small faded={stage === 4}/>
    <Label x={55} y={70}>Fair-weather pathway</Label>
    {stage < 4 && <><Flow d="M120 475H390" marker={coldArrow} cold/><Flow d="M840 475H525" marker={coldArrow} cold/><Label x={650} y={445}>Converging winds</Label></>}
    <ellipse cx="460" cy="493" rx={stage === 3 ? 40 : 70} ry="12" className="low-level-rotation"/>
    {stage >= 2 && stage < 4 && <><Flow d="M460 450V270" marker={arrow}/><Label x={535} y={320} warm>Cloud updraft stretches rotation</Label></>}
    {stage === 1 && <Label x={540} y={355}>Rotation along a surface boundary</Label>}
    {stage === 3 && <><path d="M430 360 Q458 400 452 475 L466 491 L472 430 Q467 390 490 360Z" fill={cloud}/><ellipse cx="460" cy="491" rx="46" ry="10" fill="none" stroke="#f5f9fc" strokeWidth="6"/><Label x={165} y={420}>Condensation funnel</Label><Label x={540} y={490}>Spray ring</Label></>}
    {stage === 4 && <><path d="M450 360Q475 390 455 420" fill="none" stroke="#7b8491" strokeWidth="9"/><Flow d="M690 340 Q700 460 535 480" marker={coldArrow} cold/><Label x={570} y={310}>Outflow disrupts the vortex</Label></>}
  </>;
}
