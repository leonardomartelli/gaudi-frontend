import { Dimensions } from "./dimensions.model";
import { Position } from "./position.model";

export class Support {
  position: Position;
  dimensions?: Dimensions;
  type: number;

  constructor(
    position: Position,
    type: number,
    dimensions?: Dimensions | undefined
  ) {
    this.position = position;
    this.dimensions = dimensions;
    this.type = type;
  }
}
