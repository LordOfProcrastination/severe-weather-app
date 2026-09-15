import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface SupercellStage {
  id: number;
  title: string;
  description: string;
}

const stages: SupercellStage[] = [
  {
    id: 1,
    title: "Ingredients come together",
    description:
      "Warm, moist air near the surface, cooler drier air aloft, instability and wind shear create an environment where powerful thunderstorms can develop.",
  },
  {
    id: 2,
    title: "A strong thunderstorm develops",
    description:
      "Warm, buoyant air rises rapidly and creates a strong updraft. As the air rises and cools, water vapor condenses and a thunderstorm begins to grow.",
  },
  {
    id: 3,
    title: "Wind shear creates horizontal rotation",
    description:
      "Changes in wind speed and direction with height can create horizontal rolling motion in the atmosphere.",
  },
  {
    id: 4,
    title: "The updraft tilts the rotation",
    description:
      "The strong thunderstorm updraft can lift and tilt horizontally rotating air into the vertical.",
  },
  {
    id: 5,
    title: "A mesocyclone develops",
    description:
      "The vertically oriented rotation can become organized within the storm's updraft, creating a persistent rotating updraft called a mesocyclone.",
  },
  {
    id: 6,
    title: "Rotation strengthens near the ground",
    description:
      "Under favorable conditions, rotation can intensify closer to the surface as storm inflow and downdrafts interact with the rotating updraft.",
  },
  {
    id: 7,
    title: "A tornado may form",
    description:
      "If near-surface rotation becomes sufficiently concentrated and connects with the storm's circulation, a tornado may develop. Most supercells do not produce tornadoes.",
  },
];

