import type { ReactNode } from "react";

export function Label({ x, y, children, warm = false }: { x: number; y: number; children: ReactNode; warm?: boolean }) {
  return <text x={x} y={y} className={`weather-label${warm ? " weather-label--warm" : ""}`}>{children}</text>;
}

export type StormProps = { stage: number; cloud: string; arrow: string; coldArrow: string };
export function Cloud({ fill, small = false, faded = false }: { fill: string; small?: boolean; faded?: boolean }) {
  return <path className="supercell-cloud" opacity={faded ? 0.4 : 0.95} transform={small ? "translate(110 150) scale(.72 .6)" : undefined} d="M300 340 Q255 280 330 250 Q300 190 375 180 Q350 100 440 95 Q485 35 545 100 Q615 70 650 140 L855 175 Q925 210 850 245 L700 275 Q700 340 620 355 Q470 385 300 340Z" fill={fill}/>;
}
export function Flow({ d, marker, cold = false }: { d: string; marker: string; cold?: boolean }) {
  return <path d={d} className={`airflow-path ${cold ? "airflow-path--inflow" : "airflow-path--updraft"} topic-flow`} markerEnd={marker}/>;
}
export function Rain() {
  return <g stroke="#5e7288" strokeWidth="4" opacity=".6">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${610 + i * 18} 350 l-15 45 m5 20 l-15 55`}/>)}</g>;
}
