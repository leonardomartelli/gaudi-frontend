import { PositionalCondition } from "../../models/project/positionalCondition.model";
import * as d3 from "d3";

function get<
  ElementType extends SVGElement,
  BoundaryConditionType extends PositionalCondition
>(
  squareSize: number,
  setDeltaX: (x: number) => void,
  setDeltaY: (x: number) => void,
  setItem: (item: any) => void,
  dragging: (event: any, datum: BoundaryConditionType) => void
) {
  const dragStarted = (event: any, bc: BoundaryConditionType) => {
    setDeltaX(bc.position.x * squareSize - Math.round(event.x));
    setDeltaY(bc.position.y * squareSize - Math.round(event.y));
    setItem(event.sourceEvent.target);
  };

  const dragEnded = (event: any, bc: BoundaryConditionType) => {
    setItem(undefined);
  };

  return d3
    .drag<ElementType, BoundaryConditionType>()
    .on("start", dragStarted)
    .on("drag", dragging)
    .on("end", dragEnded);
}

export { get };