function SupercellVisualization() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [stage, setStage] = useState(1);

  const currentStage = stages[stage - 1];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const width = 1000;
    const height = 560;
    const groundY = 500;

    svg.selectAll("*").interrupt();
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    appendDefs(svg);

    /*
     * BACKGROUND
     */

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#supercell-sky-gradient)");

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", groundY)
      .attr("width", width)
      .attr("height", height - groundY)
      .attr("fill", "url(#supercell-ground-gradient)");

    svg
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", groundY)
      .attr("y2", groundY)
      .attr("class", "supercell-ground");

    /*
     * STAGE 1 LABELS
     */

    if (stage === 1) {
      appendLabel(
        svg,
        "Warm, moist air",
        135,
        438,
        "weather-label weather-label--warm",
      );
    }

    if (stage >= 1) {
      appendLabel(
        svg,
        "Cooler, drier air aloft",
        770,
        88,
        "weather-label weather-label--cold",
      );
    }

    /*
     * CLOUD + STORM STRUCTURE
     */

    if (stage >= 2) {
      const cloudPoints: [number, number][] = [
        [340, 380],
        [325, 340],
        [350, 285],
        [385, 245],
        [415, 175],
        [455, 120],
        [505, 85],
        [565, 90],
        [620, 125],
        [690, 145],
        [770, 165],
        [855, 188],
        [915, 220],
        [865, 255],
        [780, 272],
        [700, 290],
        [650, 330],
        [605, 375],
        [545, 405],
        [455, 405],
        [380, 392],
      ];

      const cloudLine = d3
        .line<[number, number]>()
        .curve(d3.curveBasisClosed)
        .x((d) => d[0])
        .y((d) => d[1]);

      const cloudPathData = cloudLine(cloudPoints);

      if (cloudPathData) {
        svg
          .append("path")
          .attr("d", cloudPathData)
          .attr("class", "supercell-cloud")
          .attr("fill", "url(#supercell-cloud-gradient)")
          .attr("opacity", 0)
          .transition()
          .duration(800)
          .attr("opacity", 0.98);

        svg
          .append("path")
          .attr("d", cloudPathData)
          .attr("class", "supercell-cloud-highlight")
          .attr("fill", "url(#supercell-cloud-highlight)")
          .attr("opacity", 0.35);
      }
    }

    /*
     * INFLOW
     */

    if (stage >= 2) {
      svg
        .append("path")
        .attr(
          "d",
          `
          M 55 447
          C 145 447,
            225 438,
            345 390
          `,
        )
        .attr("class", "airflow-path airflow-path--inflow")
        .attr("stroke-dashoffset", 80)
        .transition()
        .duration(900)
        .attr("stroke-dashoffset", 0);

      appendLabel(
        svg,
        "Warm, moist inflow",
        155,
        445,
        "weather-label weather-label--warm",
      );
    }

    /*
     * UPDRAFT
     */

    if (stage >= 2) {
      const updraftPath = svg
        .append("path")
        .attr(
          "d",
          `
          M 320 455
          C 380 410,
            425 335,
            458 255
          C 485 190,
            505 125,
            525 55
          `,
        )
        .attr("class", "airflow-path airflow-path--updraft");

      const pathNode = updraftPath.node();

      if (pathNode) {
        createAirParticles(svg, pathNode);
      }

      appendLabel(svg, "Strong updraft", 422, 300, "weather-label");
    }

    /*
     * LIGHTNING
     */

    if (stage >= 2) {
      drawLightning(svg, stage, width, height);
    }

    /*
     * STAGE 3: HORIZONTAL ROTATION
     */

    if (stage === 3) {
      drawHorizontalRotation(svg);
    }

    /*
     * STAGE 4: TILTING
     */

    if (stage === 4) {
      drawTiltedRotation(svg);
    }

    /*
     * STAGES 5+: RAIN CORE + MESOCYCLONE
     */

    if (stage >= 5) {
      drawRainCore(svg);
      drawMesocyclone(svg);
    }

    /*
     * STAGE 6+: LOW-LEVEL ROTATION
     */

    if (stage >= 6) {
      drawLowLevelRotation(svg);
      drawWallCloud(svg);
    }

    /*
     * STAGE 7: TORNADO
     */

    if (stage >= 7) {
      drawTornado(svg);
    }

    return () => {
      svg.selectAll("*").interrupt();
      svg.selectAll("*").remove();
    };
  }, [stage]);

  function previousStage() {
    setStage((current) => Math.max(1, current - 1));
  }

  function nextStage() {
    setStage((current) => Math.min(stages.length, current + 1));
  }

  return (
    <article className="weather-visualization">
      <div className="weather-visualization__header">
        <div>
          <p className="weather-visualization__eyebrow">Tornadic storm type</p>
          <h3>Supercell Thunderstorm</h3>
        </div>

        <p>
          Follow the development of a rotating thunderstorm from the initial
          atmospheric ingredients to the possible formation of a tornado.
        </p>
      </div>

      <div className="storm-stage-navigation">
        {stages.map((item) => (
          <button
            key={item.id}
            className={`storm-stage-button ${
              stage === item.id ? "storm-stage-button--active" : ""
            } ${stage > item.id ? "storm-stage-button--complete" : ""}`}
            onClick={() => setStage(item.id)}
            aria-label={`Go to stage ${item.id}: ${item.title}`}
          >
            {item.id}
          </button>
        ))}
      </div>

      <div className="supercell-diagram">
        <svg
          ref={svgRef}
          role="img"
          aria-label={`Stage ${stage}: ${currentStage.title}`}
        />
      </div>

      <div className="storm-stage-info">
        <div className="storm-stage-info__text">
          <span>
            Stage {stage} of {stages.length}
          </span>
          <h4>{currentStage.title}</h4>
          <p>{currentStage.description}</p>
        </div>

        <div className="storm-stage-controls">
          <button onClick={previousStage} disabled={stage === 1}>
            ← Previous
          </button>

          <button onClick={nextStage} disabled={stage === stages.length}>
            Next →
          </button>
        </div>
      </div>
    </article>
  );
}

