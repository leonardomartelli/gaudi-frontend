import { useContext, useEffect, useRef } from "react";
import { EvolutionViewerContract } from "./evolution-viewer.interface";
import * as d3 from "d3";
import constants from "../../../assets/constants";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import styles from "./evolution-viewer.module.scss";

export function EvolutionViewer(props: EvolutionViewerContract) {
  const ref = useRef(null);

  const margin = 10;

  const width = 550 - margin - margin,
    height = 370 - margin - margin;

  const svg = d3.select(ref.current);

  const context = useContext(OptimizationContext);

  svg.attr("viewBox", [-60, -40, width + 120, height + 60]);

  useEffect(() => {
    const maxVol = context.width * context.height;
    const volumes: [number, number][] = [];
    const objectives: [number, number][] = [];

    for (let i = 0; i < context.volumes.length; i++)
      volumes.push([i, context.volumes[i]]);

    for (let i = 0; i < context.objectives.length; i++)
      objectives.push([i, context.objectives[i]]);

    const { x, volumeY, volumeLine } = getVolumeLine(maxVol);

    const { objectiveY, objectiveLine, ticks } = getObjectiveLine();

    svg.selectAll("g").remove();

    drawXAxis(svg, height, margin, x, width);

    const axisFontSize = "18pt";
    const axisStrokeOpacity = 0.5;
    const axisStrokeWidth = "2px";

    drawLeftYAxis(
      svg,
      margin,
      volumeY,
      width,
      axisStrokeWidth,
      height,
      axisFontSize
    );

    drawRightYAxis(
      svg,
      width,
      margin,
      objectiveY,
      ticks,
      axisStrokeOpacity,
      axisStrokeWidth,
      height,
      axisFontSize
    );

    drawVolumeLine(svg, volumeLine, volumes);

    drawObjectiveLine(svg, objectiveLine, objectives);

    function getVolumeLine(maxVol: number) {
      const x = d3.scaleLinear(
        [0, context.volumes.length],
        [margin, width - margin]
      );

      const volumeY = d3.scaleLinear([0, 100], [height - margin, margin]);

      const volumeLine = d3
        .line()
        .x((d: [number, number]) => x(d[0]))
        .y((d: [number, number]) => volumeY((d[1] / maxVol) * 100));

      return { x, volumeY, volumeLine };
    }

    function getObjectiveLine() {
      const x = d3.scaleLinear(
        [0, context.volumes.length],
        [margin, width - margin]
      );

      const max = context.objectives.reduce((a, b) => {
        return Math.max(a, b);
      }, 0);

      const objectiveY = d3.scaleLinear([0, max], [height - margin, margin]);

      const objectiveLine = d3
        .line()
        .x((d: [number, number]) => x(d[0]))
        .y((d: [number, number]) => objectiveY(d[1]));

      const ticks = [0];

      for (let i = 1; i <= 10; i++) {
        let tick = max * (i / 10);

        if (tick > 10) tick = Math.round(tick);

        ticks.push(tick);
      }

      return { objectiveY, objectiveLine, ticks };
    }
  }, [
    context.height,
    context.objectives,
    context.volumes,
    context.width,
    height,
    margin,
    svg,
    width,
  ]);

  return (
    <div className={styles.graph}>
      <svg className={styles.drawing} ref={ref}></svg>
    </div>
  );
}
function drawObjectiveLine(
  svg: d3.Selection<null, unknown, null, undefined>,
  objectiveLine: d3.Line<[number, number]>,
  objectives: [number, number][]
) {
  svg
    .selectAll(".objLine")
    .data(d3.range(1))
    .join("path")
    .attr("fill", "none")
    .attr("class", "objLine")
    .attr("stroke", constants.ALICE_BLUE)
    .attr("stroke-width", 4)
    .attr("d", objectiveLine(objectives))
    .raise();
}

function drawVolumeLine(
  svg: d3.Selection<null, unknown, null, undefined>,
  volumeLine: d3.Line<[number, number]>,
  volumes: [number, number][]
) {
  svg
    .selectAll(".volLine")
    .data(d3.range(1))
    .join("path")
    .attr("fill", "none")
    .attr("class", "volLine")
    .attr("stroke", constants.FROG_GREEN)
    .attr("stroke-width", 4)
    .attr("d", volumeLine(volumes))
    .raise();
}

function drawRightYAxis(
  svg: d3.Selection<null, unknown, null, undefined>,
  width: number,
  margin: number,
  objectiveY: d3.ScaleLinear<number, number, never>,
  ticks: number[],
  axisStrokeOpacity: number,
  axisStrokeWidth: string,
  height: number,
  axisFontSize: string
) {
  svg
    .append("g")
    .attr("transform", `translate(${width - margin},0)`)
    .attr("color", constants.ALICE_BLUE)
    .call(d3.axisRight(objectiveY).tickValues(ticks).tickSize(1))
    .call((g) => g.select(".domain").remove())
    .call((g) => {
      g.selectAll(".tick line")
        .clone()
        .attr("x2", -width + 2 * margin)
        .attr("stroke-opacity", axisStrokeOpacity)
        .attr("stroke-width", axisStrokeWidth);

      g.selectAll("text").attr("font-size", "12pt");
    })
    .call((g) =>
      g
        .append("text")
        .attr("transform", "rotate(90)")
        .attr("y", -margin * 5)
        .attr("x", (height - 2 * margin) / 2)
        .attr("fill", constants.ALICE_BLUE)
        .attr("font-size", axisFontSize)
        .attr("text-anchor", "middle")
        .text("Objective")
    );
}

function drawLeftYAxis(
  svg: d3.Selection<null, unknown, null, undefined>,
  margin: number,
  volumeY: d3.ScaleLinear<number, number, never>,
  width: number,
  axisStrokeWidth: string,
  height: number,
  axisFontSize: string
) {
  svg
    .append("g")
    .attr("transform", `translate(${margin},0)`)
    .attr("color", constants.FROG_GREEN)
    .call(d3.axisLeft(volumeY).ticks(10).tickSize(1))
    .call((g) => g.select(".domain").remove())
    .call((g) => {
      g.selectAll(".tick line")
        .clone()
        .attr("x2", width - margin * 2)
        .attr("stroke-opacity", 0.5)
        .attr("stroke-width", axisStrokeWidth)
        .attr("color", constants.ALICE_BLUE);

      g.selectAll("text").attr("font-size", "12pt");
    })
    .call((g) =>
      g
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin * 5)
        .attr("x", -(height - margin * 2) / 2)
        .attr("fill", constants.FROG_GREEN)
        .attr("font-size", axisFontSize)
        .attr("text-anchor", "middle")
        .text("Volume (%)")
    );
}

function drawXAxis(
  svg: d3.Selection<null, unknown, null, undefined>,
  height: number,
  margin: number,
  x: d3.ScaleLinear<number, number, never>,
  width: number
) {
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    )
    .call((g) => {
      g.selectAll(".tick").selectAll("text").attr("font-size", "12pt");
      g.selectAll(".tick").attr("color", constants.ALICE_BLUE);
    });
}
