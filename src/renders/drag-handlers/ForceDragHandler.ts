import { Force } from "../../models/project/force.model";
import { getForceRotation } from "../utils/force.utils";
import { get } from "./CommonDragHandler";
import * as d3 from "d3";

function getForceDragHandler(
  width: number,
  height: number,
  squareSize: number
) {
  let deltaX = 0;
  let deltaY = 0;
  let item: any = undefined;

  const draggingForce = (event: any, force: Force) => {
    const x = Math.round((event.x + deltaX) / squareSize);
    const y = Math.round((event.y + deltaY) / squareSize);
    const selection = d3.select(item);

    const newForce = new Force(
      force.load,
      force.orientation,
      force.position,
      force.size,
      force.id
    );

    const oldX = newForce.position.x;
    const oldY = newForce.position.y;

    newForce.setPosition(x, y, width, height);

    let xDiff = newForce.position.x - oldX;
    let yDiff = newForce.position.y - oldY;

    let xToUse = xDiff;
    let yToUse = yDiff;

    if (force.orientation === 0) {
      xToUse = yDiff;
      yToUse = xDiff;

      if (force.load < 0) xToUse *= -1;
    } else if (force.load > 0) {
      yToUse *= -1;
      xToUse *= -1;
    }
    selection
      .attr("x", newForce.position.x * squareSize)
      .attr("y", newForce.position.y * squareSize)
      .attr(
        "transform",
        `rotate( ${getForceRotation(force)} ${force.position.x * squareSize} ${
          force.position.y * squareSize
        }) translate(${xToUse}, ${yToUse})`
      );
  };

  return get<SVGElement, Force>(
    squareSize,
    (dX: number) => {
      deltaX = dX;
    },
    (dY: number) => {
      deltaY = dY;
    },
    (i: any) => {
      item = i;
    },
    draggingForce
  );
}

const out = { getForceDragHandler };

export default out;
