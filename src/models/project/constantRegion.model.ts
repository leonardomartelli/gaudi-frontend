import { Dimensions } from "./dimensions.model";
import { Position } from "./position.model";

export class ConstantRegion {
  position: Position;
  dimensions: Dimensions;
  type: number;

  constructor(position: Position, dimensions: Dimensions, type: number) {
    this.position = position;
    (this.dimensions = dimensions), (this.type = type);
  }
}
