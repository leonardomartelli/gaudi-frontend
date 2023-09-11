import { Dimensions } from "./dimensions.model";
import { Position } from "./position.model";
import { PositionalCondition } from "./positionalCondition.model";

export class Support implements PositionalCondition {
  dimensions?: Dimensions;
  type: number;
  position: Position;

  constructor(
    position: Position,
    type: number,
    dimensions?: Dimensions | undefined
  ) {
    this.position = position;
    this.dimensions = dimensions;
    this.type = type;
  }

  setPosition(x: number, y: number, maxX: number, maxY: number) {
    if (x < 0) this.position.x = 0;
    else if (x > maxX) this.position.x = maxX;
    else this.position.x = x;

    if (y < 0) this.position.y = 0;
    else if (y > maxY) this.position.y = maxY;
    else this.position.y = y;
  }

  selected?: boolean | undefined;
}