function appendDefs(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  const defs = svg.append("defs");

  const skyGradient = defs
    .append("linearGradient")
    .attr("id", "supercell-sky-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  skyGradient.append("stop").attr("offset", "0%").attr("stop-color", "#bcc9d4");
  skyGradient
    .append("stop")
    .attr("offset", "55%")
    .attr("stop-color", "#d4dcdc");
  skyGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#e3e5df");

  const groundGradient = defs
    .append("linearGradient")
    .attr("id", "supercell-ground-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  groundGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#d6dbd2");
  groundGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#cfd6cb");

  const cloudGradient = defs
    .append("linearGradient")
    .attr("id", "supercell-cloud-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  cloudGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#7b8491");
  cloudGradient
    .append("stop")
    .attr("offset", "45%")
    .attr("stop-color", "#636c79");
  cloudGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#4a515d");

  const cloudHighlight = defs
    .append("radialGradient")
    .attr("id", "supercell-cloud-highlight")
    .attr("cx", "35%")
    .attr("cy", "18%")
    .attr("r", "70%");

  cloudHighlight
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ffffff");
  cloudHighlight
    .append("stop")
    .attr("offset", "28%")
    .attr("stop-color", "#dfe4ea");
  cloudHighlight
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ffffff")
    .attr("stop-opacity", 0);

  const rainGradient = defs
    .append("linearGradient")
    .attr("id", "supercell-rain-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  rainGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#5e7288")
    .attr("stop-opacity", 0.45);
  rainGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#6f8295")
    .attr("stop-opacity", 0.08);

  const lightningGlow = defs
    .append("radialGradient")
    .attr("id", "supercell-lightning-glow")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%");

  lightningGlow
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#fff8cc")
    .attr("stop-opacity", 1);
  lightningGlow
    .append("stop")
    .attr("offset", "45%")
    .attr("stop-color", "#fff1a6")
    .attr("stop-opacity", 0.45);
  lightningGlow
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#fff1a6")
    .attr("stop-opacity", 0);
}

function appendLabel(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  text: string,
  x: number,
  y: number,
  className: string,
) {
  svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("class", className)
    .text(text);
}

function createAirParticles(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  path: SVGPathElement,
) {
  const pathLength = path.getTotalLength();
  const particles = d3.range(7);

  svg
    .selectAll(".air-particle")
    .data(particles)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("class", "air-particle")
    .each(function (_, index) {
      animateParticle(d3.select(this), path, pathLength, index * 500);
    });
}

function animateParticle(
  particle: d3.Selection<SVGCircleElement, number, null, undefined>,
  path: SVGPathElement,
  pathLength: number,
  delay: number,
) {
  particle
    .attr("opacity", 0)
    .transition()
    .delay(delay)
    .duration(3400)
    .ease(d3.easeLinear)
    .attr("opacity", 1)
    .attrTween("transform", () => {
      return (t) => {
        const point = path.getPointAtLength(t * pathLength);
        return `translate(${point.x}, ${point.y})`;
      };
    })
    .on("end", function () {
      animateParticle(d3.select(this), path, pathLength, 0);
    });
}

function drawHorizontalRotation(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  svg
    .append("text")
    .attr("x", 145)
    .attr("y", 290)
    .attr("class", "weather-label")
    .text("Horizontal rotation");

  svg
    .append("text")
    .attr("x", 70)
    .attr("y", 165)
    .attr("class", "wind-label")
    .text("Stronger winds aloft  → → → →");

  svg
    .append("text")
    .attr("x", 70)
    .attr("y", 208)
    .attr("class", "wind-label")
    .text("Weaker surface winds  → →");

  svg
    .append("path")
    .attr(
      "d",
      `
      M 175 348
      C 228 318,
        295 318,
        350 348
      C 295 378,
        228 378,
        175 348
      `,
    )
    .attr("class", "rotation-arrow");

  svg
    .append("path")
    .attr(
      "d",
      `
      M 258 348
      C 311 318,
        378 318,
        433 348
      C 378 378,
        311 378,
        258 348
      `,
    )
    .attr("class", "rotation-arrow");
}

function drawTiltedRotation(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  const group = svg.append("g").attr("transform", "translate(425 335)");

  group
    .append("ellipse")
    .attr("rx", 72)
    .attr("ry", 22)
    .attr("class", "rotation-ring")
    .attr("transform", "rotate(-45)");

  group
    .append("ellipse")
    .attr("rx", 52)
    .attr("ry", 16)
    .attr("class", "rotation-ring rotation-ring--inner")
    .attr("transform", "translate(36 -44) rotate(-63)");

  appendLabel(svg, "Rotation tilted vertically", 565, 300, "weather-label");
}

function drawRainCore(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  svg
    .append("path")
    .attr(
      "d",
      `
      M 690 295
      C 730 355,
        760 420,
        780 500
      L 640 500
      C 645 420,
        660 350,
        690 295
      Z
      `,
    )
    .attr("class", "rain-core")
    .attr("fill", "url(#supercell-rain-gradient)");
}

function drawMesocyclone(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  const rotationGroup = svg
    .append("g")
    .attr("class", "mesocyclone")
    .attr("transform", "translate(492, 316)");

  rotationGroup
    .append("ellipse")
    .attr("rx", 78)
    .attr("ry", 30)
    .attr("class", "rotation-ring");

  rotationGroup
    .append("ellipse")
    .attr("rx", 56)
    .attr("ry", 21)
    .attr("class", "rotation-ring rotation-ring--inner");

  rotationGroup
    .append("ellipse")
    .attr("rx", 35)
    .attr("ry", 13)
    .attr("class", "rotation-ring");

  function rotate() {
    rotationGroup
      .transition()
      .duration(5000)
      .ease(d3.easeLinear)
      .attrTween("transform", () =>
        d3.interpolateString(
          "translate(492, 316) rotate(0)",
          "translate(492, 316) rotate(360)",
        ),
      )
      .on("end", rotate);
  }

  rotate();

  appendLabel(svg, "Mesocyclone", 595, 318, "weather-label");
}

function drawLowLevelRotation(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  const group = svg.append("g").attr("transform", "translate(482, 405)");

  group
    .append("ellipse")
    .attr("rx", 58)
    .attr("ry", 18)
    .attr("class", "low-level-rotation");

  group
    .append("ellipse")
    .attr("rx", 37)
    .attr("ry", 11)
    .attr("class", "low-level-rotation");

  appendLabel(svg, "Low-level rotation", 555, 425, "weather-label");
}

function drawWallCloud(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  svg
    .append("ellipse")
    .attr("cx", 460)
    .attr("cy", 382)
    .attr("rx", 55)
    .attr("ry", 22)
    .attr("class", "wall-cloud");
}

function drawTornado(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) {
  svg
    .append("path")
    .attr(
      "d",
      `
      M 452 382
      C 462 402,
        486 414,
        474 438
      C 462 460,
        482 474,
        470 498
      `,
    )
    .attr("class", "tornado-funnel")
    .attr("opacity", 0)
    .transition()
    .duration(900)
    .attr("opacity", 0.88);

  appendLabel(svg, "Possible tornado", 532, 480, "weather-label");
}

function drawLightning(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  stage: number,
  width: number,
  height: number,
) {
  const settings =
    stage >= 5
      ? { minDelay: 900, maxDelay: 2100, flashOpacity: 0.14, glowOpacity: 0.42 }
      : stage >= 3
        ? {
            minDelay: 1500,
            maxDelay: 3200,
            flashOpacity: 0.1,
            glowOpacity: 0.3,
          }
        : {
            minDelay: 2200,
            maxDelay: 4200,
            flashOpacity: 0.08,
            glowOpacity: 0.22,
          };

  const flash = svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("class", "lightning-flash")
    .attr("opacity", 0);

  const glow = svg
    .append("ellipse")
    .attr("cx", 735)
    .attr("cy", 270)
    .attr("rx", 180)
    .attr("ry", 115)
    .attr("fill", "url(#supercell-lightning-glow)")
    .attr("class", "lightning-glow")
    .attr("opacity", 0);

  const lightningGroup = svg.append("g").attr("class", "lightning-group");

  const boltPaths = [
    `
    M 740 238
    L 720 285
    L 746 285
    L 715 346
    L 752 304
    L 730 304
    L 760 262
    `,
    `
    M 795 225
    L 774 270
    L 798 270
    L 770 330
    L 805 292
    L 783 292
    L 812 252
    `,
    `
    M 690 248
    L 672 290
    L 694 290
    L 666 344
    L 700 309
    L 680 309
    L 708 270
    `,
  ];

  const bolts = boltPaths.map((pathData) =>
    lightningGroup
      .append("path")
      .attr("d", pathData)
      .attr("class", "lightning-bolt")
      .attr("opacity", 0),
  );

  function strikeCycle() {
    const delay =
      settings.minDelay +
      Math.random() * (settings.maxDelay - settings.minDelay);

    const selectedBolt = bolts[Math.floor(Math.random() * bolts.length)];

    selectedBolt
      .transition()
      .delay(delay)
      .duration(70)
      .attr("opacity", 1)
      .transition()
      .duration(70)
      .attr("opacity", 0.2)
      .transition()
      .duration(70)
      .attr("opacity", 1)
      .transition()
      .duration(150)
      .attr("opacity", 0)
      .on("end", strikeCycle);

    flash
      .transition()
      .delay(delay)
      .duration(45)
      .attr("opacity", settings.flashOpacity)
      .transition()
      .duration(65)
      .attr("opacity", settings.flashOpacity * 0.28)
      .transition()
      .duration(65)
      .attr("opacity", settings.flashOpacity * 0.8)
      .transition()
      .duration(120)
      .attr("opacity", 0);

    glow
      .transition()
      .delay(delay - 10)
      .duration(55)
      .attr("opacity", settings.glowOpacity)
      .transition()
      .duration(70)
      .attr("opacity", settings.glowOpacity * 0.35)
      .transition()
      .duration(70)
      .attr("opacity", settings.glowOpacity * 0.9)
      .transition()
      .duration(130)
      .attr("opacity", 0);
  }

  strikeCycle();
}

export default SupercellVisualization;
