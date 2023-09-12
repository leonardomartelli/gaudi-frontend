import { Dimensions } from "./dimensions.model";
import { Dimensionable } from "./dimensionsable.model";
import { Position } from "./position.model";
import { PositionalCondition } from "./positionalCondition.model";

export class Support implements PositionalCondition, Dimensionable {
  dimensions: Dimensions;
  type: number;
  position: Position;

  constructor(
    position: Position,
    type: number,
    dimensions: Dimensions | undefined
  ) {
    this.position = position;
    this.dimensions = dimensions ?? new Dimensions(0, 0);
    this.type = type;
  }

  setPosition(x: number, y: number, maxX: number, maxY: number) {
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
