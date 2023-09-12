import { eCreationState } from "../../models/enums/eCreationState";
import { Position } from "../../models/project/position.model";
import { Project } from "../../models/project/project.model";

export interface OptimizationContextContract {
  project: Project;
  onOptimizationStart: () => void;
  densities: Array<number>;
  objective: number;
  volume: number;
  setTriggerUpdate: (c: number) => void;
  updateProject: (newProject: Project) => void;
  creationState: eCreationState;
  setCreationState: (newState: eCreationState) => void;
  createCondition: (position: Position) => void;
}
