import { useContext, useEffect, useRef } from "react";
import { Force } from "../../../models/project/force.model";
import * as d3 from "d3";
import constants from "../../../assets/constants";
import { OptimizationContext } from "../../../contexts/optimization-context/optimization-context";

export function ForcesViewer(props: {
  forces: Array<Force>;
  width: number;
  height: number;
}) {
  const ref = useRef(null);
  const viewerHeight = 800;
  const width = props.width;
  const height = props.height;

  const squareSize = viewerHeight / height;

  const densities = useContext(OptimizationContext).densities;

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
      .selectAll("use")
      .data(props.forces)
      .append("use")
      .attr("href", "#icon")
      .attr("x", (f: Force) => f.position.x * squareSize)
      .attr("y", (f: Force) => (f.position.y / width) * squareSize);
  }, [densities]);

  return (
    <svg
      ref={ref.current}
      width={width * squareSize}
      height={height * squareSize}
    >
      <defs>
        <g id="icon">
          <path
            d="M8 55L0.205772 37L15.7942 37L8 55Z"
            fill={constants.FROG_GREEN}
          />
          <rect x="6" y="8" width="4" height="29" fill={constants.FROG_GREEN} />
          <circle cx="8" cy="3" r="3" fill={constants.FROG_GREEN} />
        </g>
      </defs>
    </svg>
  );
}
