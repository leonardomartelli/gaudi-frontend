import { useContext, useEffect, useRef } from "react";
import { EvolutionViewerContract } from "./evolution-viewer.interface";
import * as d3 from "d3";
import constants from "../../../assets/constants";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";
import styles from "./evolution-viewer.module.scss";

export function EvolutionViewer(props: EvolutionViewerContract) {
  const ref = useRef(null);

  const margin = { top: 5, right: 5, bottom: 5, left: 5 },
    width = 450 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

  const svg = d3.select(ref.current);

  const context = useContext(OptimizationContext);

  svg
    .attr("viewBox", [0, 0, width, height])
    .attr("fill", constants.ALICE_BLUE)
    .attr("style", "width: 100%; height: 100%");

  useEffect(() => {
    const maxVol = context.width * context.height;
    const volumes: [number, number][] = [];

    for (let i = 0; i < context.volumes.length; i++)
      volumes.push([i, context.volumes[i]]);

    const x = d3.scaleLinear(
      [0, context.volumes.length],
      [margin.left, width - margin.right]
    );

    const max = context.volumes.reduce((a, b) => {
      return Math.max(a, b);
    }, 0);

    const y = d3.scaleLinear([0, max], [height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x(
        (d: [number, number]) => (d[0] / volumes[volumes.length - 1][0]) * width
      )
      .y((d: [number, number]) => (d[1] / maxVol) * height);

    svg
      .selectAll(".xAx")
      .data(d3.range(1))
      .join("g")
      .attr("class", "xAx")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call((g) => {
        d3.axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0);
      });

    svg
      .selectAll(".volume")
      .data(d3.range(1))
      .join("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "volume")
      .call((g) => d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .selectAll("text")
          .join("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Volume")
      );

    svg
      .selectAll(".line")
      .data(d3.range(1))
      .join("path")
      .attr("fill", "none")
      .attr("class", "line")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", line(volumes));
  }, [
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    props.objectives.length,
    context.volumes,
    context.volumes.length,
    svg,
    width,
    context.width,
    context.height,
  ]);

  return (
    <div className={styles.graph}>
      <svg className={styles.drawing} ref={ref}></svg>
    </div>
  );
}
