import { Position } from "./position.model";
import { PositionalCondition } from "./positionalCondition.model";

export class Force implements PositionalCondition {
  load: number;
  orientation: number;
  position: Position;
  size?: number;
  selected?: boolean;
  id?: number;

  constructor(
    load: number,
    orientation: number,
    position: Position,
    size?: number,
    id?: number
  ) {
    this.load = load;
    this.orientation = orientation;
    this.position = position;
    this.size = size;
    this.id = id;
  }

  setPosition(x: number, y: number, maxX: number, maxY: number): void {
    if (x < 0) this.position.x = 0;
    else if (x > maxX) this.position.x = maxX;
    else this.position.x = x;

    if (y < 0) this.position.y = 0;
    else if (y > maxY) this.position.y = maxY;
    else this.position.y = y;
  }
}
