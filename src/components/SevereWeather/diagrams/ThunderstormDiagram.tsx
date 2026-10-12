import { Cloud, Flow, Label, Rain, type StormProps } from "./primitives";

export default function ThunderstormDiagram({ stage, cloud, arrow, coldArrow }: StormProps) {
  return <>
    <Label x={45} y={65}>Cooler air aloft</Label>
    {stage > 1 && <Cloud fill={cloud} small={stage === 2} faded={stage === 4}/>}
    {stage < 4 && <><Flow d={stage === 1 ? "M340 465 Q435 400 450 290" : "M340 465 Q430 350 485 145"} marker={arrow}/><Label x={90} y={420} warm>Warm, moist air</Label><Label x={215} y={240} warm>Updraft</Label></>}
    {stage === 1 && <><path d="M100 487L315 487L395 460" fill="none" stroke="#586652" strokeWidth="3"/><Label x={520} y={315}>Lift starts the ascent</Label><Label x={520} y={350}>Buoyancy can sustain it</Label></>}
    {stage >= 3 && <><Rain/><Flow d="M700 280 Q785 395 720 470 Q665 488 590 485" marker={coldArrow} cold/><Flow d="M720 470 Q800 493 900 485" marker={coldArrow} cold/><Label x={755} y={355}>Downdraft</Label><Label x={760} y={455}>Cool outflow</Label></>}
    {stage === 3 && <><path d="M565 210L545 260H572L542 315" fill="none" stroke="#fff3a8" strokeWidth="6"/><Label x={65} y={125}>Updraft + downdraft</Label></>}
    {stage === 4 && <Label x={70} y={410}>Warm inflow cut off</Label>}
  </>;
}
