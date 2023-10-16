import { MutableRefObject } from "react";
import * as d3 from "d3";
import { Force } from "../models/project/force.model";
import { getForceRotation } from "./utils/force.utils";
import ForceHandler from "./drag-handlers/ForceDragHandler";

function renderForce(
  ref: MutableRefObject<null>,
  forces: Force[],
  width: number,
  height: number,
  squareSize: number,
  onClick: (event: any) => void
) {
  const svg = d3.select(ref.current);

  const force = svg
    .selectAll<SVGElement, Force>(".forces")
    .data<Force>(forces)
    .join("use")
    .attr("class", "forces")
    .attr("href", "#force")
    .attr("x", (f: Force) => f.position.x * squareSize)
    .attr("y", (f: Force) => f.position.y * squareSize)
    .attr(
      "transform",
      (f: Force) => `rotate(${getForceRotation(f)}
       ${f.position.x * squareSize} ${f.position.y * squareSize})`
    )
    .attr("id", (f: Force) => `f${f.id}`)
    .on("click", onClick)
    .raise();

  const forceHandler = ForceHandler.getForceDragHandler(
    width,
    height,
    squareSize
  );

  forceHandler(force);
}

const out = { renderForce };

export default out;
