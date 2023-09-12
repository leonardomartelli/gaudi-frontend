import { Dimensions } from "./dimensions.model";
import { Dimensionable } from "./dimensionsable.model";
import { Position } from "./position.model";
import { PositionalCondition } from "./positionalCondition.model";

export class ConstantRegion implements PositionalCondition, Dimensionable {
  position: Position;
  dimensions: Dimensions;
  type: number;

  constructor(position: Position, dimensions: Dimensions, type: number) {
    this.position = position;
    this.dimensions = dimensions;
    this.type = type;
  }
  setPosition(x: number, y: number, maxX: number, maxY: number): void {
    if (x < 0) this.position.x = 0;
    else if (x > maxX - this.dimensions.width)
      this.position.x = maxX - this.dimensions.width;
    else this.position.x = x;

    if (y < 0) this.position.y = 0;
    else if (y > maxY - this.dimensions.height)
      this.position.y = maxY - this.dimensions.height;
    else this.position.y = y;
  }
  selected?: boolean | undefined;
}
