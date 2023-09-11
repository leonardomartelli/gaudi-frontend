import { Selectable } from "../interfaces/Selectable";
import { Position } from "./position.model";

export interface PositionalCondition extends Selectable {
  setPosition(x: number, y: number, maxX: number, maxY: number): void;
  position: Position;
}
