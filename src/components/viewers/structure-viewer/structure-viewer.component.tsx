import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { StructureViewerContract } from "./structure-viewer.interface";

export function StructureViewer(props: StructureViewerContract) {
  const width = props.width;
  const height = props.height;
  const densities = props.densities;

  const viewerHeight = 800;

  let [counter, setCounter] = useState(1);

  const ref = useRef(null);

  const squareSize = viewerHeight / height;

  useEffect(() => {
    const svg = d3.select(ref.current);

    svg
      .attr("viewBox", [0, 0, (viewerHeight / height) * width, viewerHeight])
      .attr("width", (viewerHeight / height) * width)
      .attr("height", viewerHeight)
      .attr("style", "max-width: 100%; height: auto;");

    function to_id(x: number, y: number) {
      return x * height + y;
    }

    svg
      .selectAll("rect")
      .data(d3.range(height * width))
      .join("rect")
      .attr("x", (d: number) => (d % width) * squareSize)
      .attr("y", (d: number) => Math.floor(d / width) * squareSize)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .attr("fill", "#0f1b42")
      .attr(
        "opacity",
        (d: number) => densities[to_id(d % width, Math.floor(d / width))]
      );

    setCounter(counter + 1);
    props.triggerUpdate(counter);
  }, [densities]);

  return (
    <svg ref={ref} width={width * squareSize} height={height * squareSize} />
  );
}
