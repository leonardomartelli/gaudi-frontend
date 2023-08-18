import { Position } from "./position.model";

export class Force {
  load: number;
  orientation: number;
  position: Position;
  size?: number;

  constructor(
    load: number,
    orientation: number,
    position: Position,
    size?: number | undefined
  ) {
    this.load = load;
    this.orientation = orientation;
    this.position = position;
    this.size = size;
  }
}
