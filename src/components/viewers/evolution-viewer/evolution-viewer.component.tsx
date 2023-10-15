import { useContext, useEffect, useRef } from "react";
import { EvolutionViewerContract } from "./evolution-viewer.interface";
import * as d3 from "d3";
import constants from "../../../assets/constants";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import styles from "./evolution-viewer.module.scss";

export function EvolutionViewer(props: EvolutionViewerContract) {
  const ref = useRef(null);

  const margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 550 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

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

    const { x, volumeY, volumeLine } = getVolumeLine(volumes, maxVol);

    const { objectiveY, objectiveLine } = getObjectiveLine(objectives);

    svg.selectAll("g").remove();

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )
      .call((g) =>
        g.selectAll(".tick").selectAll("text").attr("font-size", "12pt")
      );

    // Add the y-axis, remove the domain line, add grid lines and a label.

    const axisFontSize = "18pt";
    const axisStrokeOpacity = 0.5;
    const axisStrokeWidth = "2px";

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("color", constants.FROG_GREEN)
      .call(d3.axisLeft(volumeY).ticks(10).tickSize(1))
      .call((g) => g.select(".domain").remove())
      .call((g) => {
        g.selectAll(".tick line")
          .clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.5)
          .attr("stroke-width", axisStrokeWidth);

        g.selectAll("text").attr("font-size", "12pt");
      })
      .call((g) =>
        g
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -margin.left * 5)
          .attr("x", -(height - margin.bottom - margin.top) / 2)
          .attr("fill", constants.FROG_GREEN)
          .attr("font-size", axisFontSize)
          .attr("text-anchor", "middle")
          .text("Volume (%)")
      );

    svg
      .append("g")
      .attr("transform", `translate(${width - margin.right},0)`)
      .attr("color", constants.ALICE_BLUE)
      .call(d3.axisRight(objectiveY).ticks(10).tickSize(1))
      .call((g) => g.select(".domain").remove())
      .call((g) => {
        g.selectAll(".tick line")
          .clone()
          .attr("x2", -width + margin.left + margin.right)
          .attr("stroke-opacity", axisStrokeOpacity)
          .attr("stroke-width", axisStrokeWidth);

        g.selectAll("text").attr("font-size", "12pt");
      })
      .call((g) =>
        g
          .append("text")
          .attr("transform", "rotate(90)")
          .attr("y", -margin.left * 5)
          .attr("x", (height - margin.bottom - margin.top) / 2)
          .attr("fill", constants.ALICE_BLUE)
          .attr("font-size", axisFontSize)
          .attr("text-anchor", "middle")
          .text("Objetivo")
      );

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

    function getVolumeLine(volumes: [number, number][], maxVol: number) {
      const x = d3.scaleLinear(
        [0, context.volumes.length],
        [margin.left, width - margin.right]
      );

      const volumeY = d3.scaleLinear(
        [0, 100],
        [height - margin.bottom, margin.top]
      );

      const volumeLine = d3
        .line()
        .x((d: [number, number]) => x(d[0]))
        .y((d: [number, number]) => volumeY((d[1] / maxVol) * 100));

      return { x, volumeY, volumeLine };
    }

    function getObjectiveLine(objectives: [number, number][]) {
      const x = d3.scaleLinear(
        [0, context.volumes.length],
        [margin.left, width - margin.right]
      );

      const max = context.objectives.reduce((a, b) => {
        return Math.max(a, b);
      }, 0);

      const objectiveY = d3.scaleLinear(
        [0, max],
        [height - margin.bottom, margin.top]
      );

      const objectiveLine = d3
        .line()
        .x((d: [number, number]) => x(d[0]))
        .y((d: [number, number]) => objectiveY(d[1]));

      return { objectiveY, objectiveLine };
    }
  }, [
    context.width,
    context.height,
    context.volumes,
    context.objectives,
    svg,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    width,
    margin.top,
  ]);

  return (
    <div className={styles.graph}>
      <svg className={styles.drawing} ref={ref}></svg>
    </div>
  );
}
