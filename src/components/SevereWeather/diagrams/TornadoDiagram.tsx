import { Cloud, Flow, Label, type StormProps } from "./primitives";

export default function TornadoDiagram({ stage, cloud, arrow, coldArrow }: StormProps) {
  return <>
    <Cloud fill={cloud}/>
    {stage < 5 && <Flow d="M180 465 Q320 455 445 185" marker={arrow}/>}
    {stage === 1 ? <><Flow d="M60 165H260" marker={coldArrow} cold/><Flow d="M60 350H160" marker={coldArrow} cold/><Label x={50} y={120}>Stronger wind aloft</Label><Label x={50} y={390}>Weaker wind below</Label><Label x={590} y={435}>Shear + buoyant inflow</Label></> : <>
      <ellipse cx="470" cy="280" rx="75" ry="27" className="rotation-ring"/><ellipse cx="470" cy="310" rx="55" ry="18" className="rotation-ring"/>
      <Label x={600} y={290}>Mesocyclone aloft</Label>
    </>}
    {stage >= 3 && <><Flow d="M720 325 Q790 450 580 475" marker={coldArrow} cold/><Label x={720} y={410}>Outflow</Label><ellipse cx="455" cy="488" rx={stage === 4 ? 28 : 65} ry="10" className="low-level-rotation"/></>}
    {stage === 3 && <Label x={70} y={390}>Surface rotation + stretching</Label>}
    {stage === 4 && <><path d="M423 360 Q450 400 448 440 L455 495 L470 440 Q470 400 495 360Z" fill={cloud}/><Label x={530} y={440}>Surface-connected vortex</Label></>}
    {stage === 5 && <><path d="M450 360 Q485 395 450 430 T470 495" fill="none" stroke="#636c79" strokeWidth="8"/><Label x={70} y={390}>Inflow disrupted</Label><Label x={520} y={440}>Weakening circulation</Label></>}
  </>;
}
